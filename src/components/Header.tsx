import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  onOpenContactModal?: () => void;
}

const Header = ({ onOpenContactModal }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", isHash: false },
    { name: "About", path: "/about", isHash: false },
    { name: "Services", path: "#services", isHash: true },
    { name: "Why Us", path: "#why-us", isHash: true },
    { name: "Contact", path: "#contact", isHash: true },
  ];

  const handleNavClick = (e, path, isHash) => {
    setIsMobileMenuOpen(false);
    
    // If we have a contact modal function and the path is contact, open the modal
    if (onOpenContactModal && path === "#contact") {
      e.preventDefault();
      onOpenContactModal();
      return;
    }
    
    if (!isHash) {
      // For React Router links, just navigate
      return;
    }
    
    e.preventDefault();
    
    if (path === "#home" || path === "/") {
      if (location.pathname !== "/") {
        window.location.href = "/";
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // If we're not on the home page, navigate to home first, then scroll
      if (location.pathname !== "/") {
        window.location.href = `/${path}`;
      } else {
        // We're on home page, just scroll to the section
        const element = document.querySelector(path);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-xl shadow-2xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center space-x-2 group"
          >
            <div className="text-2xl md:text-3xl font-bold tracking-tight">
              <span className={`transition-colors duration-300 ${
                isScrolled ? "text-white" : "text-white"
              }`}>
                SUNNEX
              </span>
              <span className="text-yellow-500 ml-1 group-hover:text-yellow-400 transition-colors duration-300">
                TECH
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = !link.isHash && location.pathname === link.path;
              if (link.isHash) {
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path, true)}
                    className="group relative px-4 py-2 text-white hover:text-yellow-500 transition-colors duration-300 font-medium"
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-yellow-500 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}></span>
                  </a>
                );
              }
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path, false)}
                  className={`group relative px-4 py-2 transition-colors duration-300 font-medium ${
                    isActive ? "text-yellow-500" : "text-white hover:text-yellow-500"
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-yellow-500 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                </Link>
              );
            })}
            <Button 
              size="lg" 
              className="bg-yellow-500 text-black hover:bg-yellow-400 font-semibold px-8 py-2.5 rounded-full shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105"
              onClick={onOpenContactModal}
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
              isScrolled 
                ? "text-white hover:bg-white/10" 
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 bg-black/95 backdrop-blur-xl rounded-b-2xl border-t border-white/10">
            {navLinks.map((link) => {
              const isActive = !link.isHash && location.pathname === link.path;
              if (link.isHash) {
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path, true)}
                    className="block py-3 px-4 text-white hover:text-yellow-500 hover:bg-white/5 transition-all duration-300 font-medium rounded-lg"
                  >
                    {link.name}
                  </a>
                );
              }
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path, false)}
                  className={`block py-3 px-4 transition-all duration-300 font-medium rounded-lg ${
                    isActive 
                      ? "text-yellow-500 bg-white/10" 
                      : "text-white hover:text-yellow-500 hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="px-4 pt-2">
              <Button 
                size="lg" 
                className="w-full bg-yellow-500 text-black hover:bg-yellow-400 font-semibold py-3 rounded-full shadow-lg hover:shadow-yellow-500/50 transition-all duration-300"
                onClick={onOpenContactModal}
              >
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;