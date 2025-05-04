
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const navItems = [
  { name: "Home", path: "#hero" },
  { name: "About", path: "#about" },
  { name: "Projects", path: "#projects" },
  { name: "Blog", path: "#blog" },
  { name: "Contact", path: "#contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut, isAdmin } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">DevPortfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  className="font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Authentication Links */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" /> 
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={signOut} className="text-red-500">
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" variant="default">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
          
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background z-40 md:hidden animate-fade-in">
          <nav className="container py-8">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className="block py-2 text-xl font-medium text-foreground/80 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              {user ? (
                <li>
                  <Button 
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }} 
                    variant="ghost" 
                    className="w-full justify-start py-2 text-xl font-medium"
                  >
                    <LogOut className="h-5 w-5 mr-2" /> Sign Out
                  </Button>
                </li>
              ) : (
                <li>
                  <Link 
                    to="/auth" 
                    className="block py-2 text-xl font-medium text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
