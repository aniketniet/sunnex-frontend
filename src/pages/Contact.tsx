import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { fetchHomeData, HomeDataResponse } from "@/lib/api";
import ContactModal from "@/components/ContactModal";
import PageLoader from "@/components/PageLoader";

const Contact = () => {
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
            } catch (err) {
                setError("Failed to load data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return <PageLoader isLoading={true} />;
    }

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

    // Use About image as fallback/theme image since we want it to look like About page
    const aboutData = homeData.data.about;
    const imagePath = aboutData.image.startsWith('/')
        ? aboutData.image.substring(1)
        : aboutData.image;
    const imageUrl = `http://sunnexgulf.com/admin/public/storage/${imagePath}`;

    return (
        <div className="min-h-screen flex flex-col">
            <Header onOpenContactModal={() => setIsContactModalOpen(true)} />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                    <img
                        src={imageUrl}
                        alt="Contact Sunnex Technical Works"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in pt-24">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
                            Contact Us
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
                            We'd love to hear from you. Reach out to us for any inquiries.
                        </p>
                    </div>
                </section>

                <ContactSection contactInfoData={homeData.data.contact_info} hideHeader={true} />
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

export default Contact;
