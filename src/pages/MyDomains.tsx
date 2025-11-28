import { useState } from "react";
import { Globe, RefreshCw, Settings, ExternalLink, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

interface Domain {
  id: string;
  name: string;
  expiryDate: string;
  autoRenew: boolean;
  daysUntilExpiry: number;
  hasToken: boolean;
  dnsConfigured: boolean;
  ensConfigured: boolean;
}

const mockDomains: Domain[] = [
  {
    id: "1",
    name: "yourname.kred",
    expiryDate: "2025-12-15",
    autoRenew: true,
    daysUntilExpiry: 365,
    hasToken: true,
    dnsConfigured: true,
    ensConfigured: true,
  },
  {
    id: "2",
    name: "yourproject.kred",
    expiryDate: "2025-03-20",
    autoRenew: false,
    daysUntilExpiry: 112,
    hasToken: true,
    dnsConfigured: false,
    ensConfigured: false,
  },
  {
    id: "3",
    name: "yourcommunity.kred",
    expiryDate: "2025-02-01",
    autoRenew: true,
    daysUntilExpiry: 65,
    hasToken: false,
    dnsConfigured: true,
    ensConfigured: false,
  },
];

export default function MyDomains() {
  const [domains] = useState<Domain[]>(mockDomains);

  const getExpiryStatus = (days: number) => {
    if (days < 30) return { color: "destructive", label: "Expiring Soon" };
    if (days < 90) return { color: "secondary", label: "Renewal Due" };
    return { color: "default", label: "Active" };
  };

  const getExpiryProgress = (days: number) => {
    const totalDays = 365;
    return ((totalDays - days) / totalDays) * 100;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
            My <span className="gradient-text">Domains</span>
          </h1>
          <p className="text-muted-foreground">
            Manage your .Kred domains, renewals, and configurations
          </p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-card">
            <TabsTrigger value="all">All Domains ({domains.length})</TabsTrigger>
            <TabsTrigger value="expiring">
              Expiring Soon ({domains.filter(d => d.daysUntilExpiry < 90).length})
            </TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 animate-slide-up">
            {domains.map((domain) => {
              const status = getExpiryStatus(domain.daysUntilExpiry);
              const progress = getExpiryProgress(domain.daysUntilExpiry);

              return (
                <Card key={domain.id} className="bg-card border-border/60 hover:border-primary/40 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                          <Globe className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-display">{domain.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={status.color as any}>{status.label}</Badge>
                            {domain.autoRenew && (
                              <Badge variant="outline" className="border-primary/40 text-primary">
                                Auto-Renew
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Expiry Progress */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Time until expiry</span>
                        <span className="font-medium">
                          {domain.daysUntilExpiry} days ({new Date(domain.expiryDate).toLocaleDateString()})
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    {/* Status Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className={`h-4 w-4 ${domain.hasToken ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-muted-foreground">
                          Token {domain.hasToken ? 'Active' : 'Not Minted'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className={`h-4 w-4 ${domain.dnsConfigured ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-muted-foreground">
                          DNS {domain.dnsConfigured ? 'Configured' : 'Not Set'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ExternalLink className={`h-4 w-4 ${domain.ensConfigured ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-muted-foreground">
                          ENS {domain.ensConfigured ? 'Configured' : 'Not Set'}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Link to={`/renewals/${domain.id}`}>
                        <Button variant="default" size="sm">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Renew Domain
                        </Button>
                      </Link>
                      <Link to={`/registrant/${domain.id}`}>
                        <Button variant="outline" size="sm">
                          Update Details
                        </Button>
                      </Link>
                      <Link to={`/token/${domain.id}`}>
                        <Button variant="outline" size="sm">
                          Manage Token
                        </Button>
                      </Link>
                      <Link to={`/dns/${domain.id}`}>
                        <Button variant="outline" size="sm">
                          DNS Settings
                        </Button>
                      </Link>
                      <Link to={`/ens/${domain.id}`}>
                        <Button variant="outline" size="sm">
                          ENS Settings
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="expiring" className="space-y-4 animate-slide-up">
            {domains
              .filter(d => d.daysUntilExpiry < 90)
              .map((domain) => {
                const status = getExpiryStatus(domain.daysUntilExpiry);
                return (
                  <Card key={domain.id} className="bg-card border-destructive/40">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-display font-semibold">{domain.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Expires in {domain.daysUntilExpiry} days
                          </p>
                        </div>
                        <Link to={`/renewals/${domain.id}`}>
                          <Button variant="destructive">
                            Renew Now
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </TabsContent>

          <TabsContent value="active">
            <Card className="bg-card border-border/60">
              <CardContent className="p-12 text-center">
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-display font-semibold mb-2">All domains active</h3>
                <p className="text-muted-foreground">
                  Your domains are healthy and up to date
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
