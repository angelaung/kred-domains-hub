import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShoppingCart, CreditCard, Wallet, User, Mail, Phone, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface CartDomain {
  name: string;
  years: number;
  price: number;
}

interface RegistrantData {
  firstName: string;
  lastName: string;
  organization: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto">("card");
  
  // Cart state
  const [cart, setCart] = useState<CartDomain[]>([]);
  
  // Registrant data state - check if we have existing data (mock for now)
  const hasExistingRegistrant = false; // Would check from backend/localStorage
  const [registrantData, setRegistrantData] = useState<RegistrantData>({
    firstName: hasExistingRegistrant ? "John" : "",
    lastName: hasExistingRegistrant ? "Doe" : "",
    organization: hasExistingRegistrant ? "Web3 Ventures" : "",
    email: hasExistingRegistrant ? "john@example.com" : "",
    phone: hasExistingRegistrant ? "+1 (555) 123-4567" : "",
    address: hasExistingRegistrant ? "123 Blockchain Ave" : "",
    city: hasExistingRegistrant ? "San Francisco" : "",
    state: hasExistingRegistrant ? "CA" : "",
    postalCode: hasExistingRegistrant ? "94102" : "",
    country: hasExistingRegistrant ? "US" : "",
  });

  // Load domain from URL parameter
  useEffect(() => {
    const domainParam = searchParams.get("domain");
    if (domainParam) {
      const newDomain: CartDomain = {
        name: domainParam,
        years: 1,
        price: 99,
      };
      setCart([newDomain]);
    }
  }, [searchParams]);

  const calculateTotal = () => {
    return cart.reduce((total, domain) => total + (domain.price * domain.years), 0);
  };

  const updateDomainYears = (index: number, years: number) => {
    const updatedCart = [...cart];
    updatedCart[index].years = years;
    setCart(updatedCart);
  };

  const handleRegistrantChange = (field: keyof RegistrantData, value: string) => {
    setRegistrantData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    if (step === 1 && cart.length === 0) {
      toast.error("Please add domains to your cart");
      return false;
    }
    if (step === 2) {
      const required = ["firstName", "lastName", "email", "phone", "address", "city", "state", "postalCode", "country"];
      for (const field of required) {
        if (!registrantData[field as keyof RegistrantData]) {
          toast.error("Please fill in all required fields");
          return false;
        }
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleCheckout = async () => {
    // Simulate payment processing
    toast.success("Processing payment...");
    setTimeout(() => {
      toast.success("Domains registered successfully!");
      navigate("/my-domains");
    }, 2000);
  };

  const stepProgress = (step / 3) * 100;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
            <span className="gradient-text">Checkout</span>
          </h1>
          <p className="text-muted-foreground">
            Complete your domain registration
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 animate-slide-up">
          <Progress value={stepProgress} className="h-2" />
          <div className="flex justify-between mt-4 text-sm">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                {step > 1 ? <Check className="w-4 h-4" /> : "1"}
              </div>
              <span className="hidden sm:inline">Domains</span>
            </div>
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                {step > 2 ? <Check className="w-4 h-4" /> : "2"}
              </div>
              <span className="hidden sm:inline">Details</span>
            </div>
            <div className={`flex items-center gap-2 ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                3
              </div>
              <span className="hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>

        {/* Step 1: Confirm Selected Domains */}
        {step === 1 && (
          <div className="space-y-6 animate-slide-up">
            <Card className="bg-card border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Selected Domains
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Your cart is empty</p>
                    <Button
                      onClick={() => navigate("/")}
                      variant="outline"
                      className="mt-4"
                    >
                      Search for domains
                    </Button>
                  </div>
                ) : (
                  <>
                    {cart.map((domain, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/40"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-lg">{domain.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${domain.price}/year
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Years</Label>
                            <Select
                              value={domain.years.toString()}
                              onValueChange={(value) => updateDomainYears(index, parseInt(value))}
                            >
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5].map(year => (
                                  <SelectItem key={year} value={year.toString()}>
                                    {year} {year === 1 ? "year" : "years"}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="text-right min-w-[80px]">
                            <p className="font-bold text-lg">
                              ${domain.price * domain.years}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-4 border-t border-border/40">
                      <p className="text-lg font-semibold">Total</p>
                      <p className="text-2xl font-bold gradient-text">
                        ${calculateTotal()}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {cart.length > 0 && (
              <div className="flex gap-4">
                <Button
                  onClick={() => navigate("/")}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  Add More Domains
                </Button>
                <Button
                  onClick={nextStep}
                  size="lg"
                  className="flex-1 animate-glow-pulse"
                >
                  Continue
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Confirm Registration Details */}
        {step === 2 && (
          <div className="space-y-6 animate-slide-up">
            <Card className="bg-card border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Registration Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      value={registrantData.firstName}
                      onChange={(e) => handleRegistrantChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      value={registrantData.lastName}
                      onChange={(e) => handleRegistrantChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">
                    Organization <span className="text-muted-foreground text-sm">(Optional)</span>
                  </Label>
                  <Input
                    id="organization"
                    value={registrantData.organization}
                    onChange={(e) => handleRegistrantChange("organization", e.target.value)}
                    placeholder="Company or organization name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="h-4 w-4 inline mr-1" />
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={registrantData.email}
                      onChange={(e) => handleRegistrantChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      <Phone className="h-4 w-4 inline mr-1" />
                      Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={registrantData.phone}
                      onChange={(e) => handleRegistrantChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Street Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address"
                    value={registrantData.address}
                    onChange={(e) => handleRegistrantChange("address", e.target.value)}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      City <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="city"
                      value={registrantData.city}
                      onChange={(e) => handleRegistrantChange("city", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">
                      State/Province <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="state"
                      value={registrantData.state}
                      onChange={(e) => handleRegistrantChange("state", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">
                      Postal Code <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="postalCode"
                      value={registrantData.postalCode}
                      onChange={(e) => handleRegistrantChange("postalCode", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">
                      Country <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={registrantData.country}
                      onValueChange={(value) => handleRegistrantChange("country", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                        <SelectItem value="JP">Japan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> These registration details will be applied to all domains in your account
                    and will be used for future registrations, renewals, and transfers.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={nextStep}
                size="lg"
                className="flex-1 animate-glow-pulse"
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="space-y-6 animate-slide-up">
            <Card className="bg-card border-border/60">
              <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value as "card" | "crypto")}
                  className="space-y-4"
                >
                  <div
                    className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      paymentMethod === "card"
                        ? "border-primary bg-primary/5"
                        : "border-border/40 bg-background/50"
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <RadioGroupItem value="card" id="card" />
                    <Label
                      htmlFor="card"
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <CreditCard className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium">Credit Card</p>
                        <p className="text-sm text-muted-foreground">
                          Pay with Visa, Mastercard, or Amex
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div
                    className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      paymentMethod === "crypto"
                        ? "border-primary bg-primary/5"
                        : "border-border/40 bg-background/50"
                    }`}
                    onClick={() => setPaymentMethod("crypto")}
                  >
                    <RadioGroupItem value="crypto" id="crypto" />
                    <Label
                      htmlFor="crypto"
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <Wallet className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium">Cryptocurrency</p>
                        <p className="text-sm text-muted-foreground">
                          Pay with ETH, BTC, or other crypto
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" maxLength={5} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" maxLength={4} />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "crypto" && (
                  <div className="space-y-4 pt-4 text-center">
                    <div className="bg-background/50 border border-border/40 rounded-lg p-8">
                      <Wallet className="h-16 w-16 mx-auto mb-4 text-primary" />
                      <p className="text-muted-foreground mb-2">
                        Connect your Web3 wallet to continue
                      </p>
                      <Button variant="outline" size="lg" className="mt-4">
                        Connect Wallet
                      </Button>
                    </div>
                  </div>
                )}

                {/* Order Summary */}
                <div className="pt-6 border-t border-border/40">
                  <h3 className="font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-2">
                    {cart.map((domain, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {domain.name} ({domain.years} {domain.years === 1 ? "year" : "years"})
                        </span>
                        <span className="font-medium">${domain.price * domain.years}</span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-4 border-t border-border/40">
                      <span className="font-semibold text-lg">Total</span>
                      <span className="font-bold text-xl gradient-text">
                        ${calculateTotal()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleCheckout}
                size="lg"
                className="flex-1 animate-glow-pulse"
              >
                Complete Purchase
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
