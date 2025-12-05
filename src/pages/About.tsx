import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, Award, Users, Shield, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchHomeData, AboutData, WhyChooseUs } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [whyChooseUsData, setWhyChooseUsData] = useState<WhyChooseUs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const staticValues = [
    {
      icon: Eye,
      title: "Our Vision",
      description: "To be recognized as a leading contractor, known for delivering excellence, reliability, and fostering long-term, trusted client relationships.",
    },
    {
      icon: Target,
      title: "Our Mission",
      description: "To deliver high-quality services with integrity, efficiency, and innovation while exceeding client expectations on every project.",
    },
    {
      icon: Heart,
      title: "Core Values",
      description: "Integrity, Quality, Customer Focus, Innovation, and Safety drive everything we do.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Superior workmanship and durable results. We never compromise on quality & workmanship.",
    },
  ];

  const staticStats = [
    { icon: Users, label: "Expert Team", value: "50+", description: "Certified professionals" },
    { icon: Clock, label: "Years of Experience", value: "15+", description: "In the industry" },
    { icon: TrendingUp, label: "Projects Completed", value: "500+", description: "Successful deliveries" },
    { icon: Shield, label: "Safety Record", value: "100%", description: "Zero incidents" },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchHomeData();
        setAboutData(data.data.about);
        if (data.data.why_choose_us) {
          setWhyChooseUsData(data.data.why_choose_us);
        }
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
    return (
      <div className="min-h-screen flex flex-col">
        <Header onOpenContactModal={() => { }} />
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
              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <Skeleton className="h-8 w-32 mb-4" />
                    <Skeleton className="h-12 w-96 mb-6" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-3/4 mb-6" />
                  </div>
                  <div>
                    <Skeleton className="w-full h-96 rounded-lg" />
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

  if (error || !aboutData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
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

  // Use API data if available, otherwise fallback to static data
  const content = aboutData.content || "Sunnex Technical Works LLC is a reputable, full-service contracting and construction company specializing in high-quality building, renovation, maintenance, and interior works. With extensive experience across residential, commercial, and industrial sectors, we remain dedicated to delivering durable workmanship founded on integrity, transparency, and exceptional client service.";

  const vision = aboutData.vision || staticValues[0].description;
  const mission = aboutData.mission || staticValues[1].description;
  const values = aboutData.values || staticValues[2].description;
  const excellence = aboutData.excellence || staticValues[3].description;

  const valuesToDisplay = [
    {
      icon: Eye,
      title: "Our Vision",
      description: vision,
    },
    {
      icon: Target,
      title: "Our Mission",
      description: mission,
    },
    {
      icon: Heart,
      title: "Core Values",
      description: values,
    },
    {
      icon: Award,
      title: "Excellence",
      description: excellence,
    },
  ];

  // Use API data for "What Drives Us" section if available
  const whyChooseUsToDisplay = whyChooseUsData && whyChooseUsData.length > 0
    ? whyChooseUsData
    : staticValues.map((value, index) => ({
      id: index + 1,
      heading: value.title,
      sub_heading: value.description,
      image: "", // No image in static data
      status: "active",
      created_at: "",
      updated_at: ""
    }));

  // Fix image URL by removing leading slash if present
  const imagePath = aboutData.image.startsWith('/')
    ? aboutData.image.substring(1)
    : aboutData.image;

  const imageUrl = `https://sunnexgulf.com/admin/public/storage/${imagePath}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenContactModal={() => { }} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt="About Sunnex Technical Works"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in pt-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
              Building Excellence, One Project at a Time
            </p>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div className="space-y-6 animate-slide-in-left">
                  <div className="inline-block">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                      Who We Are
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    Leading Construction & Contracting Excellence
                  </h2>
                  <div className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                    {content}
                  </div>
                </div>

                <div className="relative animate-slide-in-right">
                  <div className="relative rounded-lg overflow-hidden shadow-2xl">
                    <img
                      src={imageUrl}
                      alt="Construction site"
                      className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
                  </div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-lg blur-2xl"></div>
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-lg blur-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {/* <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {staticStats.map((stat, index) => (
                <Card
                  key={stat.label}
                  className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-slide-up bg-card border-2 border-transparent hover:border-primary/20"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="text-primary" size={32} />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </Card>
              ))}
            </div>
          </div>
        </section> */}

        {/* What Drives Us Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-slide-up">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                What Drives Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
                Our Core Principles
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The principles that guide every project and every decision we make
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {whyChooseUsToDisplay.map((item, index) => {
                // Fix image URL by removing leading slash if present
                const imagePath = item.image.startsWith('/')
                  ? item.image.substring(1)
                  : item.image;

                const imageUrl = item.image
                  ? `${imagePath}`
                  : "/placeholder-icon.png"; // Fallback placeholder image

                return (
                  <Card
                    key={item.id}
                    className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-3 animate-slide-up bg-card group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="bg-gradient-to-br from-primary/20 to-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={item.heading}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">{item.heading}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.sub_heading}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-primary to-primary/100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Let's work together to bring your vision to life. Contact us today for a free consultation and quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Get in Touch
                  </Button>
                </Link>
                <Link to="/#services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
                  >
                    View Our Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
