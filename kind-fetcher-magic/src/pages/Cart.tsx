import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { getCart, updateCart, removeFromCart } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface CartItem {
  productId: { _id: string; name: string; price: number; images?: string[]; image?: string } | string;
  quantity: number;
  price?: number;
  _id?: string;
}

const Cart = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) { setLoading(false); return; }
    getCart()
      .then((res) => setItems(res.data?.items || res.cart?.items || res.items || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const getProductInfo = (item: CartItem) => {
    if (typeof item.productId === "object" && item.productId !== null) return item.productId;
    return { _id: (item.productId || item._id || "") as string, name: (item as unknown as Record<string, unknown>).name as string || "Unknown Product", price: item.price || 0 };
  };

  const handleUpdate = async (productId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
        setItems((prev) => prev.filter((i) => getProductInfo(i)._id !== productId));
        toast.success("Removed from cart");
      } else {
        await updateCart({ productId, quantity });
        setItems((prev) => prev.map((i) => getProductInfo(i)._id === productId ? { ...i, quantity } : i));
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  };

  const total = items.reduce((sum, item) => {
    const p = getProductInfo(item);
    return sum + (p.price || 0) * item.quantity;
  }, 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold mb-2">Sign in to view your cart</h2>
          <Link to="/login" className="text-primary hover:underline">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-accent" />
            <span className="font-heading text-xl font-bold text-gradient-cosmic">ASTRONEXUS</span>
          </Link>
          <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground">Continue Shopping</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <h1 className="font-heading text-3xl font-bold mb-8">Your Cart</h1>

        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2].map((i) => <div key={i} className="h-24 bg-muted rounded-xl" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Link to="/products" className="text-primary hover:underline">Browse products</Link>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {items.map((item, idx) => {
              const p = getProductInfo(item);
              const img = typeof item.productId === "object" ? (item.productId.images?.[0] || item.productId.image) : undefined;
              return (
                <div key={p._id || idx} className="bg-cosmic-card cosmic-border rounded-xl p-4 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-muted/30 overflow-hidden flex-shrink-0">
                    {img ? <img src={img} alt={p.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-muted" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-sm truncate">{p.name}</h3>
                    <p className="text-accent font-bold text-sm">₹{p.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleUpdate(p._id, item.quantity - 1)} className="w-7 h-7 rounded cosmic-border flex items-center justify-center hover:bg-secondary">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => handleUpdate(p._id, item.quantity + 1)} className="w-7 h-7 rounded cosmic-border flex items-center justify-center hover:bg-secondary">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button onClick={() => handleUpdate(p._id, 0)} className="text-destructive hover:text-destructive/80">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}

            <div className="bg-cosmic-card cosmic-border rounded-xl p-6 mt-6">
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>Total</span>
                <span className="text-accent">₹{total}</span>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold glow-purple hover:opacity-90 transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;
