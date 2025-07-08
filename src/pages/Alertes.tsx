import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Clock, CheckCircle, XCircle } from "lucide-react";

const Alertes = () => {
  const navigate = useNavigate();

  // Mock alerts data
  const [alerts] = useState([
    {
      id: 1,
      type: "stock_critique",
      severity: "high",
      message: "Stock critique: Clé dynamométrique (MAB001) - Quantité: 2",
      timestamp: "2024-07-08 14:30",
      status: "active",
      mabic: "MAB001"
    },
    {
      id: 2,
      type: "maintenance",
      severity: "medium", 
      message: "Maintenance préventive requise: Tournevis électrique (MAB002)",
      timestamp: "2024-07-08 12:15",
      status: "active",
      mabic: "MAB002"
    },
    {
      id: 3,
      type: "expiration",
      severity: "high",
      message: "Certification expirée: Équipement de levage (MAB005)",
      timestamp: "2024-07-08 09:45",
      status: "active",
      mabic: "MAB005"
    },
    {
      id: 4,
      type: "retour_retard",
      severity: "medium",
      message: "Retour en retard: Perceuse sans fil (MAB004) - Délai dépassé de 3 jours",
      timestamp: "2024-07-07 16:20",
      status: "active",
      mabic: "MAB004"
    },
    {
      id: 5,
      type: "stock_critique",
      severity: "low",
      message: "Stock faible: Marteau pneumatique (MAB003) - Quantité: 5",
      timestamp: "2024-07-07 11:30",
      status: "resolved",
      mabic: "MAB003"
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <XCircle className="h-6 w-6" />;
      case 'medium': return <AlertTriangle className="h-6 w-6" />;
      case 'low': return <Clock className="h-6 w-6" />;
      default: return <AlertTriangle className="h-6 w-6" />;
    }
  };

  const getAlertTypeLabel = (type: string) => {
    switch (type) {
      case 'stock_critique': return 'STOCK CRITIQUE';
      case 'maintenance': return 'MAINTENANCE';
      case 'expiration': return 'EXPIRATION';
      case 'retour_retard': return 'RETOUR RETARD';
      default: return 'ALERTE';
    }
  };

  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const resolvedAlerts = alerts.filter(alert => alert.status === 'resolved');

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
        
        <h1 className="text-4xl font-bold text-foreground">ALERTES CRITIQUES</h1>
        
        <div className="w-32"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <XCircle className="h-10 w-10 text-red-600" />
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {activeAlerts.filter(a => a.severity === 'high').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Critiques</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <AlertTriangle className="h-10 w-10 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {activeAlerts.filter(a => a.severity === 'medium').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Moyennes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Clock className="h-10 w-10 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {activeAlerts.filter(a => a.severity === 'low').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Faibles</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {resolvedAlerts.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Résolues</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <AlertTriangle className="mr-3 h-8 w-8 text-red-600" />
              Alertes actives ({activeAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeAlerts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-600" />
                  <div className="text-xl">Aucune alerte active</div>
                  <div>Tous les systèmes fonctionnent normalement</div>
                </div>
              ) : (
                activeAlerts.map((alert) => (
                  <div key={alert.id} className={`p-6 border rounded-lg ${getSeverityColor(alert.severity)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        {getSeverityIcon(alert.severity)}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-lg">
                              {getAlertTypeLabel(alert.type)}
                            </span>
                            <span className="text-sm font-mono bg-white/50 px-2 py-1 rounded">
                              {alert.mabic}
                            </span>
                          </div>
                          <div className="text-lg mb-2">{alert.message}</div>
                          <div className="text-sm opacity-75">
                            {alert.timestamp}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          VOIR DÉTAILS
                        </Button>
                        <Button variant="outline" size="sm">
                          MARQUER RÉSOLU
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Resolved Alerts */}
        {resolvedAlerts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <CheckCircle className="mr-3 h-8 w-8 text-green-600" />
                Alertes résolues ({resolvedAlerts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {resolvedAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 bg-green-50 border border-green-200 rounded-lg opacity-60">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-semibold">{getAlertTypeLabel(alert.type)}</span>
                        <span className="text-sm font-mono bg-white/50 px-2 py-1 rounded">
                          {alert.mabic}
                        </span>
                        <span className="text-sm">{alert.message}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{alert.timestamp}</span>
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

export default Alertes;