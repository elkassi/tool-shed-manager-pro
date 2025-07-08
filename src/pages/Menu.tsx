import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, PackageMinus, Search, BarChart3, AlertTriangle } from "lucide-react";

const Menu = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "ENTRER",
      subtitle: "Ajout d'outils",
      icon: Package,
      route: "/entrer",
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      title: "SORTIE", 
      subtitle: "Retrait d'outils",
      icon: PackageMinus,
      route: "/sortie",
      color: "bg-red-600 hover:bg-red-700"
    },
    {
      title: "RECHERCHE",
      subtitle: "Chercher un outil",
      icon: Search,
      route: "/recherche",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "VALEUR+QUANTITE",
      subtitle: "État des stocks",
      icon: BarChart3,
      route: "/stocks",
      color: "bg-purple-600 hover:bg-purple-700"
    },
    {
      title: "CMD",
      subtitle: "Alertes critiques",
      icon: AlertTriangle,
      route: "/alertes",
      color: "bg-orange-600 hover:bg-orange-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/10 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          size="lg"
          className="text-lg px-6 py-4 h-auto"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          RETOUR
        </Button>
        
        <h1 className="text-4xl font-bold text-foreground">MENU PRINCIPAL</h1>
        
        <div className="w-32"></div> {/* Spacer for centering */}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {menuItems.map((item) => (
          <Button
            key={item.title}
            onClick={() => navigate(item.route)}
            className={`${item.color} text-white h-auto p-8 flex flex-col items-center space-y-4 transition-all duration-200 transform hover:scale-105 shadow-lg`}
          >
            <item.icon className="h-12 w-12" />
            <div className="text-center">
              <div className="text-2xl font-bold">{item.title}</div>
              <div className="text-lg opacity-90">{item.subtitle}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Menu;