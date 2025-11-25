import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchHomeData, Service } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import ContactModal from "@/components/ContactModal";

const Services = () => {
  const { serviceId } = useParams();
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchHomeData();
        setServicesData(data.data.services);
      } catch (err) {
        setError("Failed to load services data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Find the service by ID (convert string ID to number for comparison)
  const service = servicesData.find(s => s.id === Number(serviceId)) || null;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header onOpenContactModal={() => setIsContactModalOpen(true)} />
        <main className="flex-1">
          <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
            <Skeleton className="absolute inset-0 w-full h-full" />
            <div className="relative z-10 container mx-auto px-4 text-center">
              <Skeleton className="h-16 w-64 mx-auto mb-4" />
              <Skeleton className="h-8 w-96 mx-auto" />
            </div>
          </section>
          <section className="py-24 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Skeleton className="h-12 w-48 mb-8" />
                <div className="space-y-8">
                  <div className="animate-slide-up">
                    <Skeleton className="h-10 w-64 mb-6" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                  </div>
                  <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    <Skeleton className="h-10 w-64 mb-6" />
                    <div className="space-y-4">
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-3/4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header onOpenContactModal={() => setIsContactModalOpen(true)} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
            <Link to="/">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                <ArrowLeft className="mr-2" size={20} />
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Fix image URL by removing leading slash if present
  const imagePath = service.image.startsWith('/') 
    ? service.image.substring(1) 
    : service.image;

  const imageUrl = `https://shopninja.in/pioneerv2/public/${imagePath}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenContactModal={() => setIsContactModalOpen(true)} />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt={service.heading}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60"></div>
          <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
            <h1 className="text-primary-foreground font-bold mb-4">{service.heading}</h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              {service.sub_heading}
            </p>
          </div>
        </section>

        {/* Details Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link to="/" className="inline-flex items-center text-accent hover:text-accent/80 mb-8">
                <ArrowLeft className="mr-2" size={20} />
                Back to All Services
              </Link>

              <div className="space-y-8">
                <div className="animate-slide-up">
                  <h2 className="text-3xl font-bold text-foreground mb-6">Overview</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {service.overview}
                  </p>
                </div>

                <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <h2 className="text-3xl font-bold text-foreground mb-6">Key Features</h2>
                  <ul className="space-y-4">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={24} />
                        <span className="text-lg text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
                  <div className="bg-primary text-primary-foreground p-8 rounded-lg">
                    <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                    <p className="mb-6">
                      Contact us today to discuss your project requirements and receive a free consultation.
                    </p>
                    <Button 
                      size="lg" 
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                      onClick={() => setIsContactModalOpen(true)}
                    >
                      Request a Quote
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Contact Modal */}
      <ContactModal 
        open={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

export default Services;