import { useEffect, useState } from "react";
import "./PageLoader.css";

interface PageLoaderProps {
  isLoading: boolean;
}

const PageLoader = ({ isLoading }: PageLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Add a small delay before starting fade-out for smooth transition
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [isLoading]);

  if (!isVisible && !isLoading) {
    return null;
  }

  return (
    <div className={`page-loader ${!isLoading ? "fade-out" : ""}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default PageLoader;

