import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import CosmicThemeToggle from "./CosmicThemeToggle";
import logoImg from "@/assets/logo-astronexus-full.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Zodiac", href: "#zodiac" },
  { label: "Services", href: "#services" },
  { label: "AI Guide", href: "#mati" },
];

// Navbar component - requires AuthProvider ancestor
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-xl shadow-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center">
          <img src={logoImg} alt="AstroNexus" className="h-10 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            (link as any).isRoute ? (
              <Link key={link.label} to={link.href} className="story-link text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <span>{link.label}</span>
              </Link>
            ) : (
              <a key={link.label} href={link.href} className="story-link text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <span>{link.label}</span>
              </a>
            )
          )}
          <CosmicThemeToggle />
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <button onClick={logout} className="text-muted-foreground hover:text-foreground"><LogOut className="w-4 h-4" /></button>
            </div>
          ) : (
            <Link to="/login" className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all hover-scale glow-purple">
              Login
            </Link>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) =>
                (link as any).isRoute ? (
                  <Link key={link.label} to={link.href} onClick={() => setMobileOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground">{link.label}</Link>
                ) : (
                  <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground">{link.label}</a>
                )
              )}
              {isAuthenticated ? (
                <>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="text-sm font-medium text-destructive text-left">Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold text-center">Login</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
