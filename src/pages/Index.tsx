import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/10 flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-2xl">
        {/* Renault Logo */}
        <div className="w-32 h-32 mx-auto bg-primary rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-4xl font-bold text-primary-foreground">R</span>
        </div>
        
        {/* Title */}
        <div className="space-y-4">
        <h1 className="text-5xl font-bold text-foreground">
          SYSTÈME DE GESTION D'OUTILS
        </h1>
        <p className="text-xl text-muted-foreground">
          Département Sous Ensemble - Renault
        </p>
        </div>

        {/* Menu Button */}
        <Button 
          onClick={() => navigate('/menu')}
          size="lg"
          className="text-2xl px-16 py-8 h-auto bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg"
        >
          MENU PRINCIPAL
        </Button>
      </div>
    </div>
  );
};

export default Index;
