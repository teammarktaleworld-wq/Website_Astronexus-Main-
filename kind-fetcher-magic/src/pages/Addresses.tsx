import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, MapPin, Plus, Trash2, Edit, X } from "lucide-react";
import { getAddresses, addAddress, updateAddress, deleteAddress } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Address {
  _id: string;
  street?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  pincode?: string;
  zipCode?: string;
  country?: string;
  label?: string;
  [key: string]: unknown;
}

const emptyForm = { fullName: "", phone: "", street: "", addressLine1: "", city: "", state: "", pincode: "", postalCode: "", country: "India", label: "Home" };

const Addresses = () => {
  const { isAuthenticated } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => {
    getAddresses()
      .then((res) => {
        console.log("getAddresses response:", JSON.stringify(res));
        const addrs = res.data || res.addresses || res.address || [];
        // Handle if response is the array itself
        setAddresses(Array.isArray(addrs) ? addrs : Array.isArray(res) ? res : []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (isAuthenticated) load();
    else setLoading(false);
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateAddress(editId, form);
        toast.success("Address updated");
      } else {
        await addAddress(form);
        toast.success("Address added");
      }
      setShowForm(false);
      setEditId(null);
      setForm(emptyForm);
      load();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a._id !== id));
      toast.success("Address deleted");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed");
    }
  };

  const startEdit = (addr: Address) => {
    setForm({
      fullName: (addr as Record<string, unknown>).fullName as string || "",
      phone: (addr as Record<string, unknown>).phone as string || "",
      street: addr.street || addr.addressLine1 || "",
      addressLine1: addr.addressLine1 || addr.street || "",
      city: addr.city || "",
      state: addr.state || "",
      pincode: addr.pincode || addr.zipCode || "",
      postalCode: addr.zipCode || addr.pincode || "",
      country: addr.country || "India",
      label: addr.label || "Home",
    });
    setEditId(addr._id);
    setShowForm(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold mb-2">Sign in to manage addresses</h2>
          <Link to="/login" className="text-primary hover:underline">Login</Link>
        </div>
      </div>
    );
  }

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
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>

        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-3xl font-bold">My Addresses</h1>
          <button
            onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-cosmic-card cosmic-border rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold">{editId ? "Edit Address" : "New Address"}</h3>
              <button onClick={() => { setShowForm(false); setEditId(null); }}><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground mb-1 block">Full Name *</label>
                  <input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-background cosmic-border text-sm" placeholder="Your full name" />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1 block">Phone *</label>
                  <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-background cosmic-border text-sm" placeholder="+91 9876543210" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground mb-1 block">Label</label>
                  <select value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-background cosmic-border text-sm">
                    <option>Home</option><option>Office</option><option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1 block">Country</label>
                  <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-background cosmic-border text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1 block">Street Address *</label>
                <input required value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value, addressLine1: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-background cosmic-border text-sm" placeholder="Street, building..." />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground mb-1 block">City *</label>
                  <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-background cosmic-border text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1 block">State *</label>
                  <input required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-background cosmic-border text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1 block">Postal Code *</label>
                  <input required value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value, pincode: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-background cosmic-border text-sm" />
                </div>
              </div>
              <button type="submit" className="py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all">
                {editId ? "Update Address" : "Save Address"}
              </button>
            </form>
          </motion.div>
        )}

        {loading ? (
          <div className="space-y-4">{[1, 2].map((i) => <div key={i} className="h-20 bg-muted rounded-xl animate-pulse" />)}</div>
        ) : addresses.length === 0 ? (
          <div className="text-center py-20">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No addresses saved yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div key={addr._id} className="bg-cosmic-card cosmic-border rounded-xl p-5 flex items-start justify-between">
                <div>
                  {addr.label && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{addr.label}</span>}
                  <p className="text-sm mt-2">{addr.addressLine1 || addr.street}</p>
                  <p className="text-xs text-muted-foreground">{[addr.city, addr.state, addr.pincode || addr.zipCode].filter(Boolean).join(", ")}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(addr)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button onClick={() => handleDelete(addr._id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Addresses;
