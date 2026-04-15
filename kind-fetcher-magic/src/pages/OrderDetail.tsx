import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, Package } from "lucide-react";
import { getOrder } from "@/lib/api";

interface OrderData {
  _id: string;
  totalAmount?: number;
  total?: number;
  status?: string;
  createdAt?: string;
  items?: { quantity: number; price?: number; productId?: { _id: string; name: string; price: number; images?: string[] } }[];
  shippingAddress?: Record<string, string>;
  [key: string]: unknown;
}

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    getOrder(orderId)
      .then((res) => setOrder(res.data || res.order || res))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (!order) return <div className="min-h-screen bg-background flex items-center justify-center"><p>Order not found. <Link to="/orders" className="text-primary">Back</Link></p></div>;

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
        <Link to="/orders" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> My Orders
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-2xl font-bold">Order #{order._id.slice(-8)}</h1>
              <p className="text-sm text-muted-foreground">{order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" }) : ""}</p>
            </div>
            {order.status && (
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">{order.status}</span>
            )}
          </div>

          {order.items && order.items.length > 0 && (
            <div className="bg-cosmic-card cosmic-border rounded-xl divide-y divide-border mb-6">
              {order.items.map((item, i) => (
                <div key={i} className="p-4 flex items-center gap-4">
                  <Package className="w-8 h-8 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.productId?.name || "Product"}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-accent text-sm">₹{item.price || item.productId?.price || 0}</span>
                </div>
              ))}
            </div>
          )}

          <div className="bg-cosmic-card cosmic-border rounded-xl p-5">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-accent">₹{order.totalAmount || order.total || 0}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderDetail;
