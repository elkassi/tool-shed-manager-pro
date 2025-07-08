import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PackageMinus, QrCode, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Sortie = () => {
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

  const handleExit = () => {
    if (!toolInfo || !quantite || parseInt(quantite) <= 0) {
      toast({
        title: "Données manquantes", 
        description: "Veuillez saisir un MABIC valide et une quantité positive",
        variant: "destructive"
      });
      return;
    }

    const requestedQty = parseInt(quantite);
    
    if (requestedQty > toolInfo.quantite) {
      toast({
        title: "Stock insuffisant",
        description: `Seulement ${toolInfo.quantite} disponible(s), impossible de sortir ${requestedQty}`,
        variant: "destructive"
      });
      return;
    }

    // Simulate stock update
    const newQuantity = toolInfo.quantite - requestedQty;
    
    toast({
      title: "Sortie enregistrée",
      description: `-${quantite} ${toolInfo.designation}. Nouveau stock: ${newQuantity}`,
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
      operation: 'SORTIE'
    };

    toast({
      title: "Étiquette QR générée",
      description: "Impression en cours...",
    });

    console.log("QR Data:", qrData);
  };

  const getStockWarning = () => {
    if (!toolInfo || !quantite) return null;
    
    const newStock = toolInfo.quantite - parseInt(quantite);
    if (newStock <= 2) {
      return (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertTriangle className="h-8 w-8 text-red-600" />
          <div>
            <div className="font-semibold text-red-800">
              ⚠️ ALERTE STOCK FAIBLE
            </div>
            <div className="text-red-600">
              Stock restant après sortie: {newStock} (seuil critique atteint)
            </div>
          </div>
        </div>
      );
    }
    return null;
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
        
        <h1 className="text-4xl font-bold text-foreground">SORTIE D'OUTILS</h1>
        
        <div className="w-32"></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* MABIC Input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <PackageMinus className="mr-3 h-8 w-8" />
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
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Outil identifié</h3>
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
                    <span className="font-semibold">Stock disponible:</span>
                    <div className={`text-xl font-bold ${
                      toolInfo.quantite > 5 ? 'text-green-600' : 
                      toolInfo.quantite > 2 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {toolInfo.quantite}
                    </div>
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
              <CardTitle className="text-2xl">Quantité à sortir</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="Quantité..."
                  value={quantite}
                  onChange={(e) => setQuantite(e.target.value)}
                  min="1"
                  max={toolInfo.quantite}
                  className="text-xl h-14 flex-1"
                />
                <Button
                  onClick={handleExit}
                  size="lg"
                  className="text-xl px-8 h-14 bg-red-600 hover:bg-red-700"
                  disabled={!quantite || parseInt(quantite) <= 0 || parseInt(quantite) > toolInfo.quantite}
                >
                  <PackageMinus className="mr-2 h-6 w-6" />
                  VALIDER SORTIE
                </Button>
              </div>

              {/* Stock Warning */}
              {getStockWarning()}

              {quantite && parseInt(quantite) > 0 && parseInt(quantite) <= toolInfo.quantite && (
                <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <QrCode className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="font-semibold text-blue-800">
                      Stock après sortie: {toolInfo.quantite - parseInt(quantite)}
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

export default Sortie;