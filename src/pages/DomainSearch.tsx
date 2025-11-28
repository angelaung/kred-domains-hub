import { useState } from "react";
import { Search, Check, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface DomainResult {
  name: string;
  available: boolean;
  price: number;
  premium?: boolean;
}

export default function DomainSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<DomainResult[]>([]);
  const [cart, setCart] = useState<Map<string, number>>(new Map());

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults: DomainResult[] = [
        {
          name: `${searchTerm}.kred`,
          available: true,
          price: 29.99,
        },
        {
          name: `${searchTerm}.com`,
          available: false,
          price: 0,
        },
        {
          name: `${searchTerm}nft.kred`,
          available: true,
          price: 29.99,
        },
        {
          name: `${searchTerm}web3.kred`,
          available: true,
          price: 49.99,
          premium: true,
        },
      ];
      setResults(mockResults);
      setSearching(false);
    }, 800);
  };

  const addToCart = (domain: string, years: number) => {
    setCart(new Map(cart.set(domain, years)));
    toast.success(`${domain} added to cart for ${years} year${years > 1 ? 's' : ''}`);
  };

  const removeFromCart = (domain: string) => {
    const newCart = new Map(cart);
    newCart.delete(domain);
    setCart(newCart);
    toast.info(`${domain} removed from cart`);
  };

  const getTotalPrice = () => {
    let total = 0;
    results.forEach(result => {
      const years = cart.get(result.name);
      if (years && result.available) {
        total += result.price * years;
      }
    });
    return total.toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-12 animate-slide-up">
        <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
          Find Your Perfect{" "}
          <span className="gradient-text">.Kred</span> Domain
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your identity, both online and onchain. DNS + ENS support included.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your perfect domain name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 h-14 text-lg bg-card border-border/60"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={searching}
              size="lg"
              className="h-14 px-8 animate-glow-pulse"
            >
              {searching ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="max-w-4xl mx-auto space-y-4 animate-slide-up">
          <h2 className="text-2xl font-display font-bold mb-6">Search Results</h2>
          
          {results.map((result) => (
            <Card key={result.name} className="bg-card border-border/60 hover:border-primary/40 transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${
                      result.available 
                        ? "bg-primary/10 text-primary" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {result.available ? <Check className="h-6 w-6" /> : <X className="h-6 w-6" />}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-display font-semibold">{result.name}</h3>
                        {result.premium && (
                          <Badge variant="secondary" className="bg-secondary/20">
                            Premium
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {result.available ? "Available for registration" : "Not available"}
                      </p>
                    </div>
                  </div>

                  {result.available && (
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          ${result.price}
                        </p>
                        <p className="text-xs text-muted-foreground">per year</p>
                      </div>

                      {!cart.has(result.name) ? (
                        <div className="flex items-center gap-2">
                          <Select
                            defaultValue="1"
                            onValueChange={(value) => addToCart(result.name, parseInt(value))}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 5, 10].map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year} {year === 1 ? "year" : "years"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Badge variant="default" className="bg-primary/20">
                            {cart.get(result.name)} year{cart.get(result.name)! > 1 ? 's' : ''}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(result.name)}
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Cart Summary */}
          {cart.size > 0 && (
            <Card className="bg-primary/5 border-primary/40 animate-slide-up">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <ShoppingCart className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-display font-semibold text-lg">
                        {cart.size} domain{cart.size > 1 ? 's' : ''} in cart
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Total: <span className="text-primary font-bold">${getTotalPrice()}</span>
                      </p>
                    </div>
                  </div>
                  <Button size="lg" className="animate-glow-pulse">
                    Proceed to Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
