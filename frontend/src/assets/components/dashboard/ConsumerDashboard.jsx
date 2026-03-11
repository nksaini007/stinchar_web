// import React, { useEffect, useMemo, useState, useContext } from "react";
// import API from "../../api/api";
// import { motion } from "framer-motion";
// import Nev from "../Nev";
// import { AuthContext } from "../../context/AuthContext";
// import {
//   FaTruck,
//   FaBoxOpen,
//   FaCheckCircle,
//   FaClock,
//   FaQuestionCircle,
//   FaHeart,
//   FaUser,
//   FaCogs,
//   FaSignOutAlt,
//   FaList,
//   FaSearch,
//   FaTimesCircle,
//   FaMapMarkerAlt,
//   FaPhone,
//   FaArrowRight,
// } from "react-icons/fa";

// /* ---- Design tokens ---- */
// const tokens = {
//   bg: "bg-[#f6f8fb]",
//   surface: "bg-white",
//   softBorder: "border border-[#e6e9ef]",
//   shadowSoft: "shadow-[10px_10px_20px_rgba(163,177,198,0.18)]",
//   rounded: "rounded-2xl",
//   accent: "text-[#7c83ff]",
//   subtleText: "text-[#6b7280]",
//   pill: "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm",
// };

// /* ---- Status helpers ---- */
// const STATUS_META = {
//   pending: { label: "Pending", color: "text-[#f59e0b]", bg: "bg-[#fff7ed]", bar: "bg-[#f59e0b]", icon: <FaClock className="text-[#f59e0b]" /> },
//   confirmed: { label: "Confirmed", color: "text-[#6366f1]", bg: "bg-[#eef2ff]", bar: "bg-[#6366f1]", icon: <FaCheckCircle className="text-[#6366f1]" /> },
//   processing: { label: "Processing", color: "text-[#8b5cf6]", bg: "bg-[#f5f3ff]", bar: "bg-[#8b5cf6]", icon: <FaCogs className="text-[#8b5cf6]" /> },
//   shipped: { label: "Shipped", color: "text-[#3b82f6]", bg: "bg-[#eff6ff]", bar: "bg-[#3b82f6]", icon: <FaTruck className="text-[#3b82f6]" /> },
//   "out for delivery": { label: "Out for Delivery", color: "text-[#f97316]", bg: "bg-[#fff7ed]", bar: "bg-[#f97316]", icon: <FaTruck className="text-[#f97316]" /> },
//   delivered: { label: "Delivered", color: "text-[#10b981]", bg: "bg-[#ecfdf5]", bar: "bg-[#10b981]", icon: <FaCheckCircle className="text-[#10b981]" /> },
//   cancelled: { label: "Cancelled", color: "text-[#ef4444]", bg: "bg-[#fff1f2]", bar: "bg-[#ef4444]", icon: <FaTimesCircle className="text-[#ef4444]" /> },
//   returned: { label: "Returned", color: "text-[#6b7280]", bg: "bg-[#f3f4f6]", bar: "bg-[#6b7280]", icon: <FaBoxOpen className="text-[#6b7280]" /> },
//   unknown: { label: "Unknown", color: "text-[#9ca3af]", bg: "bg-[#f3f4f6]", bar: "bg-[#9ca3af]", icon: <FaQuestionCircle className="text-[#9ca3af]" /> },
// };

// const statusProgress = (s) => {
//   const map = { pending: 10, confirmed: 25, processing: 40, shipped: 55, "out for delivery": 75, delivered: 100, cancelled: 0 };
//   return map[(s || "").toLowerCase()] || 15;
// };

// const statusMeta = (s) => STATUS_META[(s || "unknown").toLowerCase()] || STATUS_META.unknown;

// /* ---- Component ---- */
// const ConsumerDashboard = () => {
//   const { user, logout } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("orders");
//   const [query, setQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("date_desc");
//   const [cancellingId, setCancellingId] = useState(null);
//   const [expandedId, setExpandedId] = useState(null);
//   const [spending, setSpending] = useState(null);

//   const fetchOrders = async () => {
//     try {
//       const { data } = await API.get("/orders/myorders");
//       setOrders(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch your orders.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSpending = async () => {
//     try {
//       const { data } = await API.get("/payments/customer/spending");
//       setSpending(data);
//     } catch (err) {
//       console.error("Spending fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//     fetchSpending();
//   }, []);

//   const handleCancel = async (orderId) => {
//     if (!window.confirm("Are you sure you want to cancel this order?")) return;
//     try {
//       setCancellingId(orderId);
//       await API.put(`/orders/cancel/${orderId}`);
//       await fetchOrders();
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to cancel order");
//     } finally {
//       setCancellingId(null);
//     }
//   };

//   const metrics = useMemo(() => {
//     const total = orders.length;
//     const delivered = orders.filter((o) => (o.orderStatus || "").toLowerCase() === "delivered").length;
//     const inProgress = orders.filter((o) => !["delivered", "cancelled"].includes((o.orderStatus || "").toLowerCase())).length;
//     const spend = orders.reduce((sum, o) => sum + (Number(o.totalPrice) || 0), 0);
//     return { total, delivered, inProgress, spend };
//   }, [orders]);

//   const visibleOrders = useMemo(() => {
//     let list = [...orders];
//     if (statusFilter !== "all") list = list.filter((o) => (o.orderStatus || "").toLowerCase() === statusFilter);
//     if (query.trim()) {
//       const q = query.toLowerCase();
//       list = list.filter((o) => {
//         const id = (o._id || "").toLowerCase();
//         const items = (o.orderItems || []).map((i) => i.name?.toLowerCase() || "");
//         return id.includes(q) || items.some((n) => n.includes(q));
//       });
//     }
//     list.sort((a, b) => {
//       const da = new Date(a.createdAt || 0).getTime();
//       const db = new Date(b.createdAt || 0).getTime();
//       if (sortBy === "date_desc") return db - da;
//       if (sortBy === "date_asc") return da - db;
//       if (sortBy === "amount_desc") return (Number(b.totalPrice) || 0) - (Number(a.totalPrice) || 0);
//       if (sortBy === "amount_asc") return (Number(a.totalPrice) || 0) - (Number(b.totalPrice) || 0);
//       return 0;
//     });
//     return list;
//   }, [orders, query, statusFilter, sortBy]);

//   return (
//     <div className={`${tokens.bg} min-h-screen antialiased`}>
//       <Nev />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl font-semibold text-[#111827]">Welcome back, {user?.name || "User"}</h1>
//             <p className={`${tokens.subtleText} mt-1`}>Your orders & account at a glance.</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className={`${tokens.surface} ${tokens.softBorder} ${tokens.rounded} px-3 py-2 flex items-center gap-2`}>
//               <FaSearch className="text-[#9aa3bf]" />
//               <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search orders..."
//                 className="bg-transparent outline-none text-sm placeholder:text-[#9aa3bf] w-40" />
//             </div>
//           </div>
//         </div>

//         {/* Metrics */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
//           {[
//             { label: "Total Orders", value: metrics.total, color: "from-[#e8f0ff] to-[#f0e6ff]" },
//             { label: "In Progress", value: metrics.inProgress, color: "from-[#fff7ed] to-[#fef3c7]" },
//             { label: "Delivered", value: metrics.delivered, color: "from-[#ecfdf5] to-[#d1fae5]" },
//             { label: "Total Spend", value: `₹${metrics.spend.toLocaleString()}`, color: "from-[#fce7f3] to-[#ede9fe]" },
//             { label: "Pending Payments", value: spending ? `₹${spending.pendingAmount?.toLocaleString()}` : "—", color: "from-[#fef3c7] to-[#ffedd5]" },
//           ].map((m, idx) => (
//             <motion.div key={idx} whileHover={{ y: -3 }}
//               className={`bg-gradient-to-br ${m.color} p-5 ${tokens.rounded} ${tokens.softBorder}`}>
//               <p className="text-xs text-[#6b7280] font-medium">{m.label}</p>
//               <p className="text-2xl font-bold text-[#111827] mt-1">{m.value}</p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Filters */}
//         <div className="flex flex-wrap items-center gap-2 mb-6">
//           {["all", "pending", "confirmed", "shipped", "out for delivery", "delivered", "cancelled"].map((s) => (
//             <button key={s} onClick={() => setStatusFilter(s)}
//               className={`px-3 py-1.5 rounded-xl text-sm font-medium capitalize transition-all ${statusFilter === s ? "bg-[#111827] text-white" : "bg-white border border-[#e6e9ef] text-[#6b7280] hover:bg-[#f3f4f6]"
//                 }`}>
//               {s === "all" ? "All" : s}
//             </button>
//           ))}
//           <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
//             className="ml-auto px-3 py-1.5 rounded-xl border border-[#e6e9ef] text-sm bg-white outline-none">
//             <option value="date_desc">Newest</option>
//             <option value="date_asc">Oldest</option>
//             <option value="amount_desc">Amount ↓</option>
//             <option value="amount_asc">Amount ↑</option>
//           </select>
//         </div>

//         {/* Orders */}
//         {loading ? (
//           <div className="flex justify-center py-16">
//             <div className="w-8 h-8 border-4 border-[#7c83ff]/20 border-t-[#7c83ff] rounded-full animate-spin" />
//           </div>
//         ) : error ? (
//           <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-red-600">{error}</div>
//         ) : visibleOrders.length === 0 ? (
//           <div className="text-center py-16 text-[#9aa3bf]">
//             <FaBoxOpen className="text-4xl mx-auto mb-3 opacity-40" />
//             <p className="text-lg">No orders found</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {visibleOrders.map((order) => {
//               const meta = statusMeta(order.orderStatus);
//               const progress = statusProgress(order.orderStatus);
//               const created = order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";
//               const isExpanded = expandedId === order._id;
//               const canCancel = ["Pending", "Confirmed"].includes(order.orderStatus);

//               return (
//                 <motion.div key={order._id} layout className={`${tokens.surface} ${tokens.softBorder} ${tokens.rounded} overflow-hidden hover:shadow-lg transition-shadow`}>
//                   {/* Order Header */}
//                   <div className="p-5 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : order._id)}>
//                     <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 flex-wrap">
//                           <span className="text-sm font-mono font-semibold text-[#111827]">#{order._id.slice(-8).toUpperCase()}</span>
//                           <span className={`${meta.bg} px-2.5 py-0.5 text-xs rounded-full flex items-center gap-1.5`}>
//                             {meta.icon} <span className={meta.color}>{meta.label}</span>
//                           </span>
//                           <span className="text-xs text-[#9aa3bf]">{created}</span>
//                         </div>

//                         {/* Items preview */}
//                         <div className="mt-2 flex flex-wrap gap-2">
//                           {(order.orderItems || []).slice(0, 3).map((item, i) => (
//                             <div key={i} className="flex items-center gap-2 bg-[#f9fafb] px-2.5 py-1.5 rounded-lg">
//                               {item.image && (
//                                 <img
//                                   src={item.image.startsWith("http") ? item.image : `${item.image}`}
//                                   alt={item.name}
//                                   className="w-8 h-8 rounded object-cover"
//                                   onError={(e) => { e.currentTarget.style.display = "none"; }}
//                                 />
//                               )}
//                               <span className="text-xs text-[#374151]">{item.name} × {item.qty}</span>
//                             </div>
//                           ))}
//                           {order.orderItems?.length > 3 && (
//                             <span className="text-xs text-[#9aa3bf] self-center">+{order.orderItems.length - 3} more</span>
//                           )}
//                         </div>
//                       </div>

//                       <div className="text-right flex-shrink-0">
//                         <p className="text-lg font-bold text-[#111827]">₹{order.totalPrice?.toLocaleString()}</p>
//                         <p className="text-xs text-[#9aa3bf]">{order.paymentMethod} {order.isPaid ? "• Paid" : ""}</p>
//                       </div>
//                     </div>

//                     {/* Progress bar */}
//                     <div className="mt-3">
//                       <div className="h-1.5 w-full bg-[#f1f5f9] rounded-full overflow-hidden">
//                         <div className={`${meta.bar} h-full rounded-full transition-all duration-500`} style={{ width: `${progress}%` }} />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Expanded Details */}
//                   {isExpanded && (
//                     <div className="border-t border-[#e6e9ef] px-5 py-4 bg-[#fafbfc] space-y-4">
//                       {/* Shipping Address */}
//                       {order.shippingAddress && (
//                         <div className="flex items-start gap-3 text-sm text-[#374151]">
//                           <FaMapMarkerAlt className="text-[#7c83ff] mt-0.5 flex-shrink-0" />
//                           <div>
//                             <p className="font-medium">{order.shippingAddress.fullName}</p>
//                             <p className="text-[#6b7280]">{order.shippingAddress.address}, {order.shippingAddress.city} — {order.shippingAddress.postalCode}</p>
//                             {order.shippingAddress.phone && (
//                               <p className="text-[#6b7280] flex items-center gap-1 mt-1">
//                                 <FaPhone className="text-xs" /> {order.shippingAddress.phone}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       )}

//                       {/* Delivery Person */}
//                       {order.deliveryPerson && (
//                         <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-xl">
//                           <FaTruck className="text-blue-500" />
//                           <div>
//                             <p className="text-sm font-semibold text-blue-800">
//                               Delivery Partner: {typeof order.deliveryPerson === "object" ? order.deliveryPerson.name : "Assigned"}
//                             </p>
//                             {typeof order.deliveryPerson === "object" && order.deliveryPerson.phone && (
//                               <p className="text-xs text-blue-600">📞 {order.deliveryPerson.phone}</p>
//                             )}
//                           </div>
//                         </div>
//                       )}

//                       {/* Tracking Timeline */}
//                       {order.tracking && order.tracking.length > 0 && (
//                         <div>
//                           <p className="text-xs font-semibold text-[#6b7280] mb-2 uppercase tracking-wider">Order Timeline</p>
//                           <div className="flex items-center gap-2 flex-wrap">
//                             {order.tracking.map((t, idx) => (
//                               <div key={idx} className="flex items-center gap-2 text-xs">
//                                 <div className={`w-2 h-2 rounded-full ${idx === order.tracking.length - 1 ? "bg-[#7c83ff]" : "bg-[#d1d5db]"}`} />
//                                 <span className="text-[#374151]">{t.status}</span>
//                                 <span className="text-[#9ca3af]">
//                                   {t.date && new Date(t.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
//                                 </span>
//                                 {idx < order.tracking.length - 1 && <FaArrowRight className="text-[#d1d5db] text-[10px]" />}
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {/* Actions */}
//                       <div className="flex items-center gap-3 pt-2">
//                         {canCancel && (
//                           <button
//                             onClick={(e) => { e.stopPropagation(); handleCancel(order._id); }}
//                             disabled={cancellingId === order._id}
//                             className="px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm font-medium hover:bg-red-100 transition disabled:opacity-50"
//                           >
//                             {cancellingId === order._id ? "Cancelling..." : "Cancel Order"}
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </motion.div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ConsumerDashboard;
import React, { useEffect, useMemo, useState, useContext } from "react";
import API from "../../api/api";
import { motion, AnimatePresence } from "framer-motion";
import Nev from "../Nev";
import { AuthContext } from "../../context/AuthContext";
import {
  FaTruck,
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaCogs,
  FaSearch,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaChevronDown,
  FaChevronUp,
  FaCalendarAlt,
  FaCreditCard,
} from "react-icons/fa";

/* ---- Design System Tokens ---- */
const tokens = {
  bg: "bg-[#F8FAFC]", // Very light slate
  surface: "bg-white",
  border: "border-slate-200/60",
  shadow: "shadow-sm hover:shadow-md transition-all duration-300",
  textPrimary: "text-slate-900",
  textSecondary: "text-slate-500",
  accent: "bg-indigo-600",
};

/* ---- Status Configuration ---- */
const STATUS_CONFIG = {
  pending: { label: "Pending", color: "text-amber-600", bg: "bg-amber-50", bar: "bg-amber-500", icon: <FaClock /> },
  confirmed: { label: "Confirmed", color: "text-blue-600", bg: "bg-blue-50", bar: "bg-blue-500", icon: <FaCheckCircle /> },
  processing: { label: "Processing", color: "text-violet-600", bg: "bg-violet-50", bar: "bg-violet-500", icon: <FaCogs /> },
  shipped: { label: "Shipped", color: "text-indigo-600", bg: "bg-indigo-50", bar: "bg-indigo-500", icon: <FaTruck /> },
  delivered: { label: "Delivered", color: "text-emerald-600", bg: "bg-emerald-50", bar: "bg-emerald-500", icon: <FaCheckCircle /> },
  cancelled: { label: "Cancelled", color: "text-rose-600", bg: "bg-rose-50", bar: "bg-rose-500", icon: <FaTimesCircle /> },
  unknown: { label: "Status Update", color: "text-slate-600", bg: "bg-slate-50", bar: "bg-slate-400", icon: <FaBoxOpen /> },
};

const getStatusMeta = (s) => STATUS_CONFIG[(s || "unknown").toLowerCase()] || STATUS_CONFIG.unknown;

const ConsumerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date_desc");
  const [expandedId, setExpandedId] = useState(null);
  const [spending, setSpending] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ordersRes, spendRes] = await Promise.all([
          API.get("/orders/myorders"),
          API.get("/payments/customer/spending"),
        ]);
        setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
        setSpending(spendRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const metrics = useMemo(() => {
    const total = orders.length;
    const delivered = orders.filter((o) => o.orderStatus?.toLowerCase() === "delivered").length;
    const active = orders.filter((o) => !["delivered", "cancelled"].includes(o.orderStatus?.toLowerCase())).length;
    const spend = orders.reduce((sum, o) => sum + (Number(o.totalPrice) || 0), 0);
    return { total, delivered, active, spend };
  }, [orders]);

  const visibleOrders = useMemo(() => {
    let list = orders.filter((o) => {
      const matchStatus = statusFilter === "all" || o.orderStatus?.toLowerCase() === statusFilter;
      const matchQuery = (o._id + (o.orderItems?.map(i => i.name).join(''))).toLowerCase().includes(query.toLowerCase());
      return matchStatus && matchQuery;
    });
    return list.sort((a, b) => {
      if (sortBy === "date_desc") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "amount_desc") return b.totalPrice - a.totalPrice;
      return 0;
    });
  }, [orders, query, statusFilter, sortBy]);

  return (
    <div className={`${tokens.bg} min-h-screen pb-12`}>
      <Nev />

      <main className="max-w-6xl mx-auto px-4 pt-24 sm:pt-28">
        {/* Welcome Header */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Hello, {user?.name?.split(" ")[0] || "User"} 👋
            </h1>
            <p className="text-slate-500 text-sm mt-1">Here's what's happening with your orders.</p>
          </div>
          <div className="relative w-full md:w-72">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search by ID or Item..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </header>

        {/* Dynamic Metric Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-10">
          {[
            { label: "Active Orders", val: metrics.active, bg: "bg-indigo-600", text: "text-white" },
            { label: "Delivered", val: metrics.delivered, bg: "bg-white", text: "text-slate-900" },
            { label: "Total Spent", val: `₹${metrics.spend.toLocaleString()}`, bg: "bg-white", text: "text-slate-900" },
            { label: "To be Paid", val: spending ? `₹${spending.pendingAmount?.toLocaleString()}` : "₹0", bg: "bg-white", text: "text-rose-600" },
          ].map((card, i) => (
            <div key={i} className={`${card.bg} ${tokens.border} p-4 sm:p-6 rounded-[2rem] shadow-sm`}>
              <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-70 ${card.text}`}>{card.label}</p>
              <h3 className={`text-xl sm:text-2xl font-black mt-1 ${card.text}`}>{card.val}</h3>
            </div>
          ))}
        </section>

        {/* Tab Filters - Scrollable on mobile */}
        <section className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2 w-full sm:w-auto no-scrollbar mask-fade-right">
            {["all", "pending", "shipped", "delivered"].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-5 py-2 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-all ${
                  statusFilter === tab ? "bg-slate-900 text-white" : "bg-white text-slate-500 border border-slate-200 hover:border-slate-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <select 
            className="w-full sm:w-auto bg-white border border-slate-200 text-xs font-bold px-4 py-2 rounded-full outline-none focus:border-indigo-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date_desc">Latest First</option>
            <option value="amount_desc">Highest Price</option>
          </select>
        </section>

        {/* Order Cards */}
        {loading ? (
          <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="space-y-4">
            {visibleOrders.map((order) => {
              const meta = getStatusMeta(order.orderStatus);
              const isExpanded = expandedId === order._id;

              return (
                <motion.div
                  layout
                  key={order._id}
                  className={`bg-white border ${tokens.border} rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden ${tokens.shadow}`}
                >
                  {/* Summary Header */}
                  <div className="p-4 sm:p-6 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : order._id)}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Order ID</span>
                        <h4 className="text-sm sm:text-base font-mono font-bold text-slate-900 leading-none">
                          #{order._id.slice(-10).toUpperCase()}
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Total Amount</span>
                        <p className="text-lg font-black text-slate-900 leading-none">₹{order.totalPrice?.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${meta.bg} ${meta.color} text-[10px] font-black uppercase`}>
                        {meta.icon} <span>{meta.label}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                        <FaCalendarAlt />
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-100 bg-slate-50/50"
                      >
                        <div className="p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Item List */}
                          <div>
                            <h5 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Package Contents</h5>
                            <div className="space-y-3">
                              {order.orderItems?.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100">
                                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-800 truncate">{item.name}</p>
                                    <p className="text-xs text-slate-500">Qty: {item.qty} • Price: ₹{item.price}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Logistics & Address */}
                          <div className="space-y-6">
                            <div className="bg-white p-5 rounded-2xl border border-slate-100">
                              <h5 className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Delivery Details</h5>
                              <div className="flex gap-3 items-start">
                                <FaMapMarkerAlt className="text-indigo-500 mt-1" />
                                <div className="text-sm">
                                  <p className="font-bold text-slate-800">{order.shippingAddress?.fullName}</p>
                                  <p className="text-slate-500 leading-relaxed">
                                    {order.shippingAddress?.address}, {order.shippingAddress?.city}<br />
                                    PIN: {order.shippingAddress?.postalCode}
                                  </p>
                                  {order.shippingAddress?.phone && (
                                    <p className="mt-2 flex items-center gap-2 font-bold text-slate-700">
                                      <FaPhone className="text-xs" /> {order.shippingAddress.phone}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-3">
                              <div className="flex-1 bg-white p-4 rounded-2xl border border-slate-100">
                                <h5 className="text-[10px] font-black uppercase text-slate-400 mb-1">Payment</h5>
                                <p className="text-xs font-bold text-slate-700 flex items-center gap-2">
                                  <FaCreditCard className="text-indigo-500" /> {order.paymentMethod}
                                </p>
                              </div>
                              <div className="flex-1 bg-white p-4 rounded-2xl border border-slate-100">
                                <h5 className="text-[10px] font-black uppercase text-slate-400 mb-1">Status</h5>
                                <p className={`text-xs font-black uppercase ${order.isPaid ? 'text-emerald-600' : 'text-amber-600'}`}>
                                  {order.isPaid ? '✓ Paid' : 'Pending'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default ConsumerDashboard;