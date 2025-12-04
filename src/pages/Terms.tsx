import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Clock, Award, FileCheck, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Terms = () => {
  const highlights = [
    { icon: Shield, title: "Licensed & Insured", color: "text-primary" },
    { icon: Clock, title: "On-Time Delivery", color: "text-accent" },
    { icon: Award, title: "Quality Assured", color: "text-primary" },
    { icon: FileCheck, title: "Clear Contracts", color: "text-accent" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenContactModal={() => {}} />
      <main className="flex-1 pt-20">
        {/* Modern Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
                Terms & Conditions
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                Building trust through transparency and integrity
              </p>
              <p className="text-lg text-primary-foreground/70 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </section>

        {/* Key Highlights */}
        <section className="py-16 bg-background border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {highlights.map((item, index) => (
                <Card 
                  key={index}
                  className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon className={`w-10 h-10 ${item.color} mx-auto mb-3`} />
                  <h3 className="font-bold text-sm md:text-base">{item.title}</h3>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24 bg-gradient-to-b from-background via-secondary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-12 text-lg font-semibold transition-colors">
                <ArrowLeft className="mr-2" size={20} />
                Back to Home
              </Link>

              <div className="space-y-12">
                {[
                  {
                    title: "1. Agreement to Terms",
                    content: "By accessing and using Sunnex Technical Works LLC's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
                  },
                  {
                    title: "2. Services",
                    content: "Sunnex Technical Works LLC provides comprehensive construction and contracting services including but not limited to:",
                    list: [
                      "Building contracting and construction management",
                      "Industrial projects and warehouse construction",
                      "Residential and commercial villa construction",
                      "Restaurant design and build services",
                      "Interior design and build services"
                    ]
                  },
                  {
                    title: "3. Project Terms",
                    content: "All construction projects are subject to the following terms:",
                    list: [
                      "Detailed project proposals will be provided before commencement",
                      "Project timelines are estimates and subject to change based on unforeseen circumstances",
                      "Payment terms will be specified in individual project contracts",
                      "Changes to approved plans may result in additional costs and time extensions",
                      "All work will comply with local building codes and regulations"
                    ]
                  },
                  {
                    title: "4. Quality Assurance",
                    content: "We are committed to delivering high-quality workmanship on all projects. Our quality assurance includes regular inspections, use of premium materials, and adherence to industry best practices. Any defects or issues arising from our workmanship will be addressed promptly according to the warranty terms specified in individual project contracts."
                  },
                  {
                    title: "5. Safety Standards",
                    content: "Safety is our top priority. All projects will be conducted in accordance with strict safety protocols, industry-leading practices, and current building codes. We maintain comprehensive insurance coverage and ensure all workers are properly trained and equipped."
                  },
                  {
                    title: "6. Liability",
                    content: "Sunnex Technical Works LLC maintains appropriate insurance coverage for all projects. Our liability is limited to the terms specified in individual project contracts. We are not responsible for delays or issues caused by circumstances beyond our control, including but not limited to extreme weather, material supply issues, or regulatory changes."
                  },
                  {
                    title: "7. Intellectual Property",
                    content: "All designs, plans, and specifications created by Sunnex Technical Works LLC remain our intellectual property unless otherwise specified in writing. Clients receive a license to use these materials for their specific project."
                  },
                  {
                    title: "8. Dispute Resolution",
                    content: "In the event of any dispute arising from our services, both parties agree to first attempt resolution through good faith negotiation. If negotiation fails, disputes will be resolved through arbitration in accordance with UAE law."
                  }
                ].map((section, index) => (
                  <Card 
                    key={index}
                    className="p-8 bg-card/50 backdrop-blur-sm border-2 hover:border-primary/30 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground flex items-start gap-3">
                      <span className="text-primary">{section.title.split('.')[0]}.</span>
                      <span>{section.title.split('.')[1]}</span>
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                      {section.content}
                    </p>
                    {section.list && (
                      <ul className="space-y-3 mt-4">
                        {section.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card>
                ))}

                {/* Contact Card */}
                <Card className="p-8 bg-muted/50 border-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                    <span className="text-primary">9.</span> Contact Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                    For questions about these terms and conditions, please contact us:
                  </p>
                  <div className="bg-background/80 p-6 rounded-lg space-y-3 border-l-4 border-primary">
                    <p className="font-bold text-xl text-foreground">Sunnex Technical Works LLC</p>
                    <p className="text-muted-foreground">📍 401, Jumbo Building, Bur Dubai, UAE</p>
                    <p className="text-muted-foreground">📞 +971 569335833</p>
                    <p className="text-muted-foreground">✉️ info@sunnextech.ae</p>
                  </div>
                </Card>

                {/* CTA Card */}
                <Card className="p-10 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground animate-fade-in" style={{ animationDelay: "0.5s" }}>
                  <div className="text-center space-y-6">
                    <h3 className="text-3xl md:text-4xl font-bold">Ready to Start Your Project?</h3>
                    <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                      Contact us today to discuss your construction needs and receive a free consultation.
                    </p>
                    <Button 
                      size="lg" 
                      className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg px-10 py-6 shadow-2xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105"
                      onClick={() => {}}
                    >
                      Get In Touch
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
