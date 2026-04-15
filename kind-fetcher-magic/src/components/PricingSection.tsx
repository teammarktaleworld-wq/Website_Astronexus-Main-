import { Check, Star, Zap, Crown, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "./animations";
import pricingStellar from "@/assets/pricing-stellar.jpg";
import pricingCosmic from "@/assets/pricing-cosmic.jpg";
import pricingCelestial from "@/assets/pricing-celestial.jpg";
import pricingUltimate from "@/assets/pricing-ultimate.jpg";

const plans = [
  {
    name: "Stellar", subtitle: "Begin your cosmic journey", price: "Free", icon: Star, image: pricingStellar,
    features: ["Daily Horoscope", "Basic Zodiac Insights", "Weekly Cosmic Forecast", "Community Access"],
    cta: "Start Free", popular: false, highlight: false,
  },
  {
    name: "Cosmic", subtitle: "Unlock deeper insights", price: "₹999", period: "/month", icon: Zap, image: pricingCosmic,
    features: ["Everything in Stellar", "Birth Chart Analysis", "Love Compatibility", "Monthly Predictions", "Priority Support"],
    cta: "Get Cosmic", popular: true, highlight: true, savings: "Save ₹210 with current discount",
  },
  {
    name: "Celestial", subtitle: "For serious seekers", price: "₹2499", period: "/month", icon: Crown, image: pricingCelestial,
    features: ["Everything in Cosmic", "AI Astrology Chat (Mati)", "Yearly Forecast", "Gemstone Recommendations", "Personal Astrologer", "Video Consultations"],
    cta: "Go Celestial", popular: false, highlight: false, savings: "Save ₹525 with current discount",
  },
  {
    name: "Ultimate", subtitle: "The complete cosmic experience", price: "₹4999", period: "/month", icon: Rocket, image: pricingUltimate,
    features: ["Everything in Celestial", "Unlimited AI Readings", "VIP Events Access", "Custom Yantras", "Family Charts", "Business Astrology", "24/7 Dedicated Support"],
    cta: "Claim Ultimate", popular: false, highlight: false, savings: "Save ₹1050 with current discount",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Choose Your Path</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Cosmic <span className="text-gradient-cosmic">Pricing</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Unlock the full power of cosmic guidance.</p>
          <span className="inline-block mt-4 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold">Limited Time: 21% OFF</span>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`rounded-2xl relative h-full overflow-hidden group cursor-pointer ${
                  plan.highlight
                    ? "border-2 border-primary/40 shadow-xl shadow-primary/10"
                    : "cosmic-border"
                } bg-cosmic-card`}
              >
                {plan.popular && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-lg"
                  >
                    Most Popular
                  </motion.span>
                )}

                {/* Image header */}
                <div className="relative h-36 overflow-hidden">
                  <motion.img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <motion.div
                    className="absolute bottom-3 left-4 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                      <Icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground drop-shadow-sm">{plan.name}</h3>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-sm text-muted-foreground mb-3">{plan.subtitle}</p>
                  <div className="mb-3">
                    <span className="font-heading text-3xl font-black text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
                  </div>
                  {plan.savings && <p className="text-xs text-accent mb-3">{plan.savings}</p>}
                  <ul className="space-y-2 mb-5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                      plan.highlight
                        ? "bg-primary text-primary-foreground glow-purple"
                        : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {plan.cta}
                  </motion.button>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-cosmic-pink scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </div>

        <ScrollReveal className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            Not sure which plan is right for you?{" "}
            <a href="#" className="text-primary hover:underline">Contact our cosmic advisors</a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PricingSection;
