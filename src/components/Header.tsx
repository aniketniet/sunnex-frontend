import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { fetchHomeData, Service } from "@/lib/api";
import Logo from "/logo.svg";

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

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setIsMobileServicesOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/", isHash: false },
    { name: "About", path: "/about", isHash: false },
    { name: "Services", path: "#", isHash: true },
    { name: "Why Us", path: "#why-us", isHash: true },
    { name: "Contact", path: "/contact", isHash: false },
  ];

  const handleNavClick = (e, path, isHash) => {
    setIsMobileMenuOpen(false);

    if (onOpenContactModal && path === "#contact") {
      e.preventDefault();
      onOpenContactModal();
      return;
    }

    if (!isHash) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
      return;
    }

    e.preventDefault();

    if (path === "#home" || path === "/") {
      if (location.pathname !== "/") {
        window.location.href = "/";
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      if (location.pathname !== "/") {
        window.location.href = `/${path}`;
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 0);
      } else {
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

  const handleCategoryMouseEnter = (categoryId: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredCategory(categoryId);
  };

  const handleCategoryMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 300);
  };

  const handleServicesListMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleServicesListMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 300);
  };

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white shadow-lg py-1" 
            : "bg-white/95 backdrop-blur-md py-2"
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <nav className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0 z-50"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img
                src={Logo}
                alt="Sunnex Logo"
                className="h-14 sm:h-16 md:h-18 lg:h-20 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = !link.isHash && location.pathname === link.path;

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
                        className="group relative px-3 xl:px-4 py-2 text-sm xl:text-base text-foreground hover:text-[#da0530] transition-colors duration-300 font-medium flex items-center gap-1"
                      >
                        {link.name}
                        <ChevronDown 
                          size={14} 
                          className={`transition-transform duration-300 ${
                            isServicesDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                        <span className={`absolute -bottom-0.5 left-0 h-0.5 bg-[#da0530] transition-all duration-300 ${
                          isServicesDropdownOpen ? "w-full" : "w-0 group-hover:w-full"
                        }`}></span>
                      </a>

                      {/* Dropdown Menu */}
                      {isServicesDropdownOpen && groupedServices.length > 0 && (
                        <div className="absolute top-full left-0 mt-2 flex bg-white backdrop-blur-xl rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 min-w-[500px]">
                          {/* Categories List */}
                          <div className="w-64 py-2 border-r border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                            {groupedServices.map((category) => (
                              <div
                                key={category.id}
                                className={`px-4 py-3 text-sm font-medium flex items-center justify-between cursor-pointer transition-all duration-300 ${
                                  hoveredCategory === category.id
                                    ? "text-[#da0530] bg-red-50 border-l-4 border-[#da0530]"
                                    : "text-foreground hover:text-[#da0530] hover:bg-gray-50 border-l-4 border-transparent"
                                }`}
                                onMouseEnter={() => handleCategoryMouseEnter(category.id)}
                                onMouseLeave={handleCategoryMouseLeave}
                              >
                                <span className="truncate">{category.name}</span>
                                <ChevronRight size={16} className="flex-shrink-0 ml-2" />
                              </div>
                            ))}
                          </div>

                          {/* Services List */}
                          {hoveredCategory && (
                            <div 
                              className="min-w-[240px] max-w-[300px] py-2 bg-white flex flex-col"
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
                                      window.scrollTo({ top: 0, behavior: "smooth" });
                                      if (hoverTimeoutRef.current) {
                                        clearTimeout(hoverTimeoutRef.current);
                                      }
                                    }}
                                    className="block px-4 py-3 text-sm text-foreground hover:text-[#da0530] hover:bg-red-50 transition-all duration-300 border-l-2 border-transparent hover:border-[#da0530]"
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
                      className="group relative px-3 xl:px-4 py-2 text-sm xl:text-base text-foreground hover:text-[#da0530] transition-colors duration-300 font-medium"
                    >
                      {link.name}
                      <span className={`absolute -bottom-0.5 left-0 h-0.5 bg-[#da0530] transition-all duration-300 ${
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
                    className={`group relative px-3 xl:px-4 py-2 text-sm xl:text-base transition-colors duration-300 font-medium ${
                      isActive ? "text-[#da0530]" : "text-foreground hover:text-[#da0530]"
                    }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-0.5 left-0 h-0.5 bg-[#da0530] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}></span>
                  </Link>
                );
              })}
              <Button
                size="sm"
                className="bg-[#da0530] text-white hover:bg-[#b8041f] font-semibold px-5 xl:px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:shadow-[#da0530]/30 transition-all duration-300 hover:scale-105 text-sm xl:text-base ml-2"
                onClick={onOpenContactModal}
              >
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg transition-all duration-300 text-foreground hover:bg-gray-100 active:bg-gray-200 z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-16 sm:top-18 right-0 w-full sm:w-80 md:w-96 h-[calc(100vh-4rem)] sm:h-[calc(100vh-4.5rem)] bg-white shadow-2xl z-40 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="py-4 px-3 sm:px-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = !link.isHash && location.pathname === link.path;

            if (link.name === "Services") {
              return (
                <div key={link.name} className="border-b border-gray-100 pb-2">
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="w-full flex items-center justify-between py-3 px-4 text-foreground hover:text-[#da0530] hover:bg-gray-50 active:bg-gray-100 transition-all duration-300 font-semibold rounded-lg text-base"
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        isMobileServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isMobileServicesOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {groupedServices.length > 0 && (
                      <div className="pl-2 sm:pl-3 space-y-2 mt-2">
                        {groupedServices.map((category) => (
                          <div key={category.id} className="border-l-2 border-gray-200 pl-3">
                            <div className="px-3 py-2 text-foreground/90 font-semibold text-sm bg-gray-50 rounded-md">
                              {category.name}
                            </div>
                            <div className="pl-2 space-y-1 mt-1">
                              {category.services.map((service) => (
                                <Link
                                  key={service.id}
                                  to={`/services/${service.id}`}
                                  onClick={() => {
                                    setIsMobileServicesOpen(false);
                                    setIsMobileMenuOpen(false);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                  }}
                                  className="block py-2 px-3 text-foreground/80 hover:text-[#da0530] hover:bg-red-50 active:bg-red-100 transition-all duration-300 font-medium rounded-md text-sm"
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
                </div>
              );
            }

            if (link.isHash) {
              return (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.path, true)}
                  className="block py-3 px-4 text-foreground hover:text-[#da0530] hover:bg-gray-50 active:bg-gray-100 transition-all duration-300 font-semibold rounded-lg text-base"
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
                className={`block py-3 px-4 transition-all duration-300 font-semibold rounded-lg text-base ${
                  isActive
                    ? "text-[#da0530] bg-red-50"
                    : "text-foreground hover:text-[#da0530] hover:bg-gray-50 active:bg-gray-100"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="px-3 pt-4">
            <Button
              size="lg"
              className="w-full bg-[#da0530] text-white hover:bg-[#b8041f] font-semibold py-4 rounded-full shadow-lg hover:shadow-xl hover:shadow-[#da0530]/30 transition-all duration-300 active:scale-95 text-base"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenContactModal?.();
              }}
            >
              Get Quote
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;