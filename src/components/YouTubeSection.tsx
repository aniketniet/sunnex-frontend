import { Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { Card } from "./ui/card";
import { Project } from "@/lib/api";

interface YouTubeSectionProps {
  projects?: Project[];
}

// Function to extract YouTube video ID from URL
const extractVideoId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : 'dQw4w9WgXcQ';
};

const youtubeVideos = [
  {
    id: "1",
    title: "Villa Construction Showcase",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=450&fit=crop",
    videoId: "dQw4w9WgXcQ",
    description: "Modern luxury villa construction from start to finish"
  },
  {
    id: "2",
    title: "Commercial Building Project",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=450&fit=crop",
    videoId: "dQw4w9WgXcQ",
    description: "State-of-the-art commercial building development"
  },
  {
    id: "3",
    title: "Interior Design Transformation",
    thumbnail: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=450&fit=crop",
    videoId: "dQw4w9WgXcQ",
    description: "Luxury interior design and renovation project"
  },
  {
    id: "4",
    title: "Industrial Warehouse Construction",
    thumbnail: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&h=450&fit=crop",
    videoId: "dQw4w9WgXcQ",
    description: "Large-scale industrial and warehouse development"
  },
  {
    id: "5",
    title: "Restaurant Design & Build",
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=450&fit=crop",
    videoId: "dQw4w9WgXcQ",
    description: "Complete restaurant design and construction project"
  },
  {
    id: "6",
    title: "Residential Complex Development",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=450&fit=crop",
    videoId: "dQw4w9WgXcQ",
    description: "Multi-unit residential development from ground up"
  }
];

const YouTubeSection = ({ projects }: YouTubeSectionProps) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Use API data if available, otherwise fallback to static data
  const videosToDisplay = projects && projects.length > 0 
    ? projects.map(project => {
        // Extract YouTube video ID from URL
        const videoId = extractVideoId(project.video_url);
        // Fix image URL by removing leading slash if present
        const thumbnailPath = project.thumbnail.startsWith('/') 
          ? project.thumbnail.substring(1) 
          : project.thumbnail;
        return {
          id: project.id.toString(),
          title: project.heading,
          thumbnail: `${thumbnailPath}`,
          videoId: videoId,
          description: project.sub_heading
        };
      })
    : youtubeVideos;

  return (
    <section className="py-24  relative overflow-hidden">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div> */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Our Project <span className="text-primary">Showcases</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch our latest construction projects and see excellence in action
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {videosToDisplay.map((video, index) => (
              <CarouselItem key={video.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Dialog open={selectedVideo === video.videoId} onOpenChange={(open) => !open && setSelectedVideo(null)}>
                  <DialogTrigger asChild>
                    <Card 
                      className="group cursor-pointer overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => setSelectedVideo(video.videoId)}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 shadow-2xl">
                            <Play className="w-10 h-10 text-accent-foreground ml-1" fill="currentColor" />
                          </div>
                        </div>

                        {/* Video Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform transition-transform duration-300">
                          <h3 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">
                            {video.title}
                          </h3>
                          <p className="text-sm text-white/80">
                            {video.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl w-full p-0 bg-transparent border-0">
                    <div className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-2xl">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </DialogContent>
                </Dialog>
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

export default YouTubeSection;
