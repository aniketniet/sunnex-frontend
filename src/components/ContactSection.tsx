import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { submitContactForm, ContactFormValues, ContactInfo } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface ContactSectionProps {
  contactInfoData?: ContactInfo;
  hideHeader?: boolean;
}

const ContactSection = ({ contactInfoData, hideHeader = false }: ContactSectionProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "service",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: contactInfoData?.address || "401, Jumbo Building, Bur Dubai, UAE"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: contactInfoData?.mobile_number || "+971 569335833"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: contactInfoData?.email || "info@sunnextech.ae"
    },
  ];

  const contactInfoToDisplay = contactInfoData
    ? contactInfo
    : contactInfo;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty values to make them optional
    const filteredData: ContactFormValues = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "") {
        filteredData[key as keyof ContactFormValues] = value;
      }
    });

    try {
      setIsSubmitting(true);
      await submitContactForm(filteredData);
      toast({
        title: "Success",
        description: "Message sent successfully!",
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        type: "service",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        {!hideHeader && (
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-primary mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to start your project? Contact us today for a free consultation
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <div className="space-y-6 animate-slide-in-left">
            {contactInfoToDisplay.map((info, index) => (
              <Card
                key={info.title}
                className="p-6 flex items-start space-x-4 hover:shadow-lg transition-all duration-300 bg-card"
              >
                <div className="bg-accent/10 p-3 rounded-full flex-shrink-0">
                  <info.icon className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{info.title}</h3>
                  <p className="text-muted-foreground">{info.details}</p>
                </div>
              </Card>
            ))}

            <Card className="p-6 bg-primary text-primary-foreground">
              <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-semibold">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-in-right">
            <Card className="p-8 bg-card">
              <h3 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="service">Service Inquiry</option>
                    <option value="quote">Quote Request</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Support</option>
                  </select>
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
