import { useEffect, useState } from "react";
import { ShoppingCart, Award, Shield, CheckCircle, Gem } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ScrollReveal } from "./animations";
import { getProducts } from "@/lib/api";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category?: { _id: string; name: string } | string;
  images?: string[];
  image?: string;
}

const badges = [
  { icon: Gem, label: "Energized", sub: "Spiritually charged" },
  { icon: CheckCircle, label: "Authentic", sub: "100% genuine" },
  { icon: Shield, label: "Certified", sub: "Lab tested" },
  { icon: Award, label: "Blessed", sub: "Ritually purified" },
];

const ShopSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((res) => {
        const list = res.data || res.products || res || [];
        setProducts(list.slice(0, 12));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getCategoryName = (p: Product) => {
    if (typeof p.category === "object" && p.category?.name) return p.category.name;
    return "";
  };

  return (
    <section id="shop" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Spiritual Tools</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Astrology Products <span className="text-gradient-cosmic">Shop</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Gemstones, Rudraksha, Yantras & spiritual tools for your cosmic journey.</p>
        </ScrollReveal>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-cosmic-card cosmic-border rounded-xl p-5 animate-pulse">
                <div className="w-full h-40 bg-muted rounded-lg mb-4" />
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative group px-4 md:px-0">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 2000,
                  stopOnInteraction: false,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {products.map((product) => (
                  <CarouselItem key={product._id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <motion.div
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                      className="bg-cosmic-card cosmic-border rounded-xl group/card hover:border-primary/40 transition-all overflow-hidden h-full flex flex-col"
                    >
                      <Link to={`/products/${product._id}`} className="block flex-1">
                        <div className="relative h-40 overflow-hidden">
                          {product.images?.[0] || product.image ? (
                            <motion.img
                              src={product.images?.[0] || product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted/30">
                              <Gem className="w-10 h-10 text-primary/40" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          {getCategoryName(product) && (
                            <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full text-primary bg-primary/10 font-bold backdrop-blur-sm border border-primary/20">
                              {getCategoryName(product)}
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-heading font-semibold text-foreground text-sm mb-1 line-clamp-2 min-h-[40px]">{product.name}</h3>
                          <p className="text-accent font-bold">₹{product.price}</p>
                        </div>
                      </Link>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-cosmic-pink scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left" />
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="-left-12 bg-background/50 hover:bg-primary hover:text-primary-foreground border-primary/20 backdrop-blur-sm transition-all" />
                <CarouselNext className="-right-12 bg-background/50 hover:bg-primary hover:text-primary-foreground border-primary/20 backdrop-blur-sm transition-all" />
              </div>
            </Carousel>
          </div>
        )}

        {products.length > 0 && (
          <div className="text-center mt-12">
            <Link to="/products" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all hover-scale shadow-lg shadow-primary/20">
              <ShoppingCart className="w-4 h-4" /> View All Products
            </Link>
          </div>
        )}

        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {badges.map(({ icon: Icon, label, sub }) => (
              <motion.div
                key={label}
                className="flex items-center gap-3 bg-cosmic-card cosmic-border rounded-xl px-4 py-3 shadow-sm"
                whileHover={{ y: -4, boxShadow: "0 8px 24px hsl(var(--cosmic-gold) / 0.15)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Icon className="w-5 h-5 text-accent" />
                </motion.div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ShopSection;
