import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ArrowLeft, Sparkles } from "lucide-react";
import logoImg from "@/assets/logo-astronexus-full.png";
import serviceLove from "@/assets/service-love.jpg";

const zodiacSigns = [
  "Aries ♈", "Taurus ♉", "Gemini ♊", "Cancer ♋", "Leo ♌", "Virgo ♍",
  "Libra ♎", "Scorpio ♏", "Sagittarius ♐", "Capricorn ♑", "Aquarius ♒", "Pisces ♓",
];

const getCompatibility = (sign1: string, sign2: string) => {
  const seed = (sign1 + sign2).length * 7 + sign1.charCodeAt(0) + sign2.charCodeAt(0);
  const score = 55 + (seed % 46);
  const s1 = sign1.split(" ")[0];
  const s2 = sign2.split(" ")[0];

  let level: string, color: string;
  if (score >= 85) { level = "Soulmate Connection 💫"; color = "text-emerald-500"; }
  else if (score >= 70) { level = "Strong Bond 🌟"; color = "text-primary"; }
  else if (score >= 55) { level = "Growing Potential 🌱"; color = "text-accent"; }
  else { level = "Challenging but Transformative 🔥"; color = "text-pink-500"; }

  return {
    score,
    level,
    color,
    details: [
      { label: "Emotional", value: Math.min(100, score + (seed % 15) - 7) },
      { label: "Intellectual", value: Math.min(100, score + (seed % 20) - 10) },
      { label: "Physical", value: Math.min(100, score + (seed % 18) - 9) },
      { label: "Spiritual", value: Math.min(100, score + (seed % 12) - 6) },
    ],
    summary: `The cosmic connection between ${s1} and ${s2} reveals a ${level.split(" ")[0].toLowerCase()} bond. Your planetary alignments suggest mutual growth and deep understanding. Trust the stars — this connection has unique gifts to offer both of you.`,
  };
};

const LoveCompatibility = () => {
  const [sign1, setSign1] = useState("");
  const [sign2, setSign2] = useState("");
  const [result, setResult] = useState<ReturnType<typeof getCompatibility> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    if (!sign1 || !sign2) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(getCompatibility(sign1, sign2));
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logoImg} alt="AstroNexus" className="h-9 w-auto" />
          </Link>
          <Link to="/#services" className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-pink-500 text-sm font-semibold tracking-widest uppercase mb-3">Cosmic Love</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Love <span className="text-gradient-cosmic">Compatibility</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Discover the cosmic chemistry between two zodiac signs.</p>
        </motion.div>

        {/* Hero image */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="rounded-2xl overflow-hidden mb-10 h-48">
          <img src={serviceLove} alt="Love" className="w-full h-full object-cover" />
        </motion.div>

        {/* Sign selectors */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-border rounded-2xl p-8 mb-10">
          <div className="grid md:grid-cols-2 gap-6 items-end">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-pink-500" /> Your Sign
              </label>
              <select
                value={sign1} onChange={(e) => setSign1(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="">Select your sign</option>
                {zodiacSigns.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-pink-500" /> Partner's Sign
              </label>
              <select
                value={sign2} onChange={(e) => setSign2(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="">Select partner's sign</option>
                {zodiacSigns.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <motion.button
            onClick={handleCheck}
            disabled={!sign1 || !sign2 || loading}
            className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-primary text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles className="w-4 h-4" />
            {loading ? "Reading the Stars..." : "Check Compatibility"}
          </motion.button>
        </motion.div>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <div className="text-center mb-8">
                <p className="text-5xl font-bold text-foreground mb-2">{result.score}%</p>
                <p className={`font-heading text-lg font-bold ${result.color}`}>{result.level}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {result.details.map((d) => (
                  <div key={d.label} className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">{d.label}</p>
                    <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-pink-500 to-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${d.value}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                    <p className="text-sm font-bold text-foreground mt-1">{d.value}%</p>
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed text-center">{result.summary}</p>
              <p className="text-xs text-muted-foreground mt-4 text-center italic">
                * Sample reading. Full analysis available with API integration.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoveCompatibility;
