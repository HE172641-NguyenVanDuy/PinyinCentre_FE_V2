import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Search,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../../components/Shared/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = ({ title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Đăng xuất thành công!");
  };

  const getRoleName = (role) => {
    switch (role) {
      case 1:
        return "Admin";
      case 2:
        return "Giáo viên";
      case 3:
        return "Học sinh";
      default:
        return "User";
    }
  };
const isAdmin = user?.role === 1;
  return (
    <div
      className={`shadow-lg ${
        isAdmin
          ? "bg-gradient-to-r from-gray-700 to-gray-900"
          : "bg-gradient-to-r from-orange-500 to-red-500"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Title and Mobile menu */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-white hover:bg-white/20 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-white ml-4 lg:ml-0"
            >
              {title}
            </motion.h1>
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <Search size={20} />
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"></span>
            </motion.button>

            {/* User dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">
                    {user?.fullName || "User"}
                  </p>
                  <p className="text-xs text-white/80">
                    {getRoleName(user?.role)}
                  </p>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </motion.button>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.fullName || "User"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.email || "user@example.com"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {getRoleName(user?.role)}
                    </p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        navigate("/profile");
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full transition-colors"
                    >
                      <User size={16} className="mr-3" />
                      Hồ sơ
                    </button>

                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        navigate("/settings");
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full transition-colors"
                    >
                      <Settings size={16} className="mr-3" />
                      Cài đặt
                    </button>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full transition-colors"
                    >
                      <LogOut size={16} className="mr-3" />
                      Đăng xuất
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/20 py-4"
          >
            <div className="space-y-2">
              <button className="flex items-center w-full px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-colors">
                <Search size={20} className="mr-3" />
                Tìm kiếm
              </button>
              <button className="flex items-center w-full px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-colors">
                <Bell size={20} className="mr-3" />
                Thông báo
              </button>
              <div className="border-t border-white/20 pt-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                >
                  <LogOut size={20} className="mr-3" />
                  Đăng xuất
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Header;
