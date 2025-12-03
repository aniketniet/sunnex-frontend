import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import YouTubeSection from "@/components/YouTubeSection";
import ClientsSection from "@/components/ClientsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ContactSection from "@/components/ContactSection";
import InfiniteMarquee from "@/components/Brands";
import { fetchHomeData, HomeDataResponse } from "@/lib/api";
import ContactModal from "@/components/ContactModal";

interface IndexProps {
  onDataLoad?: () => void;
}

const Index = ({ onDataLoad }: IndexProps) => {
  const [homeData, setHomeData] = useState<HomeDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchHomeData();
        setHomeData(data);
        // Notify parent that data is loaded
        if (onDataLoad) {
          onDataLoad();
        }
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
        // Still notify parent even on error
        if (onDataLoad) {
          onDataLoad();
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [onDataLoad]);

  if (error || !homeData) {
    return (
      <div className="min-h-screen">
        <Header />
        <main>
          <section className="h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-destructive">Error loading data</h2>
              <p className="text-muted-foreground">Please try again later</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header onOpenContactModal={() => setIsContactModalOpen(true)} />
      <main>
        <HeroSection />
        <ServicesSection services={homeData.data.services} />
        <InfiniteMarquee brands={homeData.data.brands} />
        <YouTubeSection projects={homeData.data.projects} />
        <ClientsSection testimonials={homeData.data.testimonials} />
        <WhyChooseUsSection
          whyChooseUsData={homeData.data.why_choose_us}
          coreValuesData={homeData.data.our_core_values}
        />
        <ContactSection contactInfoData={homeData.data.contact_info} />
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

export default Index;