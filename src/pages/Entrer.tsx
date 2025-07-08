import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, QrCode, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Entrer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mabic, setMabic] = useState("");
  const [quantite, setQuantite] = useState("");
  const [toolInfo, setToolInfo] = useState<any>(null);

  // Mock database
  const mockDatabase = [
    {
      mabic: "MAB001",
      reference: "REF-2024-001", 
      designation: "Clé dynamométrique 50-250 Nm",
      quantite: 15
    },
    {
      mabic: "MAB002",
      reference: "REF-2024-002",
      designation: "Tournevis électrique 18V", 
      quantite: 8
    }
  ];

  const handleMabicLookup = () => {
    if (!mabic.trim()) return;

    const tool = mockDatabase.find(item => 
      item.mabic.toLowerCase() === mabic.toLowerCase()
    );

    if (tool) {
      setToolInfo(tool);
    } else {
      toast({
        title: "MABIC introuvable",
        description: `Le MABIC "${mabic}" n'existe pas dans la base`,
        variant: "destructive"
      });
      setToolInfo(null);
    }
  };

  const handleEntry = () => {
    if (!toolInfo || !quantite || parseInt(quantite) <= 0) {
      toast({
        title: "Données manquantes",
        description: "Veuillez saisir un MABIC valide et une quantité positive",
        variant: "destructive"
      });
      return;
    }

    // Simulate stock update
    const newQuantity = toolInfo.quantite + parseInt(quantite);
    
    toast({
      title: "Entrée enregistrée",
      description: `+${quantite} ${toolInfo.designation}. Nouveau stock: ${newQuantity}`,
    });

    // Generate QR code (mock)
    generateQRLabel();
    
    // Reset form
    setMabic("");
    setQuantite("");
    setToolInfo(null);
  };

  const generateQRLabel = () => {
    if (!toolInfo || !quantite) return;

    // Mock QR generation
    const qrData = {
      mabic: toolInfo.mabic,
      reference: toolInfo.reference,
      quantite: parseInt(quantite),
      date: new Date().toLocaleDateString('fr-FR'),
      operation: 'ENTREE'
    };

    toast({
      title: "Étiquette QR générée",
      description: "Impression en cours...",
    });

    console.log("QR Data:", qrData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/10 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <Button
          onClick={() => navigate('/menu')}
          variant="outline"
          size="lg"
          className="text-lg px-6 py-4 h-auto"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          RETOUR
        </Button>
        
        <h1 className="text-4xl font-bold text-foreground">ENTRÉE D'OUTILS</h1>
        
        <div className="w-32"></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* MABIC Input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Package className="mr-3 h-8 w-8" />
              Identification de l'outil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <Input
                placeholder="Saisir MABIC..."
                value={mabic}
                onChange={(e) => setMabic(e.target.value.toUpperCase())}
                className="text-xl h-14 flex-1"
              />
              <Button
                onClick={handleMabicLookup}
                size="lg"
                className="text-xl px-8 h-14"
              >
                VÉRIFIER
              </Button>
            </div>

            {/* Tool Info Display */}
            {toolInfo && (
              <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Outil identifié</h3>
                <div className="grid grid-cols-2 gap-4 text-lg">
                  <div>
                    <span className="font-semibold">MABIC:</span>
                    <div className="text-xl font-bold">{toolInfo.mabic}</div>
                  </div>
                  <div>
                    <span className="font-semibold">Référence:</span>
                    <div>{toolInfo.reference}</div>
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold">Désignation:</span>
                    <div>{toolInfo.designation}</div>
                  </div>
                  <div>
                    <span className="font-semibold">Stock actuel:</span>
                    <div className="text-xl font-bold text-blue-600">{toolInfo.quantite}</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quantity Input */}
        {toolInfo && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Quantité à ajouter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="Quantité..."
                  value={quantite}
                  onChange={(e) => setQuantite(e.target.value)}
                  min="1"
                  className="text-xl h-14 flex-1"
                />
                <Button
                  onClick={handleEntry}
                  size="lg"
                  className="text-xl px-8 h-14 bg-green-600 hover:bg-green-700"
                  disabled={!quantite || parseInt(quantite) <= 0}
                >
                  <Package className="mr-2 h-6 w-6" />
                  VALIDER ENTRÉE
                </Button>
              </div>

              {quantite && parseInt(quantite) > 0 && (
                <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <QrCode className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="font-semibold text-blue-800">
                      Nouveau stock après entrée: {toolInfo.quantite + parseInt(quantite)}
                    </div>
                    <div className="text-sm text-blue-600">
                      Une étiquette QR sera générée automatiquement
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Entrer;