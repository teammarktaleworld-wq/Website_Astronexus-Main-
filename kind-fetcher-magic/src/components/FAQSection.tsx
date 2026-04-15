import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Sparkles, HelpCircle } from "lucide-react";
import { ScrollReveal } from "./animations";

const faqs = [
  { q: "How accurate are AstroNexus AI readings?", a: "Our AI-powered readings combine ancient astrological principles with modern machine learning algorithms, achieving a 98% accuracy rate based on user feedback.", icon: "✨" },
  { q: "What information do I need for a birth chart analysis?", a: "To generate your accurate birth chart (kundli), we need your date of birth, exact time of birth, and place of birth.", icon: "📋" },
  { q: "Can I get a refund if I am not satisfied?", a: "Absolutely! We offer a 30-day money-back guarantee on all paid plans.", icon: "💰" },
  { q: "How often are daily horoscopes updated?", a: "Our daily horoscopes are updated every 24 hours at midnight UTC, based on the current planetary positions and transits.", icon: "🔮" },
  { q: "Is my personal information secure?", a: "Yes, your privacy is our top priority. All birth data and personal information are encrypted using bank-level security.", icon: "🔒" },
  { q: "Can I consult with a real astrologer?", a: "Yes! Our Celestial and Ultimate plans include access to certified astrologers for video consultations.", icon: "🌟" },
  { q: "What makes AstroNexus different from other astrology apps?", a: "AstroNexus uniquely combines AI technology with authentic Vedic and Western astrology traditions.", icon: "⚡" },
  { q: "How do I cancel my subscription?", a: "You can cancel your subscription anytime from your account settings. Your access will continue until the end of your billing period.", icon: "📱" },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cosmic-card cosmic-border mb-4">
            <HelpCircle className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground font-medium">Got Questions?</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Cosmic <span className="text-gradient-cosmic">FAQ</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Find answers to commonly asked questions about AstroNexus.</p>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              whileHover={{ x: 4 }}
              className={`bg-cosmic-card cosmic-border rounded-xl overflow-hidden shadow-sm group transition-all duration-300 ${
                openIndex === i ? "border-primary/30 shadow-md shadow-primary/5" : "hover:shadow-md hover:border-primary/20"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center gap-3 px-5 py-4 text-left"
              >
                <span className="text-lg shrink-0">{faq.icon}</span>
                <span className="font-heading font-semibold text-foreground text-sm md:text-base pr-4 flex-1">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                    openIndex === i ? "bg-primary/10" : "bg-secondary"
                  }`}
                >
                  <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${openIndex === i ? "text-primary" : "text-muted-foreground"}`} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 pl-12">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active indicator line */}
              <div className={`absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300 ${
                openIndex === i ? "bg-primary" : "bg-transparent"
              }`} />
            </motion.div>
          ))}
        </div>

        <ScrollReveal className="text-center mt-12" delay={0.3}>
          <p className="text-muted-foreground text-sm mb-4">Still have cosmic questions?</p>
          <motion.button
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-opacity"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px hsl(var(--cosmic-purple) / 0.3)" }}
            whileTap={{ scale: 0.97 }}
          >
            <MessageCircle className="w-4 h-4" /> Contact Support
          </motion.button>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQSection;
