import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Building2, Warehouse, Home, Utensils, PaintBucket, ArrowRight } from "lucide-react";
import { Service } from "@/lib/api";
import { useState } from "react";

interface ServicesSectionProps {
  services?: Service[];
}

const staticServices = [
  // {
  //   id: "building-contracting",
  //   icon: Building2,
  //   title: "Building Contracting",
  //   description: "Comprehensive building contracting services for all types of construction projects with expert project management.",
  //   image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
  // },
  // {
  //   id: "industrial-projects",
  //   icon: Warehouse,
  //   title: "Industrial Projects & Warehouse Construction",
  //   description: "Specialized in large-scale industrial facilities and warehouse construction with focus on efficiency and safety.",
  //   image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=800&q=80",
  // },
  // {
  //   id: "residential-construction",
  //   icon: Home,
  //   title: "Residential & Commercial Villas",
  //   description: "Luxury villa construction for residential and commercial purposes with attention to detail and quality.",
  //   image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  // },
  // {
  //   id: "restaurant-design",
  //   icon: Utensils,
  //   title: "Restaurant Design & Build",
  //   description: "Complete restaurant design and construction services creating functional and attractive dining spaces.",
  //   image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  // },
  // {
  //   id: "interior-design",
  //   icon: PaintBucket,
  //   title: "Interior Design & Build",
  //   description: "Professional interior design and build services transforming spaces into beautiful, functional environments.",
  //   image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  // },
];

const ServicesSection = ({ services }: ServicesSectionProps) => {
  // State for showing more services
  const [showAllServices, setShowAllServices] = useState(false);
  
  // Number of services to show initially
  const initialServicesCount = 6;
  
  // Map API services to UI format
  const servicesToDisplay = services && services.length > 0
    ? services.map(service => {
        // Fix image URL by removing leading slash if present
        const imagePath = service.image.startsWith('/') 
          ? service.image.substring(1) 
          : service.image;
        return {
          id: service.id,
          icon: Building2, // Default icon, you might want to map based on service type
          title: service.heading,
          description: service.sub_heading,
          image: `${imagePath}`,
        };
      })
    : staticServices;

  // Simple icon mapping based on service title
  const getIconForService = (title: string) => {
    if (title.includes("Industrial") || title.includes("Warehouse")) return Warehouse;
    if (title.includes("Residential") || title.includes("Villa")) return Home;
    if (title.includes("Restaurant")) return Utensils;
    if (title.includes("Interior")) return PaintBucket;
    return Building2; // Default
  };

  const servicesWithIcons = servicesToDisplay.map(service => ({
    ...service,
    icon: getIconForService(service.title)
  }));

  // Determine which services to show based on state
  const displayedServices = showAllServices 
    ? servicesWithIcons 
    : servicesWithIcons.slice(0, initialServicesCount);

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-primary mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive construction solutions tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedServices.map((service, index) => (
            <Card
              key={service.id}
              className="overflow-hidden group hover:shadow-xl transition-all duration-300 animate-slide-up bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div> */}
                <div className="absolute bottom-4 left-4">
                  <div className="bg-accent p-3 rounded-full">
                    <service.icon className="text-accent-foreground" size={24} />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Link to={`/services/${service.id}`}  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="link" className="p-0 h-auto text-accent hover:text-accent/80">
                    Learn More
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Show More Button - only show if there are more services to display */}
        {!showAllServices && servicesWithIcons.length > initialServicesCount && (
          <div className="text-center">
            <Button 
              onClick={() => setShowAllServices(true)}
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 text-lg"
            >
              Show More Services
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
