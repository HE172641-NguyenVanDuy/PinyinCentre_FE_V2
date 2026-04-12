import {
  BarChart2,
  Subscript,
  Users,
  Menu,
  GraduationCap,
  BookOpen,
  Layers,
  ClipboardList,
  Image,
  Settings,
} from "lucide-react";
import React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
const logo = "/assets/logo/logoPinyin1.png";
const SIDEBAR_ITEMS = [
  {
    name: "Thống Kê",
    icon: BarChart2,
    color: "#6366f1",
    href: "/admin",
  },
  { 
    name: "Đăng Ký Tư Vấn", 
    icon: Subscript,
    color: "#8B5CF6", 
    href: "/admin/products" 
  },
  { 
    name: "Học Viên", 
    icon: Users,
    color: "#8B5CF6", 
    href: "/admin/students" 
  },
  { 
    name: "Giảng Viên", 
    icon: GraduationCap,
    color: "#EC4899", 
    href: "/admin/lectures" 
  },
  { 
    name: "Lớp Học", 
    icon: Layers,
    color: "#10B981", 
    href: "/admin/classes" 
  },
  { 
    name: "Khóa Học", 
    icon: ClipboardList,
    color: "#F59E0B", 
    href: "/admin/orders" 
  },
  { 
    name: "Thư Viện", 
    icon: BookOpen,
    color: "#3B82F6", 
    href: "/admin/analytics" 
  },
  { 
    name: "Quản Lý Banner", 
    icon: Image, 
    color: "#EC4899", 
    href: "/admin/settings" 
  },
  { 
    name: "Cài Đặt", 
    icon: Settings,
    color: "#6EE7B7", 
    href: "/admin/settings" 
  },
];


const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <Link to="/" className="flex items-center justify-center mb-6">
          <img src={logo} className="w-10 h-10 object-contain" alt="Logo" />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span
                className="ml-2 text-lg font-semibold text-white"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                Pinyin Centre
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};
export default Sidebar;
