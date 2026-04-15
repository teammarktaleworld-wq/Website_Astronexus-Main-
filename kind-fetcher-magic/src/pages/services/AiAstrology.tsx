import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, ArrowLeft, Send, Sparkles, MessageCircle, Calendar, Clock, MapPin, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { askChatbot, signupAstrology } from "@/lib/api";
import { toast } from "sonner";
import logoImg from "@/assets/logo-astronexus-full.png";
import serviceAi from "@/assets/service-ai.jpg";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AiAstrology = () => {
  const { isAuthenticated, sessionId, user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Welcome to AI Astrology! I combine artificial intelligence with ancient cosmic wisdom to provide personalized insights. Ask me anything about your stars, planets, or destiny. 🌌" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [needsProfile, setNeedsProfile] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileForm, setProfileForm] = useState({
    date: "", time: "", place: "", gender: "male", astrologyType: "vedic", ayanamsa: "lahiri",
  });
  const chatEndRef = useRef<HTMLDivElement>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    if (hasInteracted.current) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const [year, month, day] = profileForm.date.split("-").map(Number);
      const [h, m] = profileForm.time.split(":").map(Number);
      const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
      const ampm = h >= 12 ? "PM" : "AM";

      // Try multiple field name formats to match what backend might expect
      const payload = {
        name: user?.name || "User",
        gender: profileForm.gender,
        place_of_birth: profileForm.place,
        placeOfBirth: profileForm.place,
        astrology_type: profileForm.astrologyType,
        astrologyType: profileForm.astrologyType,
        ayanamsa: profileForm.ayanamsa,
        birth_date: { year, month, day },
        birthDate: { year, month, day },
        birth_time: { hour, minute: m, ampm },
        birthTime: { hour, minute: m, ampm },
        dob: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
        tob: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
        pob: profileForm.place,
      };
      console.log("Saving astrology profile:", JSON.stringify(payload));
      const res = await signupAstrology(payload);
      console.log("Profile save response:", JSON.stringify(res));
      toast.success("Birth profile saved! You can now chat with the AI.");
      setNeedsProfile(false);
      setMessages((prev) => [...prev, { role: "assistant", content: "✨ Your cosmic profile is set! Ask me anything about your stars, planets, or destiny." }]);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setProfileLoading(false);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    hasInteracted.current = true;

    if (!isAuthenticated || !sessionId) {
      toast.error("Please log in to use AI Astrology");
      return;
    }

    const userMsg = text.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await askChatbot({ session_id: sessionId, question: userMsg });
      const answer = res.answer || res.data?.answer || "I couldn't process that. Please try again.";

      // Detect if backend says profile is missing
      if (typeof answer === "string" && (answer.toLowerCase().includes("birth profile missing") || answer.toLowerCase().includes("complete astrology profile"))) {
        setNeedsProfile(true);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Chatbot service failed";
      if (msg.toLowerCase().includes("birth profile") || msg.toLowerCase().includes("astrology profile")) {
        setNeedsProfile(true);
      }
      setMessages((prev) => [...prev, { role: "assistant", content: `⚠️ ${msg}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
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

      <div className="max-w-3xl mx-auto px-6 py-8 flex-1 flex flex-col w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <div className="rounded-2xl overflow-hidden h-40 mb-6">
            <img src={serviceAi} alt="AI Astrology" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-heading text-3xl font-bold mb-2">
            <Brain className="w-7 h-7 inline text-primary mr-2" />
            AI <span className="text-gradient-cosmic">Astrology</span>
          </h1>
          <p className="text-muted-foreground text-sm">Powered by cutting-edge AI • 20K+ readings delivered</p>
          {!isAuthenticated && (
            <p className="text-destructive text-sm mt-2">
              <Link to="/login" className="underline font-medium">Log in</Link> to start chatting with the AI
            </p>
          )}
        </motion.div>

        {/* Birth Profile Form */}
        <AnimatePresence>
          {needsProfile && isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="bg-card border border-primary/30 rounded-2xl p-6">
                <h3 className="font-heading text-lg font-bold mb-1 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" /> Complete Your Birth Profile
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  The AI needs your birth details to provide personalized cosmic insights.
                </p>
                <form onSubmit={handleProfileSubmit} className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" /> Date of Birth
                    </label>
                    <input
                      type="date" required value={profileForm.date}
                      onChange={(e) => setProfileForm({ ...profileForm, date: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:ring-2 focus:ring-primary/30 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-primary" /> Time of Birth
                    </label>
                    <input
                      type="time" required value={profileForm.time}
                      onChange={(e) => setProfileForm({ ...profileForm, time: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:ring-2 focus:ring-primary/30 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" /> Place of Birth
                    </label>
                    <input
                      type="text" required value={profileForm.place}
                      onChange={(e) => setProfileForm({ ...profileForm, place: e.target.value })}
                      placeholder="City, Country"
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-primary" /> Gender
                    </label>
                    <select
                      value={profileForm.gender}
                      onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:ring-2 focus:ring-primary/30 focus:outline-none"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block">Astrology Type</label>
                    <select
                      value={profileForm.astrologyType}
                      onChange={(e) => setProfileForm({ ...profileForm, astrologyType: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:ring-2 focus:ring-primary/30 focus:outline-none"
                    >
                      <option value="vedic">Vedic</option>
                      <option value="western">Western</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <motion.button
                      type="submit" disabled={profileLoading}
                      className="w-full py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Sparkles className="w-4 h-4" />
                      {profileLoading ? "Saving..." : "Save Profile"}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 bg-card border border-border rounded-2xl flex flex-col overflow-hidden" style={{ minHeight: "400px" }}>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shrink-0 mt-1">
                      <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted/60 text-foreground rounded-bl-md"
                  }`}>
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                      <MessageCircle className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
                <div className="bg-muted/60 rounded-2xl px-4 py-3 flex gap-1.5">
                  {[0, 0.2, 0.4].map((d) => (
                    <motion.span key={d} className="w-2 h-2 rounded-full bg-primary/50" animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: d }} />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="p-3 border-t border-border flex gap-2">
            <input
              type="text" value={input} onChange={(e) => setInput(e.target.value)}
              placeholder={isAuthenticated ? "Ask the AI about your cosmic destiny..." : "Log in to chat..."}
              className="flex-1 px-4 py-2.5 rounded-full bg-muted/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              disabled={isTyping || !isAuthenticated}
            />
            <motion.button type="submit" disabled={!input.trim() || isTyping || !isAuthenticated} className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Send className="w-4 h-4" />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiAstrology;
