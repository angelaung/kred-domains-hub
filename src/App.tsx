import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import DomainSearch from "./pages/DomainSearch";
import MyDomains from "./pages/MyDomains";
import DomainRenewal from "./pages/DomainRenewal";
import RegistrantDetails from "./pages/RegistrantDetails";
import TokenManagement from "./pages/TokenManagement";
import DNSManagement from "./pages/DNSManagement";
import ENSManagement from "./pages/ENSManagement";
import Transfers from "./pages/Transfers";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DomainSearch />} />
            <Route path="/my-domains" element={<MyDomains />} />
            <Route path="/renewals/:domainId" element={<DomainRenewal />} />
            <Route path="/registrant/:domainId" element={<RegistrantDetails />} />
            <Route path="/token/:domainId" element={<TokenManagement />} />
            <Route path="/dns/:domainId" element={<DNSManagement />} />
            <Route path="/dns" element={<DNSManagement />} />
            <Route path="/ens/:domainId" element={<ENSManagement />} />
            <Route path="/transfers" element={<Transfers />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
