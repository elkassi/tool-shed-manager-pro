import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart3, AlertTriangle, TrendingUp, Package } from "lucide-react";

const Stocks = () => {
  const navigate = useNavigate();

  // Mock stock data
  const stockData = [
    {
      mabic: "MAB001",
      reference: "REF-2024-001",
      designation: "Clé dynamométrique 50-250 Nm",
      quantite: 15,
      seuilMin: 5,
      valeur: 250.00,
      emplacement: "A1-B2"
    },
    {
      mabic: "MAB002",
      reference: "REF-2024-002", 
      designation: "Tournevis électrique 18V",
      quantite: 8,
      seuilMin: 3,
      valeur: 180.00,
      emplacement: "A2-C1"
    },
    {
      mabic: "MAB003",
      reference: "REF-2024-003",
      designation: "Marteau pneumatique",
      quantite: 2,
      seuilMin: 5,
      valeur: 450.00,
      emplacement: "B1-A3"
    },
    {
      mabic: "MAB004",
      reference: "REF-2024-004",
      designation: "Perceuse sans fil 24V",
      quantite: 12,
      seuilMin: 4,
      valeur: 320.00,
      emplacement: "C1-B2"
    }
  ];

  const getTotalValue = () => {
    return stockData.reduce((total, item) => total + (item.quantite * item.valeur), 0);
  };

  const getCriticalItems = () => {
    return stockData.filter(item => item.quantite <= item.seuilMin);
  };

  const getStockStatus = (quantite: number, seuilMin: number) => {
    if (quantite <= seuilMin) return { status: 'critique', color: 'text-red-600 bg-red-50' };
    if (quantite <= seuilMin * 1.5) return { status: 'faible', color: 'text-orange-600 bg-orange-50' };
    return { status: 'normal', color: 'text-green-600 bg-green-50' };
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
        
        <h1 className="text-4xl font-bold text-foreground">VALEUR & QUANTITÉS</h1>
        
        <div className="w-32"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Package className="h-12 w-12 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{stockData.length}</div>
                  <div className="text-muted-foreground">Références totales</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <TrendingUp className="h-12 w-12 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{getTotalValue().toFixed(2)}€</div>
                  <div className="text-muted-foreground">Valeur totale stock</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <AlertTriangle className="h-12 w-12 text-red-600" />
                <div>
                  <div className="text-2xl font-bold">{getCriticalItems().length}</div>
                  <div className="text-muted-foreground">Alertes critiques</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stock Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <BarChart3 className="mr-3 h-8 w-8" />
              État détaillé des stocks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-lg font-semibold">
                    <th className="p-4">MABIC</th>
                    <th className="p-4">Référence</th>
                    <th className="p-4">Désignation</th>
                    <th className="p-4">Quantité</th>
                    <th className="p-4">Seuil Min</th>
                    <th className="p-4">Valeur Unit.</th>
                    <th className="p-4">Valeur Tot.</th>
                    <th className="p-4">Emplacement</th>
                    <th className="p-4">État</th>
                  </tr>
                </thead>
                <tbody>
                  {stockData.map((item) => {
                    const stockStatus = getStockStatus(item.quantite, item.seuilMin);
                    return (
                      <tr key={item.mabic} className="border-b hover:bg-muted/50">
                        <td className="p-4 font-bold">{item.mabic}</td>
                        <td className="p-4">{item.reference}</td>
                        <td className="p-4">{item.designation}</td>
                        <td className="p-4">
                          <span className={`text-xl font-bold ${stockStatus.color}`}>
                            {item.quantite}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground">{item.seuilMin}</td>
                        <td className="p-4">{item.valeur.toFixed(2)}€</td>
                        <td className="p-4 font-semibold">{(item.quantite * item.valeur).toFixed(2)}€</td>
                        <td className="p-4">{item.emplacement}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${stockStatus.color}`}>
                            {stockStatus.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Critical Alerts */}
        {getCriticalItems().length > 0 && (
          <Card className="border-red-200">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-2xl flex items-center text-red-800">
                <AlertTriangle className="mr-3 h-8 w-8" />
                ⚠️ ALERTES CRITIQUES
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {getCriticalItems().map((item) => (
                  <div key={item.mabic} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div>
                      <div className="font-bold text-red-800">{item.mabic} - {item.designation}</div>
                      <div className="text-red-600">Stock: {item.quantite} / Seuil minimum: {item.seuilMin}</div>
                    </div>
                    <div className="text-red-800 font-bold">
                      RÉAPPROVISIONNEMENT REQUIS
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Stocks;