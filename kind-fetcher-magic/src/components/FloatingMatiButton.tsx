import { useState, useEffect } from "react";
import { MessageCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingMatiButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToMati = () => {
    const element = document.getElementById("mati");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      
      // Optionally focus the input after scrolling
      setTimeout(() => {
        const input = document.getElementById("mati-input");
        if (input) input.focus();
      }, 800);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToMati}
          className="fixed bottom-8 right-8 z-[60] flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3.5 rounded-full shadow-[0_10px_40px_rgba(139,92,246,0.3)] border border-primary/20 backdrop-blur-sm group"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full"
            />
          </div>
          <span className="font-bold text-sm tracking-wide">Ask Mati</span>
          <Sparkles className="w-4 h-4 text-accent animate-pulse" />
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg -z-10 group-hover:bg-primary/30 transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingMatiButton;
