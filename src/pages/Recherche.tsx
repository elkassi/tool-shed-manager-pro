import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";

const Recherche = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);

  // Mock data for demonstration
  const mockDatabase = [
    {
      mabic: "MAB001",
      reference: "REF-2024-001",
      designation: "Clé dynamométrique 50-250 Nm",
      quantite: 15,
      emplacement: "A1-B2",
      image: "/placeholder.svg"
    },
    {
      mabic: "MAB002", 
      reference: "REF-2024-002",
      designation: "Tournevis électrique 18V",
      quantite: 8,
      emplacement: "A2-C1",
      image: "/placeholder.svg"
    }
  ];

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    // Search by MABIC or Reference
    const result = mockDatabase.find(
      item => 
        item.mabic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reference.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResult(result || null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
        
        <h1 className="text-4xl font-bold text-foreground">RECHERCHE</h1>
        
        <div className="w-32"></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Search Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Rechercher un outil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <Input
                placeholder="Saisir MABIC ou Référence..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-xl h-14 flex-1"
              />
              <Button
                onClick={handleSearch}
                size="lg"
                className="text-xl px-8 h-14"
              >
                <Search className="mr-2 h-6 w-6" />
                CHERCHER
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResult && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-600">Outil trouvé</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Image */}
                <div className="space-y-4">
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-border">
                    <span className="text-muted-foreground text-lg">Photo de l'outil</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-lg">
                    <div>
                      <span className="font-semibold">MABIC:</span>
                      <div className="text-2xl font-bold text-primary">{searchResult.mabic}</div>
                    </div>
                    <div>
                      <span className="font-semibold">Référence:</span>
                      <div className="text-xl">{searchResult.reference}</div>
                    </div>
                    <div className="col-span-2">
                      <span className="font-semibold">Désignation:</span>
                      <div className="text-xl">{searchResult.designation}</div>
                    </div>
                    <div>
                      <span className="font-semibold">Quantité:</span>
                      <div className={`text-2xl font-bold ${searchResult.quantite > 5 ? 'text-green-600' : 'text-orange-600'}`}>
                        {searchResult.quantite}
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold">Emplacement:</span>
                      <div className="text-xl">{searchResult.emplacement}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {searchTerm && !searchResult && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-2xl text-red-600 font-semibold">
                Aucun outil trouvé pour "{searchTerm}"
              </div>
              <p className="text-lg text-muted-foreground mt-2">
                Vérifiez le MABIC ou la référence et réessayez
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Recherche;