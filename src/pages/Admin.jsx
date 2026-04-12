import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Sidebar from "../components/Admin/common/Sidebar";

import OverviewPage from "../pages/OverviewPage";
import ProductsPage from "../pages/ProductsPage";
import UsersPage from "../pages/UsersPage";
import SalesPage from "../pages/SalesPage";
import OrdersPage from "../pages/OrdersPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import SettingsPage from "../pages/SettingsPage";
import CreateUserPage from "./Admin/CreateUser";
import StudentPage from "./Admin/StudentPage.jsx";
import Lecture from "./Admin/LecturePage.jsx";
import CreateClassPage from "./Admin/CreateClassPage.jsx";
import ClassListPage from "./Admin/ClassListPage.jsx";
import EditClassPage from "./Admin/EditClassPage.jsx";
import SchedulePage from "./Admin/SchedulePage.jsx";
import { useAuth } from "../components/Shared/AuthContext";

const Admin = () => {
  const { role } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (parseInt(role) !== 1) {
      navigate("/login");
    }
  }, [role, navigate]);
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* BG */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="sales" element={<SalesPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="create-user" element={<CreateUserPage />} />
        <Route path="students" element={<StudentPage />} />
        <Route path="lectures" element={<Lecture />} />
        <Route path="create-class" element={<CreateClassPage />} />
        <Route path="classes" element={<ClassListPage />} />
        <Route path="edit-class/:id" element={<EditClassPage />} />
        <Route path="schedule-page" element={<SchedulePage />} />
      </Routes>
    </div>
  );
};
export default Admin;
