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
  const imageUrl = `${imagePath}`;

  // Create full URL for hero background
  const heroImageUrl = `http://sunnexgulf.com/admin/public/storage/${imagePath}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenContactModal={() => setIsContactModalOpen(true)} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt={service.heading}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in pt-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
              {service.heading}
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
              {service.sub_heading}
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          {/* <Link to="/" className="inline-flex items-center text-accent hover:text-accent/80 mb-8 transition-colors">
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Link> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-fade-in group">
              <img
                src={imageUrl}
                alt={service.heading}
                className="w-full h-[400px] lg:h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-8 animate-slide-up">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {service.overview}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Key Features</h2>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/5 transition-colors border border-transparent hover:border-accent/10">
                      <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                      <span className="text-muted-foreground font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                  <h3 className="text-xl font-bold mb-2">Ready to start your project?</h3>
                  <p className="text-muted-foreground mb-6">
                    Contact us today to discuss your requirements and get a personalized quote.
                  </p>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-4 h-auto shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    Request a Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
