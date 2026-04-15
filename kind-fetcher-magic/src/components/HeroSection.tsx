import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Users, Zap, Sparkles, Brain, Globe, Radio, Orbit, Activity, Sparkle } from "lucide-react";
import heroAstronaut from "@/assets/hero-mati.png";
// import { Parallax } from "./animations";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

const stats = [
  { icon: Star, label: "4.9/5 Rating" },
  { icon: Users, label: "15K+ Enlightened Souls" },
  { icon: Zap, label: "98% Accuracy" },
];

const marqueeItems = [
  { text: "AI Powered", icon: Brain },
  { text: "Quantum Readings", icon: Sparkles },
  { text: "Daily Horoscope", icon: Star },
  { text: "Updated Live", icon: Radio },
  { text: "AI Accuracy 98%", icon: Zap },
  { text: "Instant Cosmic Clarity", icon: Sparkles },
  { text: "Neural Star Mapping", icon: Globe },
  { text: "15K+ Enlightened Souls", icon: Users },
  { text: "Quantum Predictions", icon: Orbit },
  { text: "Real-time Alignments", icon: Activity },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center overflow-hidden star-field">
      {/* Parallax gradient orbs */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cosmic-blue/10 blur-[120px]" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-cosmic-pink/5 blur-[100px]" />
      </motion.div>

      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6 pt-28 pb-16 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div style={{ y: textY }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-accent text-sm font-semibold tracking-widest uppercase mb-4"
          >
            Trusted by 15,000+ Souls
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-5xl md:text-7xl font-black leading-[1.05] mb-6"
          >
            Awaken Your{" "}
            <span className="text-gradient-cosmic">Stellar Potential</span>{" "}
            with AI Astrology
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="text-muted-foreground text-lg md:text-xl max-w-lg mb-8 leading-relaxed"
          >
            Precision Insights That Transform Your Destiny. Experience the fusion of ancient cosmic wisdom and cutting-edge artificial intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap gap-4 mb-6"
          >
            <a href="#pricing" className=" px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold glow-purple hover:opacity-90 transition-all hover-scale">
              Claim Your Free Reading
            </a>
            <a href="#services" className="px-8 py-3.5 rounded-full cosmic-border text-primary font-semibold hover:bg-secondary transition-colors hover-scale">
              Live Demo
            </a>
            <a
              href="#pricing"
              className="px-8 py-3.5 rounded-full cosmic-border-gold text-[#1a1a2e] font-semibold hover:bg-accent/10 transition-colors hover-scale"
              style={{ background: "linear-gradient(135deg, #fcd34d, #fbbf24)" }}
            >
              VIP Access
            </a>
          </motion.div>

          {/* App download buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <a href="#" className="flex items-center gap-3 bg-[#000000] text-white px-5 py-2 rounded-xl border border-white/10 hover:bg-[#111111] transition-all hover-scale shadow-lg">
              <svg viewBox="0 0 384 512" className="w-5 h-5 fill-current"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
              <div className="text-left">
                <p className="text-[9px] uppercase leading-none opacity-70">Download on</p>
                <p className="text-xs font-bold leading-none mt-1">App Store</p>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3 bg-[#000000] text-white px-5 py-2 rounded-xl border border-white/10 hover:bg-[#111111] transition-all hover-scale shadow-lg">
              <svg viewBox="0 0 512 512" className="w-5 h-5"><path fill="#3bccff" d="M10.3 33.3c-1.3 1.5-2.1 3.8-2.1 6.8v431.8c0 3 .8 5.4 2.1 6.8l2.2 2.2L251.4 256.3V255.7L12.5 31.1l-2.2 2.2z" /><path fill="#ffd400" d="M344 349.5l-92.6-93.5V255.7L344 162.5l1.6.9 109.8 62.4c31.1 17.7 31.1 46.5 0 64.2l-109.8 62.4c-1.6 1.1-1.6 1.1-1.6 1.1z" /><path fill="#ff3333" d="M345.6 162.5l-94.2 93.2L12.5 31.1l-2.2 2.2c4.4 5 133.4 75.5 335.3 129.2z" /><path fill="#48ff48" d="M345.6 349.5c-201.1 114.3-330.1 187.5-335.3 192.5l2.2 2.2 238.9-236.1 94.2 93.2v-11.8z" /></svg>
              <div className="text-left">
                <p className="text-[9px] uppercase leading-none opacity-70">Get it on</p>
                <p className="text-xs font-bold leading-none mt-1">Google Play</p>
              </div>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.95 }}
            className="flex flex-wrap gap-6"
          >
            {stats.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-accent" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <ParallaxProvider>
            <Parallax speed={-0.3}>
              <motion.div
                className="relative flex items-center justify-center"
                style={{ scale: imgScale }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                {/* Cloudy Glow Background */}
                <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 blur-[120px] animate-pulse-slow" />

                {/* Sparkle Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  <span className="sparkle top-10 left-20"></span>
                  <span className="sparkle top-32 right-10"></span>
                  <span className="sparkle bottom-20 left-10"></span>
                  <span className="sparkle bottom-10 right-24"></span>
                </div>

                {/* Avatar Image */}
                <motion.img
                  src={heroAstronaut}
                  alt="Cosmic Astronaut"
                  className="relative w-[400px] md:w-[550px] drop-shadow-[0_0_60px_rgba(147,51,234,0.6)] z-30 mask-fade-bottom"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>
            </Parallax>
          </ParallaxProvider>
        </motion.div>
      </motion.div>

      {/* Scrolling marquee - purple gradient */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 overflow-hidden marquee-strip"
      >
        <div className="flex animate-scroll-left whitespace-nowrap py-3.5">
          {[...marqueeItems, ...marqueeItems].map((item, i) => {
            const Icon = item.icon;
            return (
              <span key={i} className="mx-8 text-sm text-primary-foreground font-semibold flex items-center gap-2">
                <Icon className="w-4 h-4 text-accent" />
                {item.text}
              </span>
            );
          })}
        </div>
      </motion.div>
    </section >
  );
};

export default HeroSection;
