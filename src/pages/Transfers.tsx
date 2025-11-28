import { useState } from "react";
import { ArrowRightLeft, ArrowDownToLine, ArrowUpFromLine, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function Transfers() {
  const [transferInDomain, setTransferInDomain] = useState("");
  const [transferInAuthCode, setTransferInAuthCode] = useState("");
  const [transferOutDomain, setTransferOutDomain] = useState("");
  const [transferOutRegistrar, setTransferOutRegistrar] = useState("");

  const handleTransferIn = () => {
    if (!transferInDomain || !transferInAuthCode) {
      toast.error("Please provide domain name and authorization code");
      return;
    }
    toast.success("Transfer request initiated! We'll notify you when it's complete.");
  };

  const handleRequestAuthCode = () => {
    if (!transferOutDomain) {
      toast.error("Please select a domain");
      return;
    }
    toast.success("Authorization code sent to your email!");
  };

  const handleTransferOut = () => {
    if (!transferOutDomain || !transferOutRegistrar) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Transfer initiated! Check your email for the authorization code.");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-up text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
            Domain <span className="gradient-text">Transfers</span>
          </h1>
          <p className="text-muted-foreground">
            Transfer domains in or out of Domains.Kred
          </p>
        </div>

        <Tabs defaultValue="in" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-card">
            <TabsTrigger value="in" className="flex items-center gap-2">
              <ArrowDownToLine className="h-4 w-4" />
              Transfer In
            </TabsTrigger>
            <TabsTrigger value="out" className="flex items-center gap-2">
              <ArrowUpFromLine className="h-4 w-4" />
              Transfer Out
            </TabsTrigger>
          </TabsList>

          {/* Transfer IN */}
          <TabsContent value="in" className="space-y-6 animate-slide-up">
            <Card className="bg-card border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowDownToLine className="h-5 w-5 text-primary" />
                  Transfer Domain to Domains.Kred
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Move your domain from another registrar to Domains.Kred
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="transferInDomain">
                      Domain Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="transferInDomain"
                      placeholder="example.kred"
                      value={transferInDomain}
                      onChange={(e) => setTransferInDomain(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transferInAuthCode">
                      Authorization Code (EPP Code) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="transferInAuthCode"
                      placeholder="Enter authorization code from current registrar"
                      value={transferInAuthCode}
                      onChange={(e) => setTransferInAuthCode(e.target.value)}
                      className="font-mono"
                    />
                    <p className="text-xs text-muted-foreground">
                      Get this from your current registrar's domain management panel
                    </p>
                  </div>
                </div>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-sm mb-2">Transfer Requirements</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Domain must be unlocked at current registrar</li>
                      <li>Domain must be at least 60 days old</li>
                      <li>Authorization code must be valid</li>
                      <li>Transfer typically completes in 5-7 days</li>
                      <li>Adds 1 year to current expiration date</li>
                    </ul>
                  </CardContent>
                </Card>

                <Button
                  onClick={handleTransferIn}
                  size="lg"
                  className="w-full animate-glow-pulse"
                >
                  <ArrowRightLeft className="h-5 w-5 mr-2" />
                  Start Transfer In
                </Button>
              </CardContent>
            </Card>

            {/* What Happens Next */}
            <Card className="bg-muted/30 border-border/40">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  What Happens Next?
                </h3>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                  <li>We'll verify your authorization code with your current registrar</li>
                  <li>You'll receive an email to approve the transfer</li>
                  <li>Your current registrar may send a confirmation email</li>
                  <li>Transfer completes automatically in 5-7 days (or sooner if approved by current registrar)</li>
                  <li>Domain will appear in your Domains.Kred account</li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transfer OUT */}
          <TabsContent value="out" className="space-y-6 animate-slide-up">
            <Card className="bg-card border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpFromLine className="h-5 w-5 text-primary" />
                  Transfer Domain Away from Domains.Kred
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Move your domain to another registrar
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="transferOutDomain">
                      Select Domain <span className="text-destructive">*</span>
                    </Label>
                    <Select value={transferOutDomain} onValueChange={setTransferOutDomain}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a domain to transfer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yourname.kred">yourname.kred</SelectItem>
                        <SelectItem value="yourproject.kred">yourproject.kred</SelectItem>
                        <SelectItem value="yourcommunity.kred">yourcommunity.kred</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transferOutRegistrar">
                      New Registrar <span className="text-destructive">*</span>
                    </Label>
                    <Select value={transferOutRegistrar} onValueChange={setTransferOutRegistrar}>
                      <SelectTrigger>
                        <SelectValue placeholder="Where are you transferring to?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="godaddy">GoDaddy</SelectItem>
                        <SelectItem value="namecheap">Namecheap</SelectItem>
                        <SelectItem value="porkbun">Porkbun</SelectItem>
                        <SelectItem value="cloudflare">Cloudflare</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Card className="bg-destructive/5 border-destructive/30">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-sm mb-2 text-destructive">⚠️ Important</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Domain will be unlocked for transfer</li>
                      <li>Authorization code will be emailed to you</li>
                      <li>Domain must not have been transferred in the last 60 days</li>
                      <li>NFT token ownership will need to be transferred separately</li>
                      <li>You'll lose access to Kred-specific features (ENS, profile)</li>
                    </ul>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-3">
                  <Button
                    onClick={handleRequestAuthCode}
                    variant="outline"
                    size="lg"
                  >
                    Get Authorization Code
                  </Button>
                  <Button
                    onClick={handleTransferOut}
                    variant="destructive"
                    size="lg"
                  >
                    <ArrowRightLeft className="h-5 w-5 mr-2" />
                    Initiate Transfer Out
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Transfer Process */}
            <Card className="bg-muted/30 border-border/40">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Transfer Out Process
                </h3>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Request your authorization code (EPP code)</li>
                  <li>Domain will be automatically unlocked</li>
                  <li>You'll receive the auth code via email within 5 minutes</li>
                  <li>Initiate transfer at your new registrar using the auth code</li>
                  <li>Confirm the transfer via email</li>
                  <li>Transfer completes in 5-7 days</li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
