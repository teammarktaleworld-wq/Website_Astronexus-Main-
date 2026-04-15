import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Package, ArrowLeft, ChevronRight } from "lucide-react";
import { getMyOrders } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface Order {
  _id: string;
  totalAmount?: number;
  total?: number;
  status?: string;
  createdAt?: string;
  items?: { quantity: number; productId?: { name: string } }[];
}

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) { setLoading(false); return; }
    getMyOrders()
      .then((res) => setOrders(res.data || res.orders || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold mb-2">Sign in to view orders</h2>
          <Link to="/login" className="text-primary hover:underline">Login</Link>
        </div>
      </div>
    );
  }

  const statusColor = (s?: string) => {
    switch (s?.toLowerCase()) {
      case "delivered": return "bg-green-100 text-green-700";
      case "shipped": return "bg-blue-100 text-blue-700";
      case "cancelled": return "bg-destructive/10 text-destructive";
      default: return "bg-accent/10 text-accent-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-accent" />
            <span className="font-heading text-xl font-bold text-gradient-cosmic">ASTRONEXUS</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>

        <h1 className="font-heading text-3xl font-bold mb-8">My Orders</h1>

        {loading ? (
          <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="h-20 bg-muted rounded-xl animate-pulse" />)}</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No orders yet</p>
            <Link to="/products" className="text-primary hover:underline">Start shopping</Link>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {orders.map((order) => (
              <Link key={order._id} to={`/orders/${order._id}`} className="block bg-cosmic-card cosmic-border rounded-xl p-5 hover:border-primary/40 transition-all group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading font-semibold text-sm">Order #{order._id.slice(-8)}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ""}
                      {order.items && ` · ${order.items.length} item(s)`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {order.status && (
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor(order.status)}`}>{order.status}</span>
                    )}
                    <span className="font-bold text-accent">₹{order.totalAmount || order.total || 0}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Orders;
