import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { fetchHomeData, Service } from "@/lib/api";

interface HeaderProps {
  onOpenContactModal?: () => void;
}

// Group services by category
const groupServicesByCategory = (services: Service[]) => {
  const categories: { [key: string]: { id: number; name: string; services: Service[] } } = {};
  
  services.forEach(service => {
    const categoryId = service.category.id;
    const categoryName = service.category.name;
    
    if (!categories[categoryId]) {
      categories[categoryId] = {
        id: categoryId,
        name: categoryName,
        services: []
      };
    }
    
    categories[categoryId].services.push(service);
  });
  
  return Object.values(categories);
};

const Header = ({ onOpenContactModal }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [groupedServices, setGroupedServices] = useState<{ id: number; name: string; services: Service[] }[]>([]);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchHomeData();
        const servicesData = data.data.services || [];
        setServices(servicesData);
        setGroupedServices(groupServicesByCategory(servicesData));
      } catch (err) {
        console.error("Failed to load services:", err);
      }
    };

    loadServices();
  }, []);

  const navLinks = [
    { name: "Home", path: "/", isHash: false },
    { name: "About", path: "/about", isHash: false },
    { name: "Services", path: "#", isHash: true },
    { name: "Why Us", path: "#why-us", isHash: true },
    { name: "Contact", path: "/contact", isHash: false },
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

  // Handle category hover with delay
  const handleCategoryMouseEnter = (categoryId: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredCategory(categoryId);
  };

  // Handle category mouse leave with delay
  const handleCategoryMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 300); // 300ms delay before hiding
  };

  // Handle services list mouse enter (cancel hide timeout)
  const handleServicesListMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  // Handle services list mouse leave (hide with delay)
  const handleServicesListMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 300); // 300ms delay before hiding
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-xl py-2 shadow-xl" : "bg-transparent py-4"
      }`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            <span className="text-white">SUNNEX</span>
            {/* <span className="text-yellow-500 ml-1">TECH</span> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = !link.isHash && location.pathname === link.path;

              // Special handling for Services dropdown
              if (link.name === "Services") {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setIsServicesDropdownOpen(true)}
                    onMouseLeave={() => {
                      setIsServicesDropdownOpen(false);
                      if (hoverTimeoutRef.current) {
                        clearTimeout(hoverTimeoutRef.current);
                      }
                      hoverTimeoutRef.current = setTimeout(() => {
                        setHoveredCategory(null);
                      }, 300);
                    }}
                  >
                    <a
                      href={link.path}
                      onClick={(e) => handleNavClick(e, link.path, true)}
                      className="group relative px-4 py-2 text-white hover:text-yellow-500 transition-colors duration-300 font-medium flex items-center gap-1"
                    >
                      {link.name}
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-yellow-500 transition-all duration-300 ${isServicesDropdownOpen ? "w-full" : "w-0 group-hover:w-full"
                        }`}></span>
                    </a>

                    {/* Dropdown Menu */}
                    {isServicesDropdownOpen && groupedServices.length > 0 && (
                      <div className="absolute top-full left-0 mt-2 flex bg-black/95 backdrop-blur-xl rounded-lg shadow-2xl border border-white/10 overflow-hidden z-50">
                        {/* Categories List */}
                        <div className="w-64 py-2 border-r border-white/10">
                          {groupedServices.map((category) => (
                            <div
                              key={category.id}
                              className="px-4 py-3 text-white hover:text-yellow-500 hover:bg-white/5 transition-all duration-300 font-medium flex items-center justify-between cursor-pointer"
                              onMouseEnter={() => handleCategoryMouseEnter(category.id)}
                              onMouseLeave={handleCategoryMouseLeave}
                            >
                              {category.name}
                              <ChevronRight size={16} />
                            </div>
                          ))}
                        </div>

                        {/* Services List (shown only when a category is hovered, height auto-adjusts) */}
                        {hoveredCategory && (
                          <div 
                            className="min-w-[200px] py-2 bg-black/80 flex flex-col"
                            onMouseEnter={handleServicesListMouseEnter}
                            onMouseLeave={handleServicesListMouseLeave}
                          >
                            {groupedServices
                              .find(cat => cat.id === hoveredCategory)
                              ?.services.map((service) => (
                                <Link
                                  key={service.id}
                                  to={`/services/${service.id}`}
                                  onClick={() => {
                                    setIsServicesDropdownOpen(false);
                                    setHoveredCategory(null);
                                    if (hoverTimeoutRef.current) {
                                      clearTimeout(hoverTimeoutRef.current);
                                    }
                                  }}
                                  className="block px-4 py-3 text-white hover:text-yellow-500 hover:bg-white/5 transition-all duration-300 whitespace-nowrap"
                                >
                                  {service.heading}
                                </Link>
                              ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              if (link.isHash) {
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path, true)}
                    className="group relative px-4 py-2 text-white hover:text-yellow-500 transition-colors duration-300 font-medium"
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-yellow-500 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}></span>
                  </a>
                );
              }
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path, false)}
                  className={`group relative px-4 py-2 transition-colors duration-300 font-medium ${isActive ? "text-yellow-500" : "text-white hover:text-yellow-500"
                    }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-yellow-500 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
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
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${isScrolled
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
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="py-4 space-y-2 bg-black/95 backdrop-blur-xl rounded-b-2xl border-t border-white/10">
            {navLinks.map((link) => {
              const isActive = !link.isHash && location.pathname === link.path;

              // Special handling for Services dropdown in mobile
              if (link.name === "Services") {
                return (
                  <div key={link.name}>
                    <button
                      onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                      className="w-full flex items-center justify-between py-3 px-4 text-white hover:text-yellow-500 hover:bg-white/5 transition-all duration-300 font-medium rounded-lg"
                    >
                      <span>{link.name}</span>
                      <ChevronRight
                        size={16}
                        className={`transition-transform duration-300 ${isMobileServicesOpen ? "rotate-90" : ""
                          }`}
                      />
                    </button>
                    {isMobileServicesOpen && groupedServices.length > 0 && (
                      <div className="pl-4 space-y-1">
                        {groupedServices.map((category) => (
                          <div key={category.id}>
                            <div className="px-4 py-2 text-white/90 font-medium">
                              {category.name}
                            </div>
                            <div className="pl-4 space-y-1">
                              {category.services.map((service) => (
                                <Link
                                  key={service.id}
                                  to={`/services/${service.id}`}
                                  onClick={() => {
                                    setIsMobileServicesOpen(false);
                                    setIsMobileMenuOpen(false);
                                  }}
                                  className="block py-2 px-4 text-white/80 hover:text-yellow-500 hover:bg-white/5 transition-all duration-300 font-medium rounded-lg text-sm"
                                >
                                  {service.heading}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

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
                  className={`block py-3 px-4 transition-all duration-300 font-medium rounded-lg ${isActive
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