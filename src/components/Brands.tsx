import { Brand } from "@/lib/api";

interface BrandsProps {
  brands?: Brand[];
}

const Brands = ({ brands }: BrandsProps) => {
  // Replace with your actual brand logo URLs
  const staticLogos = [
    { id: 1, url: '/BDO.png', alt: 'Brand 1' },
    { id: 2, url: '/bankofindia.png', alt: 'Brand 2' },
    { id: 3, url: '/cadila-pharma.webp', alt: 'Brand 3' },
    { id: 4, url: '/canara-life-insurance.webp', alt: 'Brand 4' },
    { id: 5, url: '/delhivery.jpg', alt: 'Brand 5' },
    { id: 6, url: '/images.jpeg', alt: 'Brand 6' },
    { id: 7, url: '/indus-towers.png', alt: 'Brand 7' },
    { id: 8, url: '/Kotak_Mahindra_Bank.png', alt: 'Brand 8' },
  ];

  // Use API data if available, otherwise fallback to static data
  const logosToDisplay = brands && brands.length > 0
    ? brands.map(brand => {
        // Fix image URL by removing leading slash if present
        const imagePath = brand.image.startsWith('/') 
          ? brand.image.substring(1) 
          : brand.image;
        return {
          id: brand.id,
          url: `https://shopninja.in/pioneerv2/public/${imagePath}`,
          alt: brand.name
        };
      })
    : staticLogos;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Leading Brands
          </h2>
          <p className="text-muted-foreground">
            Companies that trust us with their construction needs
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden py-8">
          <div className="flex animate-marquee">
            {/* First set of logos */}
            {logosToDisplay.map((logo) => (
              <div 
                key={`first-${logo.id}`}
                className="flex-shrink-0 mx-8 bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <img 
                  src={logo.url} 
                  alt={logo.alt}
                  className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {logosToDisplay.map((logo) => (
              <div 
                key={`second-${logo.id}`}
                className="flex-shrink-0 mx-8 bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <img 
                  src={logo.url} 
                  alt={logo.alt}
                  className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Brands;