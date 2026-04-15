import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Calendar, Clock, MapPin, ArrowLeft, User } from "lucide-react";
import { generateBirthChart } from "@/lib/api";
import { toast } from "sonner";
import logoImg from "@/assets/logo-astronexus-full.png";
import serviceBirthchart from "@/assets/service-birthchart.jpg";

const BirthChart = () => {
  const [form, setForm] = useState({ name: "", gender: "male", date: "", time: "", place: "", astrologyType: "vedic", ayanamsa: "lahiri" });
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const [year, month, day] = form.date.split("-").map(Number);
      const [h, m] = form.time.split(":").map(Number);
      const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
      const ampm = h >= 12 ? "PM" : "AM";

      const res = await generateBirthChart({
        name: form.name,
        gender: form.gender,
        birth_date: { year, month, day },
        birth_time: { hour, minute: m, ampm },
        place_of_birth: form.place,
        astrology_type: form.astrologyType,
        ayanamsa: form.ayanamsa,
      });
      setResult(res.data || res);
      toast.success("Birth chart generated!");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to generate chart");
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
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Vedic Astrology</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Birth Chart <span className="text-gradient-cosmic">Analysis</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Generate an accurate Kundli based on your birth details. Discover your planetary positions, 
              houses, and cosmic blueprint that shapes your destiny.
            </p>
            <div className="flex gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-accent" /> 12.5K Reports</span>
              <span>•</span>
              <span>⭐ 4.9 Rating</span>
            </div>
          </div>
          <motion.div className="rounded-2xl overflow-hidden shadow-lg" whileHover={{ scale: 1.02 }}>
            <img src={serviceBirthchart} alt="Birth Chart" className="w-full h-64 object-cover" />
          </motion.div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-8 mb-10"
        >
          <h2 className="font-heading text-2xl font-bold mb-6">Enter Your Birth Details</h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
              <input
                type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary" /> Gender
              </label>
              <select
                value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" /> Date of Birth
              </label>
              <input
                type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" /> Time of Birth
              </label>
              <input
                type="time" required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" /> Place of Birth
              </label>
              <input
                type="text" required value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="City, Country"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Astrology Type</label>
              <select
                value={form.astrologyType} onChange={(e) => setForm({ ...form, astrologyType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="vedic">Vedic</option>
                <option value="western">Western</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <motion.button
                type="submit" disabled={loading}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold glow-purple hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-4 h-4" />
                {loading ? "Generating Chart..." : "Generate Birth Chart"}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <h2 className="font-heading text-2xl font-bold mb-2">Your Cosmic Blueprint</h2>
            <p className="text-muted-foreground mb-6">Birth chart analysis for {form.name}</p>
            {typeof result === "object" && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(result).filter(([k]) => !["success", "__v", "_id"].includes(k)).map(([key, value]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -4 }}
                    className="bg-muted/30 border border-border rounded-xl p-4 text-center"
                  >
                    <p className="text-xs text-muted-foreground capitalize mb-1">{key.replace(/_/g, " ")}</p>
                    <p className="font-heading font-bold text-foreground text-sm">
                      {typeof value === "string" ? value
                        : key === "birth_date" || key === "birthDate"
                          ? `${(value as Record<string, number>).day}/${(value as Record<string, number>).month}/${(value as Record<string, number>).year}`
                        : key === "birth_time" || key === "birthTime"
                          ? `${(value as Record<string, unknown>).hour}:${String((value as Record<string, unknown>).minute).padStart(2, "0")} ${(value as Record<string, unknown>).ampm || ""}`
                        : key === "chartImage"
                          ? "View Chart"
                        : typeof value === "number" ? String(value)
                        : JSON.stringify(value)}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BirthChart;
