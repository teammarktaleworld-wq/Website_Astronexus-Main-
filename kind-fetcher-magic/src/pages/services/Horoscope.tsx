import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Sun, ArrowLeft, Star, Flame, Droplets, Wind, Mountain } from "lucide-react";
import logoImg from "@/assets/logo-astronexus-full.png";
import serviceHoroscope from "@/assets/service-horoscope.jpg";
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
  { name: "Aries", symbol: "♈", dates: "Mar 21 - Apr 19", element: "Fire", image: zodiacAries },
  { name: "Taurus", symbol: "♉", dates: "Apr 20 - May 20", element: "Earth", image: zodiacTaurus },
  { name: "Gemini", symbol: "♊", dates: "May 21 - Jun 20", element: "Air", image: zodiacGemini },
  { name: "Cancer", symbol: "♋", dates: "Jun 21 - Jul 22", element: "Water", image: zodiacCancer },
  { name: "Leo", symbol: "♌", dates: "Jul 23 - Aug 22", element: "Fire", image: zodiacLeo },
  { name: "Virgo", symbol: "♍", dates: "Aug 23 - Sep 22", element: "Earth", image: zodiacVirgo },
  { name: "Libra", symbol: "♎", dates: "Sep 23 - Oct 22", element: "Air", image: zodiacLibra },
  { name: "Scorpio", symbol: "♏", dates: "Oct 23 - Nov 21", element: "Water", image: zodiacScorpio },
  { name: "Sagittarius", symbol: "♐", dates: "Nov 22 - Dec 21", element: "Fire", image: zodiacSagittarius },
  { name: "Capricorn", symbol: "♑", dates: "Dec 22 - Jan 19", element: "Earth", image: zodiacCapricorn },
  { name: "Aquarius", symbol: "♒", dates: "Jan 20 - Feb 18", element: "Air", image: zodiacAquarius },
  { name: "Pisces", symbol: "♓", dates: "Feb 19 - Mar 20", element: "Water", image: zodiacPisces },
];

const elementColors: Record<string, string> = {
  Fire: "from-red-500/20 to-orange-500/20 border-red-500/30",
  Earth: "from-emerald-500/20 to-amber-500/20 border-emerald-500/30",
  Air: "from-sky-500/20 to-violet-500/20 border-sky-500/30",
  Water: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
};

const elementIcons: Record<string, React.ReactNode> = {
  Fire: <Flame className="w-3 h-3" />,
  Earth: <Mountain className="w-3 h-3" />,
  Air: <Wind className="w-3 h-3" />,
  Water: <Droplets className="w-3 h-3" />,
};

const mockHoroscopes: Record<string, { daily: string; weekly: string; love: string; career: string }> = {
  Aries: {
    daily: "Today brings fiery energy your way! Mars fuels your ambitions. Take bold action on that project you've been planning. The stars favor leadership and initiative. 🔥",
    weekly: "This week, focus on personal growth. A surprise opportunity arrives mid-week that aligns with your long-term goals.",
    love: "Romance is in the air! Venus smiles on your relationships. Express your feelings boldly — the cosmos rewards honesty.",
    career: "A leadership role beckons. Your natural confidence will shine in meetings and presentations this period.",
  },
};

zodiacSigns.forEach((s) => {
  if (!mockHoroscopes[s.name]) {
    mockHoroscopes[s.name] = {
      daily: `The cosmic energies align beautifully for ${s.name} today. Trust your intuition and embrace new opportunities that come your way. The universe has special plans for you! ✨`,
      weekly: `This week brings transformation for ${s.name}. Pay attention to signs from the universe — they're guiding you toward your highest potential.`,
      love: `Love energy surrounds ${s.name}. Whether single or in a relationship, open your heart to deeper connections and emotional growth.`,
      career: `Professional growth is highlighted for ${s.name}. Your unique skills are recognized and valued. A promotion or new opportunity may be on the horizon.`,
    };
  }
});

const Horoscope = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState<"daily" | "weekly" | "love" | "career">("daily");

  const selectedSign = zodiacSigns.find((s) => s.name === selected);

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="AstroNexus" className="h-9 w-auto" />
          </Link>
          <Link to="/#services" className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Daily Guidance</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Daily <span className="text-gradient-cosmic">Horoscope</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Select your zodiac sign for personalized cosmic insights.</p>
        </motion.div>

        {/* Zodiac Cards Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-12">
          {zodiacSigns.map((sign, i) => (
            <motion.button
              key={sign.name}
              onClick={() => { setSelected(sign.name); setTab("daily"); }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all overflow-hidden group ${
                selected === sign.name
                  ? `bg-gradient-to-b ${elementColors[sign.element]} border-primary shadow-lg shadow-primary/20`
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-primary/50 transition-all">
                <img
                  src={sign.image}
                  alt={sign.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-lg drop-shadow-lg">
                  {sign.symbol}
                </span>
              </div>
              <span className="text-xs font-semibold text-foreground">{sign.name}</span>
              <span className="text-[10px] text-muted-foreground leading-tight">{sign.dates}</span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                {elementIcons[sign.element]} {sign.element}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Horoscope Display */}
        <AnimatePresence mode="wait">
          {selected && selectedSign && mockHoroscopes[selected] && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.4 }}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Header with image */}
              <div className="relative h-48 overflow-hidden">
                <img src={selectedSign.image} alt={selected} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent" />
                <div className="absolute bottom-4 left-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary shadow-lg">
                    <img src={selectedSign.image} alt={selected} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
                      <span className="text-3xl">{selectedSign.symbol}</span> {selected}
                    </h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      {selectedSign.dates} • {elementIcons[selectedSign.element]} {selectedSign.element}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-border">
                {(["daily", "weekly", "love", "career"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 py-3 text-sm font-medium capitalize transition-colors relative ${
                      tab === t ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                    {tab === t && (
                      <motion.div
                        layoutId="horoscope-tab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${selected}-${tab}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-foreground leading-relaxed text-base"
                  >
                    {mockHoroscopes[selected][tab]}
                  </motion.p>
                </AnimatePresence>
                <div className="flex items-center gap-2 mt-6 text-xs text-muted-foreground">
                  <Star className="w-3 h-3 text-accent" />
                  <span>Updated today • Powered by AI Astrology</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Horoscope;
