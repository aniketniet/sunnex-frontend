import { Link } from "react-router-dom";
import { Facebook, Youtube, Linkedin, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "Youtube" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const services = [
    "Building Contracting",
    "Industrial Projects",
    "Residential Construction",
    "Restaurant Design",
    "Interior Design",
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              <span className="text-primary-foreground">SUNNEX</span>
              <span className="text-accent ml-1">TECH</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Full-service contracting and construction company specializing in high-quality building, renovation, and maintenance.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="bg-primary-foreground/10 hover:bg-accent p-2 rounded-full transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#about" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#services" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  Services
                </a>
              </li>
              <li>
                <a href="/#why-us" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  Why Choose Us
                </a>
              </li>
              <li>
                <Link to="/terms" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <a href="/#contact" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-accent mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  401, Jumbo Building, Bur Dubai, UAE
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">+971 569335833</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">info@sunnextech.ae</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} Sunnex Technical Works LLC. All rights reserved.
            </p>
            <p className="text-primary-foreground/60 text-sm italic">
              "Let's Do It Together"
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
