import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, RotateCcw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getRandomTarot } from "@/lib/api";
import { toast } from "sonner";
import logoImg from "@/assets/logo-astronexus-full.png";
import serviceTarot from "@/assets/service-tarot.jpg";

interface TarotCard {
  id: string;
  name: string;
  meaning: string;
}

const cardColors = [
  "from-primary/20 to-accent/10 border-primary/30",
  "from-accent/20 to-primary/10 border-accent/30",
  "from-pink-500/20 to-primary/10 border-pink-500/30",
];

const TarotReading = () => {
  const { isAuthenticated } = useAuth();
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [numCards, setNumCards] = useState(3);

  const drawCards = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to draw tarot cards");
      return;
    }
    setLoading(true);
    setRevealed(false);
    setCards([]);
    try {
      const res = await getRandomTarot(numCards);
      const drawnCards = res.cards || res.data?.cards || [];
      setCards(drawnCards);
      setTimeout(() => setRevealed(true), 300);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Tarot service failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logoImg} alt="AstroNexus" className="h-9 w-auto" />
          </Link>
          <Link to="/#services" className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-10 items-center mb-12">
          <div>
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Divine Guidance</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Tarot Card <span className="text-gradient-cosmic">Reading</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Draw cards from the cosmic deck and uncover hidden truths. Each card reveals a unique message 
              from the universe about your past, present, and future.
            </p>
            <div className="flex gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-accent" /> Instant Readings</span>
              <span>•</span>
              <span>🔮 Ancient Wisdom</span>
            </div>
          </div>
          <motion.div className="rounded-2xl overflow-hidden shadow-lg" whileHover={{ scale: 1.02 }}>
            <img src={serviceTarot} alt="Tarot Reading" className="w-full h-64 object-cover" />
          </motion.div>
        </motion.div>

        {/* Draw Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-8 mb-10 text-center"
        >
          <h2 className="font-heading text-2xl font-bold mb-4">Draw Your Cards</h2>
          <p className="text-muted-foreground mb-6">Choose how many cards to reveal from the cosmic deck</p>

          <div className="flex justify-center gap-3 mb-6">
            {[1, 3, 5].map((n) => (
              <motion.button
                key={n}
                onClick={() => setNumCards(n)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  numCards === n
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {n} Card{n > 1 ? "s" : ""}
              </motion.button>
            ))}
          </div>

          {!isAuthenticated && (
            <p className="text-destructive text-sm mb-4">
              <Link to="/login" className="underline font-medium">Log in</Link> to draw tarot cards
            </p>
          )}

          <motion.button
            onClick={drawCards}
            disabled={loading || !isAuthenticated}
            className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold glow-purple hover:opacity-90 transition-all inline-flex items-center gap-2 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <><RotateCcw className="w-4 h-4 animate-spin" /> Drawing...</>
            ) : (
              <><Sparkles className="w-4 h-4" /> {cards.length > 0 ? "Draw Again" : "Draw Cards"}</>
            )}
          </motion.button>
        </motion.div>

        {/* Cards Result */}
        <AnimatePresence>
          {cards.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-10"
            >
              <h2 className="font-heading text-2xl font-bold text-center mb-2">Your Reading</h2>
              <p className="text-muted-foreground text-center mb-8">The cosmos has spoken — here are your cards</p>

              <div className={`grid gap-6 ${cards.length === 1 ? "max-w-sm mx-auto" : cards.length <= 3 ? "md:grid-cols-3" : "md:grid-cols-3 lg:grid-cols-5"}`}>
                {cards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, rotateY: 180, scale: 0.8 }}
                    animate={revealed ? { opacity: 1, rotateY: 0, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className={`bg-gradient-to-br ${cardColors[i % cardColors.length]} border rounded-2xl p-6 text-center relative overflow-hidden`}
                    style={{ perspective: "1000px" }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                    
                    <motion.div
                      className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 4, delay: i * 0.5 }}
                    >
                      <span className="text-2xl">🃏</span>
                    </motion.div>

                    <h3 className="font-heading text-lg font-bold text-foreground mb-3">{card.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{card.meaning}</p>

                    <div className="mt-4 text-xs text-muted-foreground/60 uppercase tracking-wider">
                      Card {i + 1} of {cards.length}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TarotReading;
