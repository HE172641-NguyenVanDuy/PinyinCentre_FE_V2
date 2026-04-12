import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, BookOpen, FileText, Clock, Users } from "lucide-react";
import Header from "../../components/Admin/common/Header";
import { useAuth } from "../../components/Shared/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";
import { toast } from "react-toastify";
import FloatingChatIcons from "../../components/Shared/FloatingChatIcons";

const defaultStats = {
  totalClasses: 0,
  todayClasses: 0,
  upcomingClasses: 0,
  completedExams: 0,
};

const StudentDashboard = () => {
  const { role, user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    if (role !== 3) {
      navigate("/login");
      return;
    }
    fetchStudentStats();
    // eslint-disable-next-line
  }, [role, navigate]);

  const fetchStudentStats = async () => {
    try {
      console.log("Fetching student stats...");
      const res = await apiFetch("/student/stats");
      console.log("Response status:", res.status);
      console.log("Response headers:", res.headers);

      const data = await res.json();
      console.log("Response data:", data);

      if (data.status === 200 && data.result) {
        setStats(data.result);
      } else {
        setStats(defaultStats);
      }
    } catch (error) {
      console.error("Lỗi khi lấy thống kê:", error);
      setStats(defaultStats);
    }
  };

  const menuItems = [
    {
      title: "Lịch học",
      description: "Xem lịch học và thông tin lớp",
      icon: Calendar,
      path: "/student/schedule",
      color: "bg-blue-500",
    },
    {
      title: "Thư viện đề thi",
      description: "Truy cập các đề thi HSK",
      icon: FileText,
      path: "/student/exams",
      color: "bg-green-500",
    },
    {
      title: "Lớp học của tôi",
      description: "Xem danh sách lớp và bạn học",
      icon: BookOpen,
      path: "/student/classes",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header title="Dashboard Học sinh" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Chào mừng trở lại, {user?.fullName || "Học sinh"}! 👋
          </h2>
          <p className="text-gray-600">
            Hôm nay bạn muốn học gì? Hãy chọn một tùy chọn bên dưới để bắt đầu.
          </p>
        </motion.div>

        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tổng số lớp</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.totalClasses ?? 0}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Buổi học tuần này
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.weeklyClasses ?? 0}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Đề thi đã làm
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.completedExams ?? 0}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bạn học</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.classmates ?? 0}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                onClick={() => navigate(item.path)}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div
                  className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <FloatingChatIcons showSocialIcons={false} />
    </div>
  );
};

export default StudentDashboard;
