import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import PageLoader from "./components/PageLoader";

const queryClient = new QueryClient();

const AppContent = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Reset loading state when navigating to home page
    if (location.pathname === "/") {
      setIsInitialLoading(true);
    } else {
      // For other pages, hide loader quickly
      setIsInitialLoading(false);
    }
  }, [location.pathname]);

  const handleDataLoad = () => {
    // Small delay for smooth fade-out transition
    setTimeout(() => {
      setIsInitialLoading(false);
    }, 300);
  };

  return (
    <>
      <PageLoader isLoading={isInitialLoading} />
      <Routes>
        <Route path="/" element={<Index onDataLoad={handleDataLoad} />} />
        <Route path="/about" element={<About />} />
        <Route path="/services/:serviceId" element={<Services />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
