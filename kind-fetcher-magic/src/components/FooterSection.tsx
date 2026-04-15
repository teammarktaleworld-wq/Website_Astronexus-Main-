import { Instagram, Twitter, Youtube, Mail, ArrowRight } from "lucide-react";
import logoImg from "@/assets/logo-astronexus-full.png";
import { motion } from "framer-motion";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Zodiac", href: "#zodiac" },
  { label: "Services", href: "#services" },
  { label: "AI Guide", href: "#mati" },
  { label: "Pricing", href: "#pricing" },
];

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
  { icon: Mail, href: "#", label: "Email" },
];

const FooterSection = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Gradient top border */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="bg-gradient-to-b from-card to-background py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* CTA Banner */}
          <motion.div
            className="bg-gradient-to-r from-primary via-cosmic-indigo to-primary rounded-2xl p-8 md:p-12 text-center mb-16 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 star-field opacity-30" />
            <div className="relative z-10">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
                Ready to Unlock Your Cosmic Destiny?
              </h3>
              <p className="text-primary-foreground/70 mb-6 max-w-lg mx-auto">
                Join 15,000+ souls already on their cosmic journey with AstroNexus.
              </p>
              <motion.a
                href="#pricing"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-accent-foreground font-bold text-sm shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 8px 30px hsl(var(--cosmic-gold) / 0.4)" }}
                whileTap={{ scale: 0.97 }}
              >
                Start Free Reading <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Footer content */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="mb-4">
                <img src={logoImg} alt="AstroNexus" className="h-10 w-auto" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Where ancient cosmic wisdom meets cutting-edge AI. Your journey to stellar enlightenment starts here.
              </p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:bg-primary transition-all"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>

              {/* App download buttons in footer */}
              <div className="mt-8 flex flex-col gap-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Get the App</p>
                <div className="flex flex-wrap gap-3">
                  <a href="#" className="flex items-center gap-2 bg-[#000000] text-white px-4 py-1.5 rounded-lg border border-white/10 hover:bg-[#111111] transition-all hover-scale shadow-md">
                    <svg viewBox="0 0 384 512" className="w-4 h-4 fill-current"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
                    <div className="text-left">
                      <p className="text-[8px] uppercase leading-none opacity-70">Download on</p>
                      <p className="text-[11px] font-bold leading-none mt-0.5">App Store</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-2 bg-[#000000] text-white px-4 py-1.5 rounded-lg border border-white/10 hover:bg-[#111111] transition-all hover-scale shadow-md">
                    <svg viewBox="0 0 512 512" className="w-4 h-4"><path fill="#3bccff" d="M10.3 33.3c-1.3 1.5-2.1 3.8-2.1 6.8v431.8c0 3 .8 5.4 2.1 6.8l2.2 2.2L251.4 256.3V255.7L12.5 31.1l-2.2 2.2z" /><path fill="#ffd400" d="M344 349.5l-92.6-93.5V255.7L344 162.5l1.6.9 109.8 62.4c31.1 17.7 31.1 46.5 0 64.2l-109.8 62.4c-1.6 1.1-1.6 1.1-1.6 1.1z" /><path fill="#ff3333" d="M345.6 162.5l-94.2 93.2L12.5 31.1l-2.2 2.2c4.4 5 133.4 75.5 335.3 129.2z" /><path fill="#48ff48" d="M345.6 349.5c-201.1 114.3-330.1 187.5-335.3 192.5l2.2 2.2 238.9-236.1 94.2 93.2v-11.8z" /></svg>
                    <div className="text-left">
                      <p className="text-[8px] uppercase leading-none opacity-70">Get it on</p>
                      <p className="text-[11px] font-bold leading-none mt-0.5">Google Play</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-bold text-foreground mb-4">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                {footerLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                    whileHover={{ x: 4 }}
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-heading font-bold text-foreground mb-4">Cosmic Updates</h4>
              <p className="text-sm text-muted-foreground mb-4">Get weekly cosmic insights delivered to your inbox.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-secondary text-foreground text-sm border border-border focus:border-primary focus:outline-none transition-colors"
                />
                <motion.button
                  className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2025 AstroNexus. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
