import React, { useEffect, useState } from "react";
import API from "../../../../../api/api";
import { FaWallet, FaCheckCircle, FaClock, FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const SellerPayments = () => {
    const [revenue, setRevenue] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await API.get("/payments/seller/revenue");
                setRevenue(data);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        load();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-96">
            <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
        </div>
    );

    const stats = [
        { name: "Total Sales", value: `₹${(revenue?.totalSales || 0).toLocaleString()}`, icon: <FaWallet />, bg: "bg-orange-50 text-orange-600" },
        { name: "Paid Revenue", value: `₹${(revenue?.paidSales || 0).toLocaleString()}`, icon: <FaCheckCircle />, bg: "bg-emerald-50 text-emerald-600" },
        { name: "Pending", value: `₹${(revenue?.pendingSales || 0).toLocaleString()}`, icon: <FaClock />, bg: "bg-amber-50 text-amber-600" },
        { name: "Items Sold", value: revenue?.totalItemsSold || 0, icon: <FaShoppingCart />, bg: "bg-blue-50 text-blue-600" },
        { name: "Total Orders", value: revenue?.totalOrders || 0, icon: <FaBoxOpen />, bg: "bg-violet-50 text-violet-600" },
    ];

    const paidPct = revenue?.totalSales ? ((revenue.paidSales / revenue.totalSales) * 100).toFixed(1) : 0;
    const pendPct = revenue?.totalSales ? ((revenue.pendingSales / revenue.totalSales) * 100).toFixed(1) : 0;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Payments & Earnings</h1>
                <p className="text-sm text-gray-500 mt-1">Track your revenue and payment status</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {stats.map((card, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-lg transition-all group">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm mb-3 ${card.bg}`}>{card.icon}</div>
                        <p className="text-[22px] font-bold text-gray-800 group-hover:text-orange-600 transition-colors">{card.value}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{card.name}</p>
                    </div>
                ))}
            </div>

            {/* Payment Breakdown */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Revenue Split */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-base font-semibold text-gray-800 mb-4">Revenue Breakdown</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-emerald-600 font-medium">Paid Revenue</span>
                                <span className="font-semibold">₹{(revenue?.paidSales || 0).toLocaleString()} ({paidPct}%)</span>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500" style={{ width: `${paidPct}%` }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-amber-600 font-medium">Pending Revenue</span>
                                <span className="font-semibold">₹{(revenue?.pendingSales || 0).toLocaleString()} ({pendPct}%)</span>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500" style={{ width: `${pendPct}%` }} />
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">Avg. per Order</span>
                            <span className="text-lg font-bold text-orange-600">₹{revenue?.totalOrders ? (revenue.totalSales / revenue.totalOrders).toFixed(0) : 0}</span>
                        </div>
                    </div>
                </div>

                {/* Chart */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-base font-semibold text-gray-800 mb-4">Monthly Earnings</h2>
                    {revenue?.monthlyChart?.length > 0 ? (
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={revenue.monthlyChart}>
                                <XAxis dataKey="month" stroke="#cbd5e1" fontSize={11} axisLine={false} tickLine={false} />
                                <YAxis stroke="#cbd5e1" fontSize={11} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v >= 1000 ? (v / 1000).toFixed(0) + "k" : v}`} />
                                <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderRadius: "12px", border: "none", color: "#fff", fontSize: "12px" }} formatter={(v) => [`₹${v.toLocaleString()}`, "Earnings"]} />
                                <Bar dataKey="amount" fill="#f97316" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-60 flex items-center justify-center text-gray-300 border-2 border-dashed rounded-xl">No earnings data yet</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SellerPayments;
