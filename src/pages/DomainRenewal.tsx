import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, CreditCard, User, Mail, Phone, MapPin, Building, Globe, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface RegistrantInfo {
  firstName: string;
  lastName: string;
  organization?: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export default function DomainRenewal() {
  const { domainId } = useParams();
  const navigate = useNavigate();
  const [years, setYears] = useState("1");
  const [confirmed, setConfirmed] = useState(false);

  // Mock registrant data (would come from CNR contact ID)
  const [registrant] = useState<RegistrantInfo>({
    firstName: "John",
    lastName: "Doe",
    organization: "Web3 Ventures",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Blockchain Ave",
    city: "San Francisco",
    state: "CA",
    postalCode: "94102",
    country: "United States",
  });

  const domain = "yourname.kred";
  const pricePerYear = 29.99;
  const currentExpiry = "2025-12-15";
  
  const calculateTotal = () => {
    return (pricePerYear * parseInt(years)).toFixed(2);
  };

  const calculateNewExpiry = () => {
    const current = new Date(currentExpiry);
    current.setFullYear(current.getFullYear() + parseInt(years));
    return current.toLocaleDateString();
  };

  const handleRenewal = () => {
    if (!confirmed) {
      toast.error("Please confirm your registrant details");
      return;
    }
    toast.success("Domain renewal initiated!");
    setTimeout(() => navigate("/my-domains"), 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
            Renew <span className="gradient-text">{domain}</span>
          </h1>
          <p className="text-muted-foreground">
            Extend your domain registration and confirm registrant details
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6 animate-slide-up">
            {/* Renewal Period */}
            <Card className="bg-card border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Renewal Period
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Renew for</Label>
                  <Select value={years} onValueChange={setYears}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 5, 10].map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year} {year === 1 ? "year" : "years"} - ${(pricePerYear * year).toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current expiry:</span>
                    <span className="font-medium">{new Date(currentExpiry).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">New expiry:</span>
                    <span className="font-medium text-primary">{calculateNewExpiry()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Registrant Details Confirmation */}
            <Card className="bg-card border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Confirm Registrant Details
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Please verify your contact information is correct
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <p className="font-medium">{registrant.firstName} {registrant.lastName}</p>
                  </div>

                  {registrant.organization && (
                    <div className="space-y-2">
                      <Label className="text-muted-foreground flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Organization
                      </Label>
                      <p className="font-medium">{registrant.organization}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <p className="font-medium">{registrant.email}</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </Label>
                    <p className="font-medium">{registrant.phone}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </Label>
                  <div className="font-medium">
                    <p>{registrant.address}</p>
                    <p>{registrant.city}, {registrant.state} {registrant.postalCode}</p>
                    <p>{registrant.country}</p>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={confirmed}
                      onChange={(e) => setConfirmed(e.target.checked)}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-medium">I confirm these details are correct</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Need to update? <a href={`/registrant/${domainId}`} className="text-primary hover:underline">Edit registrant details</a>
                      </p>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6 animate-slide-up">
            <Card className="bg-card border-border/60 sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Domain:</span>
                    <span className="font-medium">{domain}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Period:</span>
                    <span className="font-medium">{years} {parseInt(years) === 1 ? 'year' : 'years'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price/year:</span>
                    <span className="font-medium">${pricePerYear}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">${calculateTotal()}</span>
                </div>

                <Button 
                  onClick={handleRenewal}
                  disabled={!confirmed}
                  className="w-full animate-glow-pulse"
                  size="lg"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Complete Renewal
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                  <p>Secure payment powered by Stripe</p>
                  <p className="mt-1">DNS + ENS support included</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
