import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, CreditCard } from "lucide-react";
import { getCart, getAddresses, placeOrder } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Address { _id: string; addressLine1?: string; street?: string; city?: string; state?: string; pincode?: string; label?: string; }
interface CartItem { productId: { _id: string; name: string; price: number } | string; quantity: number; price?: number; }

const Checkout = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedAddr, setSelectedAddr] = useState("");
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) { navigate("/login"); return; }
    Promise.all([getCart(), getAddresses()])
      .then(([cRes, aRes]) => {
        setItems(cRes.data?.items || cRes.cart?.items || cRes.items || []);
        const addrs = aRes.data || aRes.addresses || [];
        setAddresses(addrs);
        if (addrs.length > 0) setSelectedAddr(addrs[0]._id);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isAuthenticated, navigate]);

  const total = items.reduce((sum, item) => {
    const price = typeof item.productId === "object" ? item.productId.price : (item.price || 0);
    return sum + price * item.quantity;
  }, 0);

  const handlePlaceOrder = async () => {
    if (!selectedAddr) { toast.error("Select an address"); return; }
    setPlacing(true);
    try {
      await placeOrder({ addressId: selectedAddr });
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Order failed");
    } finally {
      setPlacing(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-accent" />
            <span className="font-heading text-xl font-bold text-gradient-cosmic">ASTRONEXUS</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold mb-8">Checkout</h1>

          {/* Address Selection */}
          <div className="mb-8">
            <h2 className="font-heading text-lg font-semibold mb-4">Delivery Address</h2>
            {addresses.length === 0 ? (
              <div className="bg-cosmic-card cosmic-border rounded-xl p-5 text-center">
                <p className="text-muted-foreground mb-3">No addresses saved</p>
                <Link to="/addresses" className="text-primary hover:underline text-sm">Add an address</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <label key={addr._id} className={`block bg-cosmic-card cosmic-border rounded-xl p-4 cursor-pointer transition-all ${selectedAddr === addr._id ? "border-primary ring-2 ring-primary/20" : ""}`}>
                    <input type="radio" name="address" value={addr._id} checked={selectedAddr === addr._id} onChange={() => setSelectedAddr(addr._id)} className="sr-only" />
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedAddr === addr._id ? "border-primary" : "border-muted-foreground"}`}>
                        {selectedAddr === addr._id && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <div>
                        {addr.label && <span className="text-xs font-medium text-primary">{addr.label}</span>}
                        <p className="text-sm">{addr.addressLine1 || addr.street}</p>
                        <p className="text-xs text-muted-foreground">{[addr.city, addr.state, addr.pincode].filter(Boolean).join(", ")}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-cosmic-card cosmic-border rounded-xl p-6">
            <h2 className="font-heading text-lg font-semibold mb-4">Order Summary</h2>
            <div className="divide-y divide-border mb-4">
              {items.map((item, i) => {
                const name = typeof item.productId === "object" ? item.productId.name : "Product";
                const price = typeof item.productId === "object" ? item.productId.price : (item.price || 0);
                return (
                  <div key={i} className="py-3 flex justify-between text-sm">
                    <span>{name} × {item.quantity}</span>
                    <span className="font-semibold">₹{price * item.quantity}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-border pt-4">
              <span>Total</span>
              <span className="text-accent">₹{total}</span>
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={placing || !selectedAddr}
              className="w-full mt-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold glow-purple hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CreditCard className="w-4 h-4" />
              {placing ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
