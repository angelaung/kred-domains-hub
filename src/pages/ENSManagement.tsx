import { useState } from "react";
import { useParams } from "react-router-dom";
import { Wallet, ExternalLink, Save, AlertCircle, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface WalletAddress {
  type: string;
  address: string;
  icon: string;
}

export default function ENSManagement() {
  const { domainId } = useParams();
  const domain = "yourname.kred";

  const [addresses, setAddresses] = useState<WalletAddress[]>([
    { type: "ETH", address: "0x1234567890abcdef1234567890abcdef12345678", icon: "Ξ" },
    { type: "BTC", address: "", icon: "₿" },
    { type: "SOL", address: "", icon: "◎" },
  ]);

  const [contentHash, setContentHash] = useState("ipfs://QmX...");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");

  const handleAddressChange = (type: string, value: string) => {
    setAddresses(addresses.map(addr =>
      addr.type === type ? { ...addr, address: value } : addr
    ));
  };

  const handleSave = () => {
    toast.success("ENS records updated! Changes will reflect shortly on the blockchain.");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
            ENS <span className="gradient-text">Management</span>
          </h1>
          <p className="text-muted-foreground">
            Configure Web3 records for {domain}
          </p>
        </div>

        <div className="space-y-6 animate-slide-up">
          {/* Status */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">ENS Resolver Active</p>
                  <p className="text-xs text-muted-foreground">
                    Connected to Ethereum Mainnet
                  </p>
                </div>
              </div>
              <Badge className="bg-primary/20 text-primary">Active</Badge>
            </CardContent>
          </Card>

          {/* Wallet Addresses */}
          <Card className="bg-card border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                Cryptocurrency Addresses
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Link your crypto wallets to receive payments at {domain}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {addresses.map((addr) => (
                <div key={addr.type} className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <span className="text-lg">{addr.icon}</span>
                    {addr.type} Address
                  </Label>
                  <Input
                    placeholder={`Enter your ${addr.type} address`}
                    value={addr.address}
                    onChange={(e) => handleAddressChange(addr.type, e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>
              ))}

              <div className="bg-muted/50 p-4 rounded-lg text-sm">
                <p className="text-muted-foreground">
                  💡 When someone sends {domain} as a payment address, it will automatically resolve to your configured wallet address for that cryptocurrency.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Content Hash */}
          <Card className="bg-card border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-primary" />
                Decentralized Website (IPFS/IPNS)
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Host your website on IPFS and link it to your domain
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Content Hash</Label>
                <Input
                  placeholder="ipfs://... or ipns://..."
                  value={contentHash}
                  onChange={(e) => setContentHash(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Preview IPFS Site
                </Button>
                <Button variant="outline" size="sm">
                  Upload to IPFS
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Text Records */}
          <Card className="bg-card border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Text Records
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Add profile information and social links
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Avatar (URL or NFT)</Label>
                  <Input
                    placeholder="https://... or eip155:1/erc721:..."
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Website URL</Label>
                  <Input
                    placeholder="https://..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Twitter</Label>
                  <Input
                    placeholder="@username"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>GitHub</Label>
                  <Input
                    placeholder="username"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info */}
          <Card className="bg-muted/30 border-border/40">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm">
                  <p className="font-medium">About ENS Records</p>
                  <p className="text-muted-foreground">
                    ENS (Ethereum Name Service) allows your .Kred domain to work as a Web3 identity. 
                    Your configured addresses will work across any ENS-compatible wallet or dApp. 
                    Changes require an on-chain transaction and gas fees will apply.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg" className="animate-glow-pulse">
              <Save className="h-5 w-5 mr-2" />
              Save ENS Records
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
