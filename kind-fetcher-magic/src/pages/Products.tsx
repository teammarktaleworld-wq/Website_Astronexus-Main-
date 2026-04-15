import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gem, ShoppingCart, Filter } from "lucide-react";
import logoImg from "@/assets/logo-astronexus-full.png";
import { getProducts, getCategories } from "@/lib/api";
import { StaggerContainer, StaggerItem } from "@/components/animations";

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category?: { _id: string; name: string } | string;
  images?: string[];
  image?: string;
}

interface Category {
  _id: string;
  name: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([pRes, cRes]) => {
        setProducts(pRes.data || pRes.products || pRes || []);
        setCategories(cRes.data || cRes.categories || cRes || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = selectedCat
    ? products.filter((p) => {
        const cat = typeof p.category === "object" ? p.category?._id : p.category;
        return cat === selectedCat;
      })
    : products;

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logoImg} alt="AstroNexus" className="h-9 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/cart" className="text-muted-foreground hover:text-foreground transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </Link>
            <Link to="/login" className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Spiritual Store</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Shop <span className="text-gradient-cosmic">Products</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Discover authentic gemstones, rudraksha, yantras & spiritual tools.</p>
        </motion.div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            <button
              onClick={() => setSelectedCat("")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedCat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
            >
              <Filter className="w-3.5 h-3.5 inline mr-1.5" /> All
            </button>
            {categories.map((c) => (
              <button
                key={c._id}
                onClick={() => setSelectedCat(c._id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCat === c._id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-cosmic-card cosmic-border rounded-xl p-5 animate-pulse">
                <div className="w-full h-32 bg-muted rounded-lg mb-4" />
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No products found.</p>
        ) : (
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <StaggerItem key={product._id}>
                <Link to={`/products/${product._id}`} className="block">
                  <div className="bg-cosmic-card cosmic-border rounded-xl p-5 group hover:border-primary/40 hover:shadow-lg transition-all hover-scale">
                    <div className="w-full h-32 flex items-center justify-center mb-4 overflow-hidden rounded-lg bg-muted/30">
                      {product.images?.[0] || product.image ? (
                        <img
                          src={product.images?.[0] || product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <Gem className="w-10 h-10 text-primary/40" />
                      )}
                    </div>
                    <h3 className="font-heading font-semibold text-foreground text-sm mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-accent font-bold">₹{product.price}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </div>
  );
};

export default Products;
