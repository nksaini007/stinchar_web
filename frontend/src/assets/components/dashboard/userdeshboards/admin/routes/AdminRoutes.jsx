import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminLayout from "../layout/AdminLayout";

import AdminHome from "../pages/AdminHome";
import UserManagement from "../pages/UserManagement";
import ProductManagement from "../pages/ProductManagement";
import OrderManagement from "../pages/OrderManagement";
import PaymentManagement from "../pages/PaymentManagement";
import DeliveryManagement from "../pages/DeliveryManagement";
import CommunityPosts from "../pages/CommunityPosts";
import ServiceManagement from "../pages/ServiceManagement";
import BookingManagement from "../pages/BookingManagement";
import ConstructionProjects from "../pages/ConstructionProjects";
import ManageProject from "../pages/ManageProject";
import ManagePlans from "../pages/ManagePlans";
import AdminPlanCategoryDashboard from "../pages/AdminPlanCategoryDashboard";
import AdminMessages from "../pages/AdminMessages";
import AdminUserMap from "../pages/AdminUserMap";
import AdminAnalytics from "../pages/AdminAnalytics";
import AdminSiteConfig from "../pages/AdminSiteConfig";
import AdminMaterials from "../pages/AdminMaterials";
import AdminSupport from "../pages/AdminSupport";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="services" element={<ServiceManagement />} />
          <Route path="bookings" element={<BookingManagement />} />
          <Route path="delivery" element={<DeliveryManagement />} />
          <Route path="posts" element={<CommunityPosts />} />
          <Route path="payments" element={<PaymentManagement />} />
          <Route path="construction" element={<ConstructionProjects />} />
          <Route path="construction/:projectId" element={<ManageProject />} />
          <Route path="plan-categories" element={<AdminPlanCategoryDashboard />} />
          <Route path="plans" element={<ManagePlans />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="user-map" element={<AdminUserMap />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="site-config" element={<AdminSiteConfig />} />
          <Route path="materials" element={<AdminMaterials />} />
          <Route path="support" element={<AdminSupport />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import AdminLayout from "../layout/AdminLayout";

// import AdminHome from "../pages/AdminHome";
// import UserManagement from "../pages/UserManagement";
// import ProductManagement from "../pages/ProductManagement";
// import OrderManagement from "../pages/OrderManagement";
// import PaymentManagement from "../pages/PaymentManagement";

// const AdminRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/admin" element={<AdminLayout />}>
//         <Route index element={<AdminHome />} />
//         <Route path="users" element={<UserManagement />} />
//         <Route path="products" element={<ProductManagement />} />
//         <Route path="orders" element={<OrderManagement />} />
//         <Route path="payments" element={<PaymentManagement />} />
//       </Route>
//     </Routes>
//   );
// };

// export default AdminRoutes;

// trigger hmr
