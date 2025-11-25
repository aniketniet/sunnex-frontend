import { Target, Eye, Heart, Award } from "lucide-react";
import { Card } from "./ui/card";

const AboutSection = () => {
  const values = [
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

  return (
    <section id="about" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-primary mb-4">About Us</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Who we are & what we do
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6 animate-slide-in-left">
            <p className="text-foreground leading-relaxed">
              Sunnex Technical Works LLC is a reputable, full-service contracting and construction company specializing in high-quality building, renovation, maintenance, and interior works. With extensive experience across residential, commercial, and industrial sectors, we remain dedicated to delivering durable workmanship founded on integrity, transparency, and exceptional client service.
            </p>
            <p className="text-foreground leading-relaxed">
              Safety is a fundamental priority in all our operations. Our team adheres to strict safety protocols, industry-leading practices, and current building codes to ensure a secure and compliant working environment for clients, employees, and the surrounding community.
            </p>
            <p className="text-foreground leading-relaxed">
              We offer comprehensive, end-to-end solutions tailored to each project's unique requirements. Our team of certified engineers, experienced project managers, and highly skilled trades professionals ensures precise planning and flawless execution at every stage of the project lifecycle.
            </p>
          </div>

          <div className="relative animate-slide-in-right">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
              alt="Construction site"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent rounded-lg"></div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card
              key={value.title}
              className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-slide-up bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="text-accent" size={32} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
