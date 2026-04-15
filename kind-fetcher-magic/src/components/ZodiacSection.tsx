// import { useState } from "react";
// import { motion } from "framer-motion";
// import { ScrollReveal } from "./animations";
// import zodiacAries from "@/assets/zodiac-aries.jpg";
// import zodiacTaurus from "@/assets/zodiac-taurus.jpg";
// import zodiacGemini from "@/assets/zodiac-gemini.jpg";
// import zodiacCancer from "@/assets/zodiac-cancer.jpg";
// import zodiacLeo from "@/assets/zodiac-leo.jpg";
// import zodiacVirgo from "@/assets/zodiac-virgo.jpg";
// import zodiacLibra from "@/assets/zodiac-libra.jpg";
// import zodiacScorpio from "@/assets/zodiac-scorpio.jpg";
// import zodiacSagittarius from "@/assets/zodiac-sagittarius.jpg";
// import zodiacCapricorn from "@/assets/zodiac-capricorn.jpg";
// import zodiacAquarius from "@/assets/zodiac-aquarius.jpg";
// import zodiacPisces from "@/assets/zodiac-pisces.jpg";

// const zodiacSigns = [
//   { name: "Aries", symbol: "♈", dates: "Mar 21 - Apr 19", element: "Fire", hoverText: "Fiery Courage!", image: zodiacAries },
//   { name: "Taurus", symbol: "♉", dates: "Apr 20 - May 20", element: "Earth", hoverText: "Grounded Strength!", image: zodiacTaurus },
//   { name: "Gemini", symbol: "♊", dates: "May 21 - Jun 20", element: "Air", hoverText: "Dual Brilliance!", image: zodiacGemini },
//   { name: "Cancer", symbol: "♋", dates: "Jun 21 - Jul 22", element: "Water", hoverText: "Lunar Intuition!", image: zodiacCancer },
//   { name: "Leo", symbol: "♌", dates: "Jul 23 - Aug 22", element: "Fire", hoverText: "Royal Power!", image: zodiacLeo },
//   { name: "Virgo", symbol: "♍", dates: "Aug 23 - Sep 22", element: "Earth", hoverText: "Pure Wisdom!", image: zodiacVirgo },
//   { name: "Libra", symbol: "♎", dates: "Sep 23 - Oct 22", element: "Air", hoverText: "Balanced Blessings!", image: zodiacLibra },
//   { name: "Scorpio", symbol: "♏", dates: "Oct 23 - Nov 21", element: "Water", hoverText: "Deep Mystery!", image: zodiacScorpio },
//   { name: "Sagittarius", symbol: "♐", dates: "Nov 22 - Dec 21", element: "Fire", hoverText: "Wild Freedom!", image: zodiacSagittarius },
//   { name: "Capricorn", symbol: "♑", dates: "Dec 22 - Jan 19", element: "Earth", hoverText: "Peak Ambition!", image: zodiacCapricorn },
//   { name: "Aquarius", symbol: "♒", dates: "Jan 20 - Feb 18", element: "Air", hoverText: "Cosmic Vision!", image: zodiacAquarius },
//   { name: "Pisces", symbol: "♓", dates: "Feb 19 - Mar 20", element: "Water", hoverText: "Dream Weaver!", image: zodiacPisces },
// ];

// const elementColors: Record<string, string> = {
//   Fire: "text-red-500 bg-red-500/10",
//   Earth: "text-green-600 bg-green-500/10",
//   Air: "text-amber-500 bg-amber-400/10",
//   Water: "text-blue-500 bg-blue-400/10",
// };

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: { staggerChildren: 0.07 },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 50, scale: 0.8, rotate: -5 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     rotate: 0,
//     transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
//   },
// };

// const ZodiacSection = () => {
//   const [hoveredSign, setHoveredSign] = useState<string | null>(null);

//   return (
//     <section id="zodiac" className="py-24 relative">
//       <div className="max-w-7xl mx-auto px-6">
//         <ScrollReveal className="text-center mb-16">
//           <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Choose Your Cosmic Path</p>
//           <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
//             Interested By <span className="text-gradient-cosmic">Zodiac</span>
//           </h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             Select your zodiac sign to unlock personalized cosmic insights and discover what the stars have in store for you today.
//           </p>
//         </ScrollReveal>

//         <motion.div
//           className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-60px" }}
//         >
//           {zodiacSigns.map((sign) => (
//             <motion.div
//               key={sign.name}
//               variants={cardVariants}
//               onMouseEnter={() => setHoveredSign(sign.name)}
//               onMouseLeave={() => setHoveredSign(null)}
//               whileHover={{
//                 scale: 1.1,
//                 y: -12,
//                 transition: { duration: 0.3, ease: "easeOut" },
//               }}
//               className="relative bg-card border border-border rounded-xl text-center group cursor-pointer transition-shadow duration-300 overflow-hidden"
//               style={{
//                 boxShadow: hoveredSign === sign.name
//                   ? `0 8px 32px hsl(var(--cosmic-purple) / 0.25), 0 0 60px hsl(var(--cosmic-purple) / 0.1)`
//                   : undefined,
//               }}
//             >
//               {/* Hover text bubble */}
//               <motion.div
//                 initial={{ opacity: 0, y: 10, scale: 0.8 }}
//                 animate={hoveredSign === sign.name ? { opacity: 1, y: -8, scale: 1 } : { opacity: 0, y: 10, scale: 0.8 }}
//                 transition={{ duration: 0.25 }}
//                 className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
//               >
//                 <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-cosmic-pink text-white text-xs font-bold whitespace-nowrap shadow-lg">
//                   {sign.hoverText}
//                 </div>
//                 <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-primary mx-auto" />
//               </motion.div>

//               {/* Zodiac image - circular with glow */}
//               <div className="pt-4 px-4">
//                 <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-border group-hover:border-primary/50 transition-colors duration-300 shadow-sm">
//                   <motion.img
//                     src={sign.image}
//                     alt={sign.name}
//                     className="w-full h-full object-cover"
//                     whileHover={{ scale: 1.2 }}
//                     transition={{ duration: 0.5 }}
//                   />
//                   {/* Glow ring on hover */}
//                   <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                     style={{ boxShadow: "inset 0 0 15px hsl(var(--cosmic-purple) / 0.3)" }}
//                   />
//                 </div>
//               </div>

//               <div className="p-3 pt-2">
//                 <h3 className="font-heading font-semibold text-foreground text-sm mb-0.5">{sign.name}</h3>
//                 <p className="text-[10px] text-muted-foreground mb-1.5">{sign.dates}</p>
//                 <span className={`text-[10px] px-2 py-0.5 rounded-full ${elementColors[sign.element]}`}>
//                   {sign.element}
//                 </span>
//               </div>

//               {/* Bottom accent */}
//               <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-cosmic-pink scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default ZodiacSection;















import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useAnimation, useMotionValue, useTransform, animate } from "framer-motion";
import zodiacAries from "@/assets/zodiac-aries.jpg";
import zodiacTaurus from "@/assets/zodiac-taurus.jpg";
import zodiacGemini from "@/assets/zodiac-gemini.jpg";
import zodiacCancer from "@/assets/zodiac-cancer.jpg";
import zodiacLeo from "@/assets/zodiac-leo.jpg";
import zodiacVirgo from "@/assets/zodiac-virgo.jpg";
import zodiacLibra from "@/assets/zodiac-libra.jpg";
import zodiacScorpio from "@/assets/zodiac-scorpio.jpg";
import zodiacSagittarius from "@/assets/zodiac-sagittarius.jpg";
import zodiacCapricorn from "@/assets/zodiac-capricorn.jpg";
import zodiacAquarius from "@/assets/zodiac-aquarius.jpg";
import zodiacPisces from "@/assets/zodiac-pisces.jpg";

const zodiacSigns = [
  { name: "Aries",       symbol: "♈", dates: "Mar 21 – Apr 19", element: "Fire",  color: "#ff6b35", image: zodiacAries },
  { name: "Taurus",      symbol: "♉", dates: "Apr 20 – May 20", element: "Earth", color: "#4ade80", image: zodiacTaurus },
  { name: "Gemini",      symbol: "♊", dates: "May 21 – Jun 20", element: "Air",   color: "#fbbf24", image: zodiacGemini },
  { name: "Cancer",      symbol: "♋", dates: "Jun 21 – Jul 22", element: "Water", color: "#60a5fa", image: zodiacCancer },
  { name: "Leo",         symbol: "♌", dates: "Jul 23 – Aug 22", element: "Fire",  color: "#fb923c", image: zodiacLeo },
  { name: "Virgo",       symbol: "♍", dates: "Aug 23 – Sep 22", element: "Earth", color: "#34d399", image: zodiacVirgo },
  { name: "Libra",       symbol: "♎", dates: "Sep 23 – Oct 22", element: "Air",   color: "#e879f9", image: zodiacLibra },
  { name: "Scorpio",     symbol: "♏", dates: "Oct 23 – Nov 21", element: "Water", color: "#818cf8", image: zodiacScorpio },
  { name: "Sagittarius", symbol: "♐", dates: "Nov 22 – Dec 21", element: "Fire",  color: "#f87171", image: zodiacSagittarius },
  { name: "Capricorn",   symbol: "♑", dates: "Dec 22 – Jan 19", element: "Earth", color: "#a3e635", image: zodiacCapricorn },
  { name: "Aquarius",    symbol: "♒", dates: "Jan 20 – Feb 18", element: "Air",   color: "#38bdf8", image: zodiacAquarius },
  { name: "Pisces",      symbol: "♓", dates: "Feb 19 – Mar 20", element: "Water", color: "#c084fc", image: zodiacPisces },
];

const elementGlow: Record<string, string> = {
  Fire:  "0 0 20px #ff6b3580, 0 0 40px #ff6b3530",
  Earth: "0 0 20px #4ade8080, 0 0 40px #4ade8030",
  Air:   "0 0 20px #fbbf2480, 0 0 40px #fbbf2430",
  Water: "0 0 20px #60a5fa80, 0 0 40px #60a5fa30",
};

// ── Constellation lines between adjacent icons ──────────────────────────────
function ConstellationLines({ radius, count }: { radius: number; count: number }) {
  const lines = [];
  for (let i = 0; i < count; i++) {
    const a1 = ((i / count) * 2 * Math.PI) - Math.PI / 2;
    const a2 = (((i + 1) / count) * 2 * Math.PI) - Math.PI / 2;
    const x1 = radius * Math.cos(a1);
    const y1 = radius * Math.sin(a1);
    const x2 = radius * Math.cos(a2);
    const y2 = radius * Math.sin(a2);
    lines.push(
      <line
        key={i}
        x1={x1} y1={y1}
        x2={x2} y2={y2}
        stroke="rgba(139,92,246,0.18)"
        strokeWidth="1"
        strokeDasharray="4 6"
      />
    );
  }
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "visible",
      }}
      viewBox={`${-radius - 70} ${-radius - 70} ${(radius + 70) * 2} ${(radius + 70) * 2}`}
    >
      {lines}
    </svg>
  );
}

// ── Floating star particles ──────────────────────────────────────────────────
function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 4,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {stars.map((s) => (
        <motion.div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "white",
          }}
          animate={{ opacity: [0.1, 1, 0.1], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ── Tooltip ──────────────────────────────────────────────────────────────────
function Tooltip({
  sign,
  angle,
  visible,
}: {
  sign: (typeof zodiacSigns)[0];
  angle: number; // current absolute angle (deg) of this icon in screen space
  visible: boolean;
}) {
  // Position tooltip to the outside of the wheel
  const rad = (angle * Math.PI) / 180;
  const tipDist = 195; // px from center
  const tx = tipDist * Math.cos(rad);
  const ty = tipDist * Math.sin(rad);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.7 }}
      transition={{ duration: 0.22 }}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`,
        pointerEvents: "none",
        zIndex: 50,
        minWidth: 140,
        textAlign: "center",
      }}
    >
      <div
        style={{
          background: "rgba(10,8,30,0.85)",
          backdropFilter: "blur(16px)",
          border: `1px solid ${sign.color}55`,
          borderRadius: 16,
          padding: "10px 16px",
          boxShadow: `0 0 24px ${sign.color}40, inset 0 0 12px ${sign.color}10`,
        }}
      >
        <div style={{ fontSize: 24, marginBottom: 2, lineHeight: 1 }}>{sign.symbol}</div>
        <div style={{ fontFamily: "'Cinzel', serif", color: "#fff", fontWeight: 700, fontSize: 14 }}>
          {sign.name}
        </div>
        <div style={{ color: sign.color, fontSize: 11, marginTop: 2, fontFamily: "serif" }}>
          {sign.element}
        </div>
        <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, marginTop: 3 }}>{sign.dates}</div>
      </div>
    </motion.div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
const ZodiacSection = () => {
  const ORBIT_RADIUS = 200; // px
  const ICON_SIZE = 64;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [selectedSign, setSelectedSign] = useState<(typeof zodiacSigns)[0] | null>(null);

  // Rotation angle (degrees) driven by a motion value for smooth control
  const rotationMV = useMotionValue(0);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);

  // Continuous rotation
  const startRotation = useCallback(() => {
    if (animRef.current) animRef.current.stop();
    const current = rotationMV.get();
    animRef.current = animate(rotationMV, current + 360, {
      duration: 40,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
  }, [rotationMV]);

  useEffect(() => {
    startRotation();
    return () => animRef.current?.stop();
  }, [startRotation]);

  // Pause/resume on hover
  useEffect(() => {
    if (paused) {
      animRef.current?.stop();
    } else {
      startRotation();
    }
  }, [paused, startRotation]);

  // Mouse magnetic pull (subtle)
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="zodiac"
      style={{
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, #0d0620 0%, #030510 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StarField />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: "center", marginBottom: 64, position: "relative", zIndex: 10 }}
      >
        <p style={{
          fontFamily: "'Cinzel', serif",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          fontSize: 11,
          color: "#a78bfa",
          marginBottom: 12,
        }}>
          ✦ Choose Your Cosmic Path ✦
        </p>
        <h2 style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: "clamp(28px, 5vw, 52px)",
          fontWeight: 700,
          color: "#fff",
          lineHeight: 1.15,
          margin: 0,
        }}>
          The{" "}
          <span style={{
            background: "linear-gradient(135deg, #c084fc, #818cf8, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Celestial Wheel
          </span>
        </h2>
        <p style={{
          fontFamily: "Georgia, serif",
          color: "rgba(255,255,255,0.45)",
          marginTop: 14,
          fontSize: 15,
          maxWidth: 480,
          margin: "14px auto 0",
          fontStyle: "italic",
        }}>
          Hover over a sign to reveal your cosmic destiny. The stars are always moving.
        </p>
      </motion.div>

      {/* Wheel container */}
      <div
        ref={containerRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setHoveredIdx(null); }}
        style={{
          position: "relative",
          width: (ORBIT_RADIUS + ICON_SIZE + 20) * 2,
          height: (ORBIT_RADIUS + ICON_SIZE + 20) * 2,
          maxWidth: "min(90vw, 90vh)",
          aspectRatio: "1",
        }}
      >
        {/* Tooltips rendered at full resolution outside scaling */}
        {zodiacSigns.map((sign, i) => {
          const baseAngleDeg = (i / 12) * 360 - 90;
          // The actual screen angle = baseAngleDeg + current rotation
          const screenAngle = baseAngleDeg + rotationMV.get();
          return (
            <Tooltip
              key={sign.name}
              sign={sign}
              angle={((baseAngleDeg % 360) + 360) % 360 - 90}
              visible={hoveredIdx === i}
            />
          );
        })}

        {/* Outer decorative rings */}
        {[1, 0.7, 0.45].map((opacity, ri) => (
          <div
            key={ri}
            style={{
              position: "absolute",
              inset: `${ri * 18}px`,
              borderRadius: "50%",
              border: `1px solid rgba(139,92,246,${opacity * 0.15})`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Orbit track */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: ORBIT_RADIUS * 2,
              height: ORBIT_RADIUS * 2,
              borderRadius: "50%",
              border: "1px dashed rgba(139,92,246,0.25)",
            }}
          />
        </div>

        {/* Constellation lines */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ConstellationLines radius={ORBIT_RADIUS} count={12} />
        </div>

        {/* Rotating ring — whole ring rotates, icons counter-rotate */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            rotate: rotationMV,
          }}
        >
          {zodiacSigns.map((sign, i) => {
            const angleDeg = (i / 12) * 360 - 90;
            const angleRad = (angleDeg * Math.PI) / 180;
            const cx = 50 + (ORBIT_RADIUS / ((ORBIT_RADIUS + ICON_SIZE + 20) * 2)) * 100 * Math.cos(angleRad);
            const cy = 50 + (ORBIT_RADIUS / ((ORBIT_RADIUS + ICON_SIZE + 20) * 2)) * 100 * Math.sin(angleRad);

            return (
              <motion.div
                key={sign.name}
                style={{
                  position: "absolute",
                  left: `${cx}%`,
                  top: `${cy}%`,
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  x: "-50%",
                  y: "-50%",
                  rotate: useTransform(rotationMV, (r) => -r), // counter-rotate so icons stay upright
                  cursor: "pointer",
                  zIndex: hoveredIdx === i ? 30 : 10,
                }}
                whileHover={{ scale: 1.35 }}
                onHoverStart={() => setHoveredIdx(i)}
                onHoverEnd={() => setHoveredIdx(null)}
                onClick={() => setSelectedSign(sign)}
              >
                {/* Orbit glow ring per icon */}
                <motion.div
                  animate={{
                    boxShadow: hoveredIdx === i
                      ? elementGlow[sign.element]
                      : "0 0 0px transparent",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: `2px solid ${hoveredIdx === i ? sign.color : "rgba(255,255,255,0.1)"}`,
                    transition: "border-color 0.3s",
                  }}
                >
                  <img
                    src={sign.image}
                    alt={sign.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      filter: hoveredIdx === i
                        ? "brightness(1.2) saturate(1.4)"
                        : "brightness(0.85) saturate(0.9)",
                      transition: "filter 0.3s",
                    }}
                  />
                </motion.div>

                {/* Symbol badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -8,
                    right: -8,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${sign.color}cc, ${sign.color}44)`,
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    lineHeight: 1,
                    boxShadow: `0 0 8px ${sign.color}80`,
                  }}
                >
                  {sign.symbol}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Center cosmic core */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              background: "radial-gradient(circle at 40% 35%, #7c3aed, #3b0764 60%, #0d0520 100%)",
              boxShadow: "0 0 40px #7c3aed80, 0 0 80px #7c3aed30, inset 0 0 30px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 20,
            }}
          >
            <span style={{ fontSize: 36, lineHeight: 1 }}>☽</span>
            <span style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 8,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.5)",
              marginTop: 4,
              textTransform: "uppercase",
            }}>
              Cosmos
            </span>
          </motion.div>
        </div>
      </div>

      {/* Selected sign detail card */}
      {selectedSign && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: 48,
            background: "rgba(10,8,30,0.85)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${selectedSign.color}40`,
            borderRadius: 20,
            padding: "24px 36px",
            display: "flex",
            alignItems: "center",
            gap: 20,
            boxShadow: `0 0 40px ${selectedSign.color}20`,
            position: "relative",
            zIndex: 10,
            maxWidth: 400,
            width: "90%",
          }}
        >
          <img
            src={selectedSign.image}
            alt={selectedSign.name}
            style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: `2px solid ${selectedSign.color}` }}
          />
          <div>
            <div style={{ fontFamily: "'Cinzel Decorative', serif", color: "#fff", fontSize: 20, fontWeight: 700 }}>
              {selectedSign.symbol} {selectedSign.name}
            </div>
            <div style={{ color: selectedSign.color, fontSize: 13, marginTop: 4, fontFamily: "serif" }}>
              {selectedSign.element} Sign
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 }}>{selectedSign.dates}</div>
          </div>
          <button
            onClick={() => setSelectedSign(null)}
            style={{
              position: "absolute",
              top: 12,
              right: 16,
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.4)",
              fontSize: 18,
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </motion.div>
      )}

      {/* Hint text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          marginTop: 32,
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          color: "rgba(255,255,255,0.22)",
          fontSize: 12,
          letterSpacing: "0.1em",
          position: "relative",
          zIndex: 10,
        }}
      >
        hover to reveal · click to select · the wheel turns eternal
      </motion.p>

      {/* Bottom ambient glow */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "60%",
        height: 1,
        background: "linear-gradient(90deg, transparent, #7c3aed44, #60a5fa44, transparent)",
        pointerEvents: "none",
      }} />
    </section>
  );
};

export default ZodiacSection;