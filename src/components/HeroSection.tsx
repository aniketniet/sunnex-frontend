import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    video: "https://cdn.pixabay.com/video/2022/03/16/110923-689949643_large.mp4",
    title: "Building Your Dreams Into Reality",
    tagline: "LET'S DO IT TOGETHER",
    description: "Full-service contracting and construction company specializing in high-quality building, renovation, maintenance, and interior works."
  },
  {
    video: "https://cdn.pixabay.com/video/2024/07/02/219131_large.mp4",
    title: "Excellence in Construction",
    tagline: "QUALITY YOU CAN TRUST",
    description: "Delivering superior workmanship and innovative solutions for residential, commercial, and industrial projects."
  },
  {
    video: "https://cdn.pixabay.com/video/2024/07/04/219337_large.mp4",
    title: "Your Vision, Our Mission",
    tagline: "BUILDING TOMORROW TODAY",
    description: "Licensed professionals committed to on-time, on-budget delivery with 100% customer satisfaction."
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 7000,
            stopOnInteraction: false,
          }),
        ]}
        className="h-full w-full"
        setApi={(api) => {
          if (!api) return;
          api.on('select', () => {
            setCurrentSlide(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent className="h-screen">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-screen">
              <div className="relative h-full flex items-center justify-center">
                {/* Video Background */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <video
                    key={slide.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={slide.video} type="video/mp4" />
                  </video>
                  {/* Sophisticated Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 text-center">
                  <div className="max-w-6xl mx-auto space-y-10">
                    {/* Animated Tagline */}
                    <div className="inline-block animate-fade-in opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-500"></div>
                        <p className="text-yellow-500 font-semibold text-sm md:text-base tracking-[0.3em] uppercase">
                          {slide.tagline}
                        </p>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-500"></div>
                      </div>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white font-bold leading-[1.1] tracking-tight animate-fade-in opacity-0" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
                      {slide.title.split(' ').map((word, i) => (
                        <span key={i} className="inline-block hover:text-yellow-500 transition-colors duration-300">
                          {word}{' '}
                        </span>
                      ))}
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>
                      {slide.description}
                    </p>

                    {/* CTA Buttons */}
                    {/* <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4 animate-fade-in opacity-0" style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}>
                      <Button 
                        size="lg" 
                        className="group bg-yellow-500 text-black hover:bg-yellow-400 text-base md:text-lg px-12 py-7 shadow-2xl hover:shadow-yellow-500/50 transition-all duration-500 hover:scale-105 font-semibold rounded-full"
                      >
                        Get Started
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={22} />
                      </Button>
                      
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-2 border-white/30 bg-white/5 backdrop-blur-xl text-white hover:bg-white hover:text-black text-base md:text-lg px-12 py-7 shadow-2xl transition-all duration-500 hover:scale-105 font-semibold rounded-full"
                      >
                        <Play className="mr-2" size={22} />
                        Our Projects
                      </Button>
                    </div> */}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Elegant Navigation */}
        <CarouselPrevious className="left-4 md:left-10 h-14 w-14 bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/20 transition-all duration-300 rounded-full shadow-2xl hover:scale-110" />
        <CarouselNext className="right-4 md:right-10 h-14 w-14 bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/20 transition-all duration-300 rounded-full shadow-2xl hover:scale-110" />
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentSlide 
                  ? 'w-12 bg-yellow-500 shadow-lg shadow-yellow-500/50' 
                  : 'w-8 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <p className="text-white/60 text-xs uppercase tracking-widest font-medium">Scroll</p>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5 backdrop-blur-sm">
            <div className="w-1 h-3 bg-yellow-500 rounded-full animate-pulse shadow-lg shadow-yellow-500/50"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;