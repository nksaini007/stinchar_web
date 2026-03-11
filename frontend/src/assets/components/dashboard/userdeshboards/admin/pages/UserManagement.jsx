import React, { useEffect, useState } from "react";
import API from "../../../../../api/api";
import {
  FaTrash, FaSearch, FaUser, FaStore, FaTruck, FaShieldAlt,
  FaToggleOn, FaToggleOff, FaChevronDown, FaChevronUp, FaTimes, FaCheckCircle, FaHourglassHalf
} from "react-icons/fa";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [counts, setCounts] = useState({});
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/users");
      setUsers(res.data.users || res.data || []);
      const fetchedCounts = res.data.counts || {};

      // Calculate pending users dynamically
      const usersData = res.data.users || res.data || [];
      const pendingCount = usersData.filter(u => (u.role === "seller" || u.role === "delivery" || u.role === "provider") && u.isApproved === false).length;

      setCounts({ ...fetchedCounts, pending: pendingCount });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;
    try {
      await API.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await API.put(`/users/${id}/toggle-active`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm("Approve this partner account?")) return;
    try {
      await API.put(`/users/${id}/approve`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Approval failed");
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await API.put(`/users/${id}/role`, { role: newRole });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Role change failed");
    }
  };

  const roleConfig = {
    customer: { icon: <FaUser />, color: "text-orange-600 bg-orange-50 border-orange-200", label: "Customer" },
    seller: { icon: <FaStore />, color: "text-emerald-600 bg-emerald-50 border-emerald-200", label: "Seller" },
    delivery: { icon: <FaTruck />, color: "text-blue-600 bg-blue-50 border-blue-200", label: "Delivery" },
    provider: { icon: <FaStore />, color: "text-orange-600 bg-orange-50 border-orange-200", label: "Provider" },
    admin: { icon: <FaShieldAlt />, color: "text-violet-600 bg-violet-50 border-violet-200", label: "Admin" },
  };

  const filtered = users
    .filter((u) => {
      if (roleFilter === "pending") return (u.role === "seller" || u.role === "delivery" || u.role === "provider") && u.isApproved === false;
      if (roleFilter === "all") return true;
      return u.role === roleFilter;
    })
    .filter((u) => {
      if (!search) return true;
      const s = search.toLowerCase();
      return u.name?.toLowerCase().includes(s) || u.email?.toLowerCase().includes(s) || u.phone?.includes(s);
    });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-500 text-sm mt-1">Manage all users across the platform</p>
      </div>

      {/* Role Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { key: "all", label: "Total", count: counts.total || users.length, icon: <FaUser />, active: "bg-gray-800 text-white", inactive: "bg-white text-gray-700 border-gray-200" },
          { key: "customer", label: "Customers", count: counts.customer || 0, icon: <FaUser />, active: "bg-orange-500 text-white", inactive: "bg-orange-50 text-orange-600 border-orange-200" },
          { key: "seller", label: "Sellers", count: counts.seller || 0, icon: <FaStore />, active: "bg-emerald-500 text-white", inactive: "bg-emerald-50 text-emerald-600 border-emerald-200" },
          { key: "delivery", label: "Delivery", count: counts.delivery || 0, icon: <FaTruck />, active: "bg-blue-500 text-white", inactive: "bg-blue-50 text-blue-600 border-blue-200" },
          { key: "provider", label: "Providers", count: counts.provider || 0, icon: <FaStore />, active: "bg-orange-500 text-white", inactive: "bg-orange-50 text-orange-600 border-orange-200" },
          { key: "admin", label: "Admins", count: counts.admin || 0, icon: <FaShieldAlt />, active: "bg-violet-500 text-white", inactive: "bg-violet-50 text-violet-600 border-violet-200" },
          { key: "pending", label: "Pending", count: counts.pending || 0, icon: <FaHourglassHalf />, active: "bg-red-500 text-white", inactive: "bg-red-50 text-red-600 border-red-200" }
        ].map((tab) => (
          <button key={tab.key} onClick={() => setRoleFilter(tab.key)}
            className={`rounded-xl border p-3 flex items-center gap-2 transition-all hover:shadow-md ${roleFilter === tab.key ? tab.active : tab.inactive
              }`}>
            {tab.icon}
            <div className="text-left">
              <p className="text-xs opacity-80">{tab.label}</p>
              <p className="text-lg font-bold">{tab.count}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          type="text" placeholder="Search by name, email, or phone..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Users Table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No users found</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">User</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Role</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Joined</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((u) => {
                  const rc = roleConfig[u.role] || roleConfig.customer;
                  const isExpanded = expandedId === u._id;
                  return (
                    <React.Fragment key={u._id}>
                      <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : u._id)}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-200">
                              {u.profileImage ? (
                                <img src={`${u.profileImage}`} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <FaUser className="text-gray-400" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{u.name}</p>
                              {u.phone && <p className="text-xs text-gray-400">{u.phone}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold capitalize border ${rc.color}`}>
                            {rc.icon} {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${u.isActive !== false ? "text-emerald-600 bg-emerald-50" : "text-gray-600 bg-gray-100"}`}>
                            {u.isActive !== false ? "Active" : "Inactive"}
                          </span>
                          {(u.role === "seller" || u.role === "delivery" || u.role === "provider") && u.isApproved === false && (
                            <span className="inline-block ml-2 px-2.5 py-1 rounded-full text-xs font-semibold text-red-600 bg-red-50 border border-red-200">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {new Date(u.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            {(u.role === "seller" || u.role === "delivery" || u.role === "provider") && u.isApproved === false && (
                              <button onClick={() => handleApprove(u._id)} title="Approve Request"
                                className="text-lg text-green-500 hover:text-green-700 transition">
                                <FaCheckCircle />
                              </button>
                            )}
                            <button onClick={() => handleToggleActive(u._id)} title={u.isActive !== false ? "Deactivate" : "Activate"}
                              className={`text-lg transition ${u.isActive !== false ? "text-emerald-500 hover:text-emerald-700" : "text-gray-400 hover:text-gray-600"}`}>
                              {u.isActive !== false ? <FaToggleOn /> : <FaToggleOff />}
                            </button>
                            <button onClick={() => handleDelete(u._id)}
                              className="text-red-400 hover:text-red-600 transition">
                              <FaTrash />
                            </button>
                            {isExpanded ? <FaChevronUp className="text-gray-400 text-xs" /> : <FaChevronDown className="text-gray-400 text-xs" />}
                          </div>
                        </td>
                      </tr>

                      {/* Expanded User Details */}
                      {isExpanded && (
                        <tr>
                          <td colSpan="6" className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {/* Profile Image */}
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-xl bg-white border border-gray-200 overflow-hidden flex items-center justify-center">
                                  {u.profileImage ? (
                                    <img src={`${u.profileImage}`} alt="" className="w-full h-full object-cover" />
                                  ) : (
                                    <FaUser className="text-2xl text-gray-300" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-800">{u.name}</p>
                                  {u.bio && <p className="text-xs text-gray-500 mt-0.5">{u.bio}</p>}
                                </div>
                              </div>

                              {/* Details */}
                              <div className="space-y-1 text-sm">
                                <p><span className="text-gray-400">Email:</span> <span className="text-gray-700">{u.email}</span></p>
                                <p><span className="text-gray-400">Phone:</span> <span className="text-gray-700">{u.phone || "—"}</span></p>
                                <p><span className="text-gray-400">Address:</span> <span className="text-gray-700">{u.address || "—"}</span></p>
                                <p><span className="text-gray-400">Pincode:</span> <span className="text-gray-700">{u.pincode || "—"}</span></p>
                              </div>

                              {/* Role-Specific + Role Change */}
                              <div className="space-y-3">
                                {u.role === "seller" && (
                                  <div className="text-sm space-y-1">
                                    <p className="text-emerald-600 font-semibold text-xs uppercase">Seller Info</p>
                                    <p><span className="text-gray-400">Business:</span> {u.businessName || "—"}</p>
                                    <p><span className="text-gray-400">GST:</span> {u.gstNumber || "—"}</p>
                                    <p><span className="text-gray-400">PAN:</span> {u.panNumber || "—"}</p>
                                    <p><span className="text-gray-400">Category:</span> {u.businessCategory || "—"}</p>
                                  </div>
                                )}
                                {u.role === "delivery" && (
                                  <div className="text-sm space-y-1">
                                    <p className="text-blue-600 font-semibold text-xs uppercase">Delivery Info</p>
                                    <p><span className="text-gray-400">Vehicle:</span> {u.vehicleType || "—"}</p>
                                    <p><span className="text-gray-400">License:</span> {u.licenseNumber || "—"}</p>
                                    <p><span className="text-gray-400">Area:</span> {u.deliveryAreaPincode || "—"}</p>
                                  </div>
                                )}
                                {u.role === "provider" && (
                                  <div className="text-sm space-y-1">
                                    <p className="text-orange-600 font-semibold text-xs uppercase">Provider Info</p>
                                    <p><span className="text-gray-400">Category:</span> {u.serviceCategory || "—"}</p>
                                    <p><span className="text-gray-400">Experience:</span> {u.experience || "—"}</p>
                                    <p><span className="text-gray-400">Description:</span> {u.serviceDescription || "—"}</p>
                                  </div>
                                )}

                                {/* Role Change */}
                                <div>
                                  <label className="text-xs text-gray-400 block mb-1">Change Role</label>
                                  <select value={u.role}
                                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-blue-400 outline-none">
                                    <option value="customer">Customer</option>
                                    <option value="seller">Seller</option>
                                    <option value="delivery">Delivery</option>
                                    <option value="provider">Provider</option>
                                    <option value="admin">Admin</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
