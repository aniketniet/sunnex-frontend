import { Card } from "./ui/card";
import { WhyChooseUs, CoreValue } from "@/lib/api";

interface WhyChooseUsSectionProps {
  whyChooseUsData?: WhyChooseUs[];
  coreValuesData?: CoreValue[];
}

const staticReasons = [
  {
    title: "Licensed & Insured",
    description: "All our professionals are fully licensed and insured for your peace of mind.",
    image: "/shield-icon.png" // Placeholder image
  },
  {
    title: "On-Time Delivery",
    description: "We pride ourselves on delivering projects on-time and within budget.",
    image: "/clock-icon.png" // Placeholder image
  },
  {
    title: "Strong Communication",
    description: "Clear and consistent communication throughout every project phase.",
    image: "/message-icon.png" // Placeholder image
  },
  {
    title: "Top-Quality Materials",
    description: "We use only the best materials and modern construction practices.",
    image: "/award-icon.png" // Placeholder image
  },
  {
    title: "100% Satisfaction",
    description: "Your complete satisfaction is our ultimate commitment and guarantee.",
    image: "/check-circle-icon.png" // Placeholder image
  },
  {
    title: "Modern Technology",
    description: "Utilizing the latest technology, tools, and innovative solutions.",
    image: "/trending-up-icon.png" // Placeholder image
  },
];

const staticCoreValues = [
  {
    title: "Integrity",
    description: "We do what we say. Honest communication and transparency."
  },
  {
    title: "Quality",
    description: "Superior workmanship and durable results. Never compromising."
  },
  {
    title: "Customer Focus",
    description: "Your satisfaction drives our entire process."
  },
  {
    title: "Innovation",
    description: "Modern technology, tools and cutting-edge solutions."
  },
  {
    title: "Safety",
    description: "Every project follows strict safety standards."
  }
];

const WhyChooseUsSection = ({ whyChooseUsData, coreValuesData }: WhyChooseUsSectionProps) => {
  // Use API data if available, otherwise fallback to static data
  const reasonsToDisplay = whyChooseUsData && whyChooseUsData.length > 0
    ? whyChooseUsData.map(item => {
        // Fix image URL by removing leading slash if present
        const imagePath = item.image.startsWith('/') 
          ? item.image.substring(1) 
          : item.image;
          
        return {
          title: item.heading,
          description: item.sub_heading,
          image: `https://shopninja.in/pioneerv2/public/${imagePath}`
        };
      })
    : staticReasons;

  // Use API data for core values if available, otherwise fallback to static data
  const coreValuesToDisplay = coreValuesData && coreValuesData.length > 0
    ? coreValuesData.map(item => ({
        title: item.heading,
        description: item.sub_heading
      }))
    : staticCoreValues;

  return (
    <section id="why-us" className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-primary-foreground mb-4">Why Choose Us</h2>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Your trusted partner for exceptional construction services
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasonsToDisplay.map((reason, index) => (
            <Card
              key={reason.title}
              className="p-8 bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all duration-300 hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center mb-4 overflow-hidden mx-auto">
                <img 
                  src={reason.image} 
                  alt={reason.title} 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-3 text-center">{reason.title}</h3>
              <p className="text-primary-foreground/80 text-center">{reason.description}</p>
            </Card>
          ))}
        </div>

        {/* Core Values Section */}
        <div className="mt-16 p-8 bg-primary-foreground/10 backdrop-blur-sm rounded-lg animate-slide-up">
          <h3 className="text-3xl font-bold text-primary-foreground mb-6 text-center">Our Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            {coreValuesToDisplay.map((value, index) => (
              <div key={value.title}>
                <h4 className="text-xl font-bold text-accent mb-2">{value.title}</h4>
                <p className="text-primary-foreground/80 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;