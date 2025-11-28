import { Link, useLocation } from "react-router-dom";
import { Globe, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigationItems = [
  { name: "Search", path: "/" },
  { name: "My Domains", path: "/my-domains" },
  { name: "Transfers", path: "/transfers" },
  { name: "DNS", path: "/dns" },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navigationItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`${
            location.pathname === item.path
              ? "text-primary font-medium"
              : "text-foreground/80 hover:text-foreground"
          } transition-colors ${mobile ? "block py-2" : ""}`}
        >
          {item.name}
        </Link>
      ))}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary" />
              <span className="font-display text-xl font-bold gradient-text">
                Domains.Kred
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <NavLinks />
            </nav>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  <NavLinks mobile />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Domains.Kred. Powered by OneHub.</p>
        </div>
      </footer>
    </div>
  );
};
