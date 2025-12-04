import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Testimonial } from "@/lib/api";

interface ClientsSectionProps {
  testimonials?: Testimonial[];
}

const staticTestimonials = [
  {
    id: 1,
    name: "Ahmed Al Maktoum",
    role: "CEO, Dubai Properties",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    rating: 5,
    text: "Sunnex Technical Works delivered our commercial complex ahead of schedule with exceptional quality. Their attention to detail and professionalism is unmatched in the industry."
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Restaurant Owner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    rating: 5,
    text: "The restaurant design and build project exceeded our expectations. The team transformed our vision into reality with innovative solutions and premium craftsmanship."
  },
  {
    id: 3,
    name: "Mohammed Hassan",
    role: "Villa Owner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    rating: 5,
    text: "Our luxury villa was completed with outstanding quality and precision. Sunnex's commitment to excellence is evident in every corner of our home. Highly recommended!"
  },
  {
    id: 4,
    name: "Emily Chen",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    rating: 5,
    text: "The industrial warehouse project was executed flawlessly. Their technical expertise and project management skills ensured smooth delivery within budget and timeline."
  },
  {
    id: 5,
    name: "Khalid Rahman",
    role: "Property Investor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    rating: 5,
    text: "Working with Sunnex on multiple residential projects has been a pleasure. Their integrity, transparency, and quality workmanship make them our preferred contractor."
  },
  {
    id: 6,
    name: "Lisa Anderson",
    role: "Interior Designer",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    rating: 5,
    text: "Sunnex's interior design and build services are exceptional. They brought creativity and precision to every project, delivering spaces that truly inspire."
  }
];

const ClientsSection = ({ testimonials }: ClientsSectionProps) => {
  // Use API data if available, otherwise fallback to static data
  const testimonialsToDisplay = testimonials && testimonials.length > 0 
    ? testimonials.map(t => ({
        id: t.id,
        name: t.name,
        role: t.designation,
        // Fix image URL by removing leading slash if present
        image: t.image.startsWith('/') 
          ? `${t.image.substring(1)}`
          : t.image.includes('http') 
            ? t.image 
            : `${t.image}`,
        rating: t.rating || 5,
        text: t.comment
      }))
    : staticTestimonials;

  return (
    <section className="py-24 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            What Our <span className="text-[#da0530]">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trusted by leading property owners and developers across the UAE
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonialsToDisplay.map((testimonial, index) => (
              <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card 
                  className="p-8 h-full bg-card/50 backdrop-blur-sm border-2 hover:border-[#da0530]/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 animate-fade-in group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col h-full">
                    {/* Quote Icon */}
                    <Quote className="w-12 h-12 text-[#da0530]/20 mb-4 group-hover:text-primary/40 transition-colors" />

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-muted-foreground text-lg mb-6 flex-grow leading-relaxed">
                      {testimonial.text}
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                      <Avatar className="w-14 h-14 border-2 border-primary/20">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold text-foreground text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 h-14 w-14 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary" />
          <CarouselNext className="hidden md:flex -right-12 h-14 w-14 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary" />
        </Carousel>
      </div>
    </section>
  );
};

export default ClientsSection;
