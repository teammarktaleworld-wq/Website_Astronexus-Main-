import { Target, Heart, Lightbulb, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import aboutGuide from "@/assets/about-guide.png";
import { ScrollReveal, Parallax } from "./animations";

const values = [
  { icon: Target, title: "Precision", desc: "AI-powered accuracy in every reading", color: "bg-accent text-accent-foreground" },
  { icon: Heart, title: "Compassion", desc: "Guidance delivered with cosmic care", color: "bg-pink-500 text-white" },
  { icon: Lightbulb, title: "Innovation", desc: "Blending ancient wisdom with modern tech", color: "bg-accent text-accent-foreground" },
  { icon: Users, title: "Community", desc: "A global family of cosmic seekers", color: "bg-primary text-primary-foreground" },
];

const milestones = [
  { value: "2019", label: "Founded" },
  { value: "50+", label: "Countries" },
  { value: "15K+", label: "Active Users" },
  { value: "1M+", label: "Readings" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const AboutSection = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cosmic-card cosmic-border mb-4">
            <span className="text-sm">✨</span>
            <span className="text-sm text-muted-foreground font-medium">Our Story</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">Where Ancient Wisdom <span className="text-gradient-cosmic">Meets Modern AI</span></h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <ScrollReveal direction="left">
            <Parallax speed={-0.15}>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-cosmic-gold/10 blur-xl" />
                <img src={aboutGuide} alt="Cosmic Guide" className="relative rounded-2xl w-full max-w-md mx-auto shadow-xl image-glow" />
              </motion.div>
            </Parallax>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <p className="text-muted-foreground leading-relaxed mb-4">
              AstroNexus brings together centuries of astrological tradition with cutting-edge artificial intelligence. Our mission is to connect people worldwide with cosmic knowledge and help them align with their stars for a more fulfilling life.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Founded by a team of passionate astrologers and AI researchers, we have created a platform that makes ancient wisdom accessible to everyone. Whether you are seeking guidance on love, career, or personal growth, AstroNexus is your cosmic companion.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#pricing"
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-opacity"
                whileHover={{ scale: 1.05, boxShadow: "0 8px 30px hsl(var(--cosmic-purple) / 0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                Start Your Journey
              </motion.a>
              <motion.a
                href="#"
                className="px-6 py-3 rounded-full cosmic-border text-foreground font-semibold text-sm flex items-center gap-2"
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {values.map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-cosmic-card cosmic-border rounded-xl p-5 text-center group cursor-pointer overflow-hidden relative"
            >
              <motion.div
                className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mx-auto mb-3 shadow-md`}
                whileHover={{ rotate: 15, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="w-6 h-6" />
              </motion.div>
              <h3 className="font-heading font-bold text-foreground mb-1">{title}</h3>
              <p className="text-xs text-muted-foreground">{desc}</p>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-cosmic-pink scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>

        {/* Milestones bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gradient-to-r from-primary via-cosmic-indigo to-primary rounded-2xl p-8 shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {milestones.map(({ value, label }, i) => (
            <motion.div
              key={label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              <p className="font-heading text-3xl md:text-4xl font-black text-primary-foreground">{value}</p>
              <p className="text-sm text-primary-foreground/70 mt-1">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
