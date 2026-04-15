import { ArrowRight, Star, Sparkles, Sun, Heart, Brain, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ScrollReveal } from "./animations";
import serviceBirthchart from "@/assets/service-birthchart.jpg";
import serviceHoroscope from "@/assets/service-horoscope.jpg";
import serviceLove from "@/assets/service-love.jpg";
import serviceAi from "@/assets/service-ai.jpg";
import serviceTarot from "@/assets/service-tarot.jpg";

const services = [
  {
    title: "Birth Chart Analysis",
    description: "Generate an accurate kundli using your birth details and planetary positions. Discover your cosmic blueprint.",
    image: serviceBirthchart,
    icon: Sparkles,
    iconColor: "bg-accent text-accent-foreground",
    sold: "12.5K",
    rating: "4.9",
    borderHover: "hover:border-accent/40",
    route: "/services/birth-chart",
  },
  {
    title: "Daily Horoscope",
    description: "Get daily, weekly, and monthly predictions tailored to your zodiac sign. Start each day with cosmic clarity.",
    image: serviceHoroscope,
    icon: Sun,
    iconColor: "bg-accent text-accent-foreground",
    sold: "45K+",
    rating: "4.8",
    borderHover: "hover:border-accent/40",
    route: "/services/horoscope",
  },
  {
    title: "Love Compatibility",
    description: "Analyze relationship compatibility through zodiac and planetary alignment. Find your cosmic soulmate.",
    image: serviceLove,
    icon: Heart,
    iconColor: "bg-pink-500 text-white",
    sold: "8.2K",
    rating: "4.9",
    borderHover: "hover:border-pink-400/40",
    highlight: true,
    route: "/services/love-compatibility",
  },
  {
    title: "AI Astrology",
    description: "Experience cutting-edge AI-powered astrological insights and predictions. The future of cosmic guidance.",
    image: serviceAi,
    icon: Brain,
    iconColor: "bg-cosmic-blue text-white",
    sold: "20K+",
    rating: "5.0",
    badge: "App Only",
    borderHover: "hover:border-cosmic-blue/40",
    route: "/services/ai-astrology",
  },
  {
    title: "Tarot Reading",
    description: "Draw cards from the cosmic deck and uncover hidden truths about your past, present, and future.",
    image: serviceTarot,
    icon: Layers,
    iconColor: "bg-accent text-accent-foreground",
    sold: "10K+",
    rating: "4.8",
    badge: "New",
    borderHover: "hover:border-accent/40",
    route: "/services/tarot",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.92 },
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

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="absolute top-0 left-1/2 w-[500px] h-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[150px]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Cosmic Services</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our <span className="text-gradient-cosmic">Services</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Comprehensive astrological guidance for every aspect of your life.</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`bg-cosmic-card cosmic-border rounded-2xl group ${service.borderHover} transition-all h-full relative overflow-hidden cursor-pointer`}
              >
                {service.badge && (
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="absolute top-4 right-4 z-10 text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground font-bold shadow-md"
                  >
                    {service.badge}
                  </motion.span>
                )}

                {/* Image section */}
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/40 to-transparent" />

                  {/* Stats overlay on hover */}
                  {service.highlight && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm rounded-xl px-3 py-2 text-white"
                    >
                      <div className="flex items-center gap-1 text-sm font-bold">
                        📈 {service.sold}
                      </div>
                      <p className="text-xs opacity-80">Reports Sold</p>
                      <div className="flex items-center gap-1 text-sm mt-1">
                        <Star className="w-3 h-3 fill-accent text-accent" /> {service.rating}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Content section */}
                <div className="p-5">
                  <motion.div
                    className={`w-10 h-10 rounded-xl ${service.iconColor} flex items-center justify-center mb-3 shadow-md`}
                    whileHover={{ rotate: 15, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>

                  {!service.highlight && (
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-muted-foreground">{service.sold} Reports Sold</span>
                      <span className="flex items-center gap-1 text-xs text-accent">
                        <Star className="w-3 h-3 fill-accent" /> {service.rating}
                      </span>
                    </div>
                  )}

                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">{service.description}</p>

                  <Link to={service.route} className="flex items-center gap-2 text-sm text-primary font-semibold group/link">
                    <motion.span
                      className="flex items-center gap-2"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Explore <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </motion.span>
                  </Link>
                </div>

                {/* Bottom accent line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-cosmic-pink scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </div>

        <ScrollReveal className="mt-12 text-center" delay={0.3}>
          <motion.div
            className="inline-flex items-center gap-4 bg-cosmic-card cosmic-border-gold rounded-full px-8 py-4 shadow-md"
            whileHover={{ scale: 1.03, boxShadow: "0 8px 30px hsl(38 90% 50% / 0.2)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div>
              <p className="text-accent font-heading font-bold text-lg">Join 15,000+ Souls</p>
              <p className="text-sm text-muted-foreground">Already on their cosmic journey</p>
            </div>
            <a href="#pricing" className="px-6 py-2 rounded-full bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity hover-scale">
              Start Your Journey
            </a>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServicesSection;
