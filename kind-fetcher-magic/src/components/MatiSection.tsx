import { useState, useRef, useEffect } from "react";
import { MessageCircle, Sparkles, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import matiAvatar from "@/assets/hero-mati.png";
import { ScrollReveal, Parallax } from "./animations";

const suggestions = [
  "What does my future hold?",
  "Am I compatible with my partner?",
  "When will I find love?",
  "Should I change careers?",
  "What's my lucky number today?",
  "Will I travel soon?",
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

const mockResponses: Record<string, string> = {
  "What does my future hold?":
    "The stars whisper of transformation ahead! Jupiter aligns with your natal Sun, suggesting a period of growth and opportunity in the coming months. Trust in cosmic timing — great changes are on the horizon. ✨",
  "Am I compatible with my partner?":
    "Based on cosmic energy patterns, I sense a deep soul connection. Venus and Mars are in harmonious aspect, indicating strong romantic chemistry. Your bond has the potential for lasting love. 💫",
  "When will I find love?":
    "The celestial alignments suggest love may enter your life when Venus transits your 7th house. Stay open to unexpected encounters — the universe often surprises us with connections when we least expect them. 🌹",
  "Should I change careers?":
    "Mercury's alignment with your midheaven suggests this is indeed a powerful time for career transformation. Your creative energies are heightened — trust your instincts and take that leap of faith! 🚀",
  "What's my lucky number today?":
    "Based on today's planetary positions, your lucky number is **7**! The mystical energy of Neptune enhances your intuition today. Trust those gut feelings. 🔮",
  "Will I travel soon?":
    "The 9th house of travel is activated in your chart! I see journeys across water and mountains. A meaningful trip could happen within the next lunar cycle. Pack your bags, cosmic explorer! 🌍",
};

const defaultResponse =
  "The stars whisper secrets about your query. Based on current planetary alignments, I sense powerful energies at play. Would you like me to generate a detailed reading for you? ✨";

const MatiSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Greetings, cosmic seeker! I am Mati, your AI astrological guide. Ask me anything about your stars, destiny, or future. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const hasInteracted = useRef(false);

  useEffect(() => {
    if (hasInteracted.current) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    hasInteracted.current = true;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const response = mockResponses[text.trim()] || defaultResponse;
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <section id="mati" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cosmic-card cosmic-border mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground font-medium">AI-Powered Guidance</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Meet <span className="text-gradient-cosmic">Mati</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your Cosmic AI Guide. Ask anything about your destiny, love, career, or future.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Orb */}
          <ScrollReveal direction="left">
            <Parallax speed={-0.2} className="flex justify-center">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="absolute inset-0 rounded-full bg-primary/15 blur-[80px] animate-pulse" />
                <img src={matiAvatar} alt="Mati AI" className="relative w-72 md:w-96 animate-float drop-shadow-[0_0_60px_rgba(147,51,234,0.6)] z-30 mask-fade-bottom" />
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-card cosmic-border text-sm text-muted-foreground shadow-md cursor-pointer"
                  whileHover={{ scale: 1.1, y: -4 }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  onClick={() => document.getElementById("mati-input")?.focus({ preventScroll: true })}
                >
                  <MessageCircle className="w-4 h-4 inline mr-1 text-primary" /> Tap to Ask
                </motion.div>
              </motion.div>
            </Parallax>
          </ScrollReveal>

          {/* Right - Chat interface */}
          <ScrollReveal direction="right">
            <div className="bg-cosmic-card cosmic-border rounded-2xl overflow-hidden shadow-lg flex flex-col" style={{ height: "520px" }}>
              {/* Chat header */}
              <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 px-5 py-4 flex items-center gap-3 shrink-0">
                <motion.div
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-primary-foreground text-sm">Mati</h3>
                  <p className="text-xs text-primary-foreground/70">Your Cosmic AI Guide</p>
                </div>
                <span className="text-xs text-primary-foreground/80 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Online
                </span>
              </div>

              {/* Messages area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                <AnimatePresence initial={false}>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shrink-0 mt-1">
                          <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "user"
                          ? "bg-accent text-accent-foreground rounded-br-md"
                          : "bg-muted/60 text-foreground rounded-bl-md"
                          }`}
                      >
                        {msg.content}
                        {msg.role === "assistant" && i > 0 && (
                          <motion.button
                            className="block mt-2 text-xs text-primary font-medium hover:underline"
                            whileHover={{ x: 4 }}
                          >
                            Get Full Reading →
                          </motion.button>
                        )}
                      </div>
                      {msg.role === "user" && (
                        <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                          <MessageCircle className="w-3.5 h-3.5 text-accent" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shrink-0 mt-1">
                      <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <div className="bg-muted/60 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                      <motion.span
                        className="w-2 h-2 rounded-full bg-primary/50"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                      />
                      <motion.span
                        className="w-2 h-2 rounded-full bg-primary/50"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                      />
                      <motion.span
                        className="w-2 h-2 rounded-full bg-primary/50"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                      />
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggestion pills */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2">
                  <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestions.map((s, i) => (
                      <motion.button
                        key={s}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => sendMessage(s)}
                        className="text-xs px-3 py-1.5 rounded-full cosmic-border text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-all"
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input area */}
              <form onSubmit={handleSubmit} className="p-3 border-t border-border flex gap-2 shrink-0">
                <input
                  id="mati-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your cosmic question..."
                  className="flex-1 px-4 py-2.5 rounded-full bg-muted/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  disabled={isTyping}
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default MatiSection;
