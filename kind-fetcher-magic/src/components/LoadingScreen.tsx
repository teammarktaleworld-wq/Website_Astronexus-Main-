import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logoImg from "@/assets/logo-astronexus-full.png";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return p + 1.5;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Subtle radial glow behind logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Logo */}
      <motion.img
        src={logoImg}
        alt="AstroNexus"
        className="h-20 w-auto mb-10 relative z-10"
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Minimal progress line */}
      <div className="relative z-10 w-40">
        <div className="w-full h-[2px] rounded-full bg-border overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
        <motion.p
          className="text-[11px] text-muted-foreground/60 text-center mt-3 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
