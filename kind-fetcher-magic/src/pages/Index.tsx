import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ZodiacSection from "@/components/ZodiacSection";
import ServicesSection from "@/components/ServicesSection";
import MatiSection from "@/components/MatiSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import FooterSection from "@/components/FooterSection";
import { SectionTransition } from "@/components/animations";
import ParallaxStars from "@/components/ParallaxStars";
import FloatingMatiButton from "@/components/FloatingMatiButton";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const handleLoadComplete = useCallback(() => setLoading(false), []);

  return (
    <div className="min-h-screen bg-background scroll-smooth cosmic-bg-stars">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>
      {!loading && (
        <>
          <ParallaxStars />
          <Navbar />
          <HeroSection />
          <SectionTransition><ZodiacSection /></SectionTransition>
          <SectionTransition><ServicesSection /></SectionTransition>
          <SectionTransition><MatiSection /></SectionTransition>
          <SectionTransition><TestimonialsSection /></SectionTransition>
          <SectionTransition><PricingSection /></SectionTransition>
          <SectionTransition><AboutSection /></SectionTransition>
          <SectionTransition><FAQSection /></SectionTransition>
          <FooterSection />
          <FloatingMatiButton />
        </>
      )}
    </div>
  );
};

export default Index;
