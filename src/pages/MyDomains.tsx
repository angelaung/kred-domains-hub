import { useState } from "react";
import { Globe, RefreshCw, Settings, ExternalLink, Shield, Search, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import kiteboardingHero from "@/assets/kiteboarding-hero-v2.jpg";
import leaderHero from "@/assets/leader-hero.jpg";
import myHappyPlaceHero from "@/assets/myhappyplace-hero.jpg";

interface Domain {
  id: string;
  name: string;
  expiryDate: string;
  autoRenew: boolean;
  daysUntilExpiry: number;
  hasToken: boolean;
  dnsConfigured: boolean;
  ensConfigured: boolean;
  websiteLinked: boolean;
  walletLinked: boolean;
  heroImage?: string;
}

const mockDomains: Domain[] = [
  {
    id: "1",
    name: "Kiteboarding.Kred",
    expiryDate: "2025-12-15",
    autoRenew: true,
    daysUntilExpiry: 365,
    hasToken: true,
    dnsConfigured: true,
    ensConfigured: true,
    websiteLinked: true,
    walletLinked: true,
    heroImage: kiteboardingHero,
  },
  {
    id: "2",
    name: "Leader.Kred",
    expiryDate: "2025-03-20",
    autoRenew: true,
    daysUntilExpiry: 112,
    hasToken: true,
    dnsConfigured: true,
    ensConfigured: true,
    websiteLinked: true,
    walletLinked: true,
    heroImage: leaderHero,
  },
  {
    id: "3",
    name: "MyHappyPlace.Kred",
    expiryDate: "2025-02-01",
    autoRenew: true,
    daysUntilExpiry: 65,
    hasToken: true,
    dnsConfigured: true,
    ensConfigured: true,
    websiteLinked: true,
    walletLinked: true,
    heroImage: myHappyPlaceHero,
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
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
                My <span className="gradient-text">Domains</span>
              </h1>
              <p className="text-muted-foreground">
                Manage your .Kred domains, renewals, and configurations
              </p>
            </div>
            <div className="flex gap-2">
              <Link to="/search">
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Register
                </Button>
              </Link>
              <Link to="/transfers">
                <Button variant="default">
                  <ArrowLeftRight className="h-4 w-4 mr-2" />
                  Transfer
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-card">
            <TabsTrigger value="all">All Domains ({domains.length})</TabsTrigger>
            <TabsTrigger value="expiring">
              Expiring Soon ({domains.filter(d => d.daysUntilExpiry < 90).length})
            </TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
            {domains.map((domain) => {
              const status = getExpiryStatus(domain.daysUntilExpiry);

              return (
                <Card key={domain.id} className="bg-card border-border/60 hover:border-primary/40 transition-all overflow-hidden group">
                  {/* Hero Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                    {domain.heroImage ? (
                      <img 
                        src={domain.heroImage} 
                        alt={domain.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Globe className="h-16 w-16 text-primary/40" />
                      </div>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute top-2 right-2 bg-background/80 hover:bg-background/90 backdrop-blur-sm"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    {/* Domain Name */}
                    <div>
                      <h3 className="text-2xl font-display font-bold mb-2">{domain.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={status.color as any} className="text-xs">
                          {status.label}
                        </Badge>
                        {domain.autoRenew && (
                          <Badge variant="outline" className="border-primary/40 text-primary text-xs">
                            Auto-Renew
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Status Indicators */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${domain.websiteLinked ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                          <span className="text-sm font-medium">
                            Website {domain.websiteLinked ? 'Linked' : 'Not Linked'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${domain.walletLinked ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                          <span className="text-sm font-medium">
                            Wallet {domain.walletLinked ? 'Linked' : 'Not Linked'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-5 w-5 text-muted-foreground" />
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${domain.ensConfigured ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                          <span className="text-sm font-medium">
                            ENS {domain.ensConfigured ? 'Configured' : 'Not Set'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Expiry Info with Progress */}
                    <div className="pt-2 border-t border-border/50 space-y-2">
                      <div className="text-xs text-muted-foreground">Expires in</div>
                      <div className="text-sm font-medium">
                        {domain.daysUntilExpiry} days
                      </div>
                      <Progress value={getExpiryProgress(domain.daysUntilExpiry)} className="h-1.5" />
                    </div>

                    {/* Primary Action */}
                    <Link to={`/token/${domain.id}`} className="block">
                      <Button className="w-full" variant="default">
                        Manage Token
                      </Button>
                    </Link>
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
