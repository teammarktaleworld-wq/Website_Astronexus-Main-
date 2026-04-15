import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, Parallax } from "./animations";
import CountUp from "./animations/CountUp";
import avatarSarah from "@/assets/avatar-sarah.jpg";
import avatarDavid from "@/assets/avatar-david.jpg";
import avatarEmma from "@/assets/avatar-emma.jpg";

const testimonials = [
  { name: "Sarah M.", role: "Spiritual Guide", text: "AstroNexus transformed my understanding of astrology. The AI readings are incredibly accurate and insightful. I recommend it to all my clients seeking cosmic guidance.", avatar: avatarSarah },
  { name: "David L.", role: "Astrology Enthusiast", text: "I've tried many astrology apps, but AstroNexus stands out. The cosmic visualizations are breathtaking, and the predictions have been remarkably accurate for me.", avatar: avatarDavid },
  { name: "Emma R.", role: "Life Coach", text: "The daily horoscopes are spot-on. It's like having a personal astrologer in my pocket. My clients love when I share insights from AstroNexus during our sessions.", avatar: avatarEmma },
];

const stats = [
  { value: "15K+", label: "Happy Clients" },
  { value: "4.9", label: "Average Rating" },
  { value: "98%", label: "Accuracy Rate" },
  { value: "50K+", label: "Readings Done" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const TestimonialsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmic-blue/[0.03] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Cosmic Stories</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">What Our <span className="text-gradient-cosmic">Clients Say</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Real stories from cosmic seekers who have transformed their lives with AstroNexus guidance.</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-cosmic-card cosmic-border rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Avatar header */}
              <div className="relative h-20 bg-gradient-to-r from-primary/20 via-cosmic-blue/20 to-cosmic-pink/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80" />
              </div>

              <div className="px-6 pb-6 -mt-10 relative">
                <motion.div
                  className="w-16 h-16 rounded-full overflow-hidden border-4 border-card shadow-lg mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </motion.div>

                <Quote className="w-6 h-6 text-primary/20 mb-2" />
                <p className="text-sm text-foreground leading-relaxed mb-5">"{t.text}"</p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + j * 0.08 }}
                        viewport={{ once: true }}
                      >
                        <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-cosmic-pink scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <Parallax speed={0.15}>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gradient-to-r from-primary via-cosmic-indigo to-primary rounded-2xl p-8 shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
              >
                <p className="font-heading text-3xl md:text-4xl font-black text-primary-foreground">
                  {value.includes("K") ? (
                    <><CountUp end={parseInt(value)} suffix="K+" /></>
                  ) : value.includes("%") ? (
                    <><CountUp end={parseInt(value)} suffix="%" /></>
                  ) : value.includes(".") ? (
                    value
                  ) : (
                    <><CountUp end={parseInt(value)} suffix="+" /></>
                  )}
                </p>
                <p className="text-sm text-primary-foreground/70 mt-1">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </Parallax>
      </div>
    </section>
  );
};

export default TestimonialsSection;
