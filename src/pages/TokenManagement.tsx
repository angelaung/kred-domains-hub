import { useState } from "react";
import { useParams } from "react-router-dom";
import { Shield, ExternalLink, Copy, QrCode, Download, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function TokenManagement() {
  const { domainId } = useParams();
  const [transferAddress, setTransferAddress] = useState("");

  const domain = "yourname.kred";
  const tokenId = "0x1234567890abcdef1234567890abcdef12345678";
  const contractAddress = "0xabcdef1234567890abcdef1234567890abcdef12";
  const blockchain = "Polygon";
  const ownerAddress = "0x9876543210fedcba9876543210fedcba98765432";

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handleTransfer = () => {
    if (!transferAddress) {
      toast.error("Please enter a wallet address");
      return;
    }
    toast.success("Transfer initiated! Check your wallet to confirm.");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
            Domain <span className="gradient-text">Token</span>
          </h1>
          <p className="text-muted-foreground">
            Manage your NFT token for {domain}
          </p>
        </div>

        <div className="space-y-6 animate-slide-up">
          {/* Token Overview */}
          <Card className="bg-card border-border/60">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 mb-2">
                    <Shield className="h-6 w-6 text-primary" />
                    {domain}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary/20 text-primary">NFT Token</Badge>
                    <Badge variant="outline">{blockchain}</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on OpenSea
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Token Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Token ID</Label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-muted px-3 py-2 rounded text-sm font-mono truncate">
                      {tokenId}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(tokenId, "Token ID")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Contract Address</Label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-muted px-3 py-2 rounded text-sm font-mono truncate">
                      {contractAddress}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(contractAddress, "Contract address")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">Current Owner</Label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-muted px-3 py-2 rounded text-sm font-mono truncate">
                    {ownerAddress}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(ownerAddress, "Owner address")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Token Actions */}
              <div className="grid md:grid-cols-3 gap-3">
                <Button variant="outline" className="w-full">
                  <QrCode className="h-4 w-4 mr-2" />
                  Show QR Code
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Metadata
                </Button>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Explorer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transfer Token */}
          <Card className="bg-card border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                Transfer Token
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Transfer this domain NFT to another wallet address
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transferAddress">
                  Recipient Wallet Address
                </Label>
                <Input
                  id="transferAddress"
                  placeholder="0x..."
                  value={transferAddress}
                  onChange={(e) => setTransferAddress(e.target.value)}
                  className="font-mono"
                />
              </div>

              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                <p className="text-sm font-medium mb-2 text-destructive">⚠️ Important</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Transferring the token will transfer domain ownership</li>
                  <li>This action cannot be undone</li>
                  <li>Verify the recipient address is correct</li>
                  <li>Gas fees will apply</li>
                </ul>
              </div>

              <Button
                onClick={handleTransfer}
                className="w-full"
                size="lg"
              >
                <Send className="h-5 w-5 mr-2" />
                Initiate Transfer
              </Button>
            </CardContent>
          </Card>

          {/* Token Info */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                About Domain Tokens
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Your .Kred domain is represented as an NFT token on the blockchain. This provides:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>True ownership - you control your domain via your wallet</li>
                  <li>Tradability - buy, sell, or transfer on NFT marketplaces</li>
                  <li>Interoperability - use across Web3 applications</li>
                  <li>Verification - provable ownership on the blockchain</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
