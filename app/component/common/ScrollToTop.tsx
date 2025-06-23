import { ChevronUp } from "lucide-react";
import { useState,useEffect } from "react";
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return ( 
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 z-50 bg-primary hover:bg-primary/50 text-white p-3 rounded-full shadow-lg border border-white transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      aria-label="Go to top"
    >
      <ChevronUp />
    </button>
   );
}
 
export default ScrollToTop;