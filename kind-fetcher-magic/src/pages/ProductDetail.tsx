import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ShoppingCart, ArrowLeft, Minus, Plus, Gem } from "lucide-react";
import { getProduct, addToCart } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category?: { _id: string; name: string } | string;
  images?: string[];
  image?: string;
  stock?: number;
  [key: string]: unknown;
}

const ProductDetail = () => {
  const { productId } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);

  useEffect(() => {
    if (!productId) return;
    getProduct(productId)
      .then((res) => setProduct(res.data || res.product || res))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [productId]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!product) return;
    setAdding(true);
    try {
      await addToCart({ productId: product._id, quantity: qty });
      toast.success("Added to cart!");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to add");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Product not found</p>
          <Link to="/products" className="text-primary hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : product.image ? [product.image] : [];
  const catName = typeof product.category === "object" ? product.category?.name : product.category;

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-accent" />
            <span className="font-heading text-xl font-bold text-gradient-cosmic">ASTRONEXUS</span>
          </Link>
          <Link to="/cart" className="text-muted-foreground hover:text-foreground transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Images */}
          <div>
            <div className="bg-cosmic-card cosmic-border rounded-2xl overflow-hidden aspect-square flex items-center justify-center mb-4">
              {images.length > 0 ? (
                <img src={images[selectedImg]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <Gem className="w-20 h-20 text-primary/30" />
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden cosmic-border ${selectedImg === i ? "ring-2 ring-primary" : ""}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {catName && (
              <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{catName}</span>
            )}
            <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-accent mb-6">₹{product.price}</p>
            {product.description && (
              <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>
            )}

            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-foreground">Quantity:</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-lg cosmic-border flex items-center justify-center hover:bg-secondary transition-colors">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-8 h-8 rounded-lg cosmic-border flex items-center justify-center hover:bg-secondary transition-colors">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold glow-purple hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShoppingCart className="w-4 h-4" />
              {adding ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
