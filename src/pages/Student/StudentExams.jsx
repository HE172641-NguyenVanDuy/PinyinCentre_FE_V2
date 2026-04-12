import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import {
  Search,
  FileText,
  Clock,
  Star,
  BookOpen,
  Users,
  Award,
} from "lucide-react";
import Header from "../../components/Admin/common/Header";
import { useAuth } from "../../components/Shared/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";
import { toast } from "react-toastify";
import FloatingChatIcons from "../../components/Shared/FloatingChatIcons";
import { getAllExams } from "../../Data/hsk-exams";

const StudentExams = () => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (role !== 3) {
      console.log("StudentDashboard role:", role);
      navigate("/login");
      return;
    }
  }, [role, navigate]);

  const hskLevels = [
    {
      level: "HSK1",
      title: "HSK 1 - Cơ bản",
      description: "150 từ vựng, giao tiếp cơ bản hàng ngày",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      icon: BookOpen,
      examCount: 3,
      duration: "40 phút",
      difficulty: 1,
    },
    {
      level: "HSK2",
      title: "HSK 2 - Sơ cấp",
      description: "300 từ vựng, giao tiếp đơn giản",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      icon: Users,
      examCount: 3,
      duration: "55 phút",
      difficulty: 2,
    },
    {
      level: "HSK3",
      title: "HSK 3 - Trung cấp thấp",
      description: "600 từ vựng, giao tiếp cơ bản",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "from-yellow-50 to-yellow-100",
      icon: Award,
      examCount: 3,
      duration: "90 phút",
      difficulty: 3,
    },
    {
      level: "HSK4",
      title: "HSK 4 - Trung cấp",
      description: "1200 từ vựng, giao tiếp trung bình",
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      icon: FileText,
      examCount: 3,
      duration: "105 phút",
      difficulty: 4,
    },
    {
      level: "HSK5",
      title: "HSK 5 - Trung cấp cao",
      description: "2500 từ vựng, giao tiếp khá",
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
      icon: Star,
      examCount: 3,
      duration: "125 phút",
      difficulty: 5,
    },
    {
      level: "HSK6",
      title: "HSK 6 - Cao cấp",
      description: "5000+ từ vựng, giao tiếp thành thạo",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      icon: Award,
      examCount: 3,
      duration: "140 phút",
      difficulty: 5,
    },
  ];

  const handleLevelClick = (level) => {
    navigate(`/student/exams/${level}`);
  };

  const getDifficultyStars = (difficulty) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < difficulty ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const filteredLevels = hskLevels.filter(
    (level) =>
      level.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      level.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header title="Thư viện đề thi" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/student")}
          className="mb-6 px-5 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-2"
        >
          <ChevronLeft className="h-5 w-5" /> Quay lại Dashboard
        </motion.button>
        {/* Header với tìm kiếm */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Thư viện đề thi HSK
            </h2>
            <p className="text-gray-600">
              Chọn cấp độ HSK để xem danh sách đề thi và bắt đầu luyện tập
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Tìm kiếm */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Tìm kiếm cấp độ HSK..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64 bg-white shadow-sm"
              />
            </div>
          </div>
        </motion.div>

        {/* HSK Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLevels.map((level, index) => (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLevelClick(level.level)}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              {/* Level Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {level.title}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${level.color} text-white`}
                  >
                    {level.level}
                  </span>
                </div>
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${level.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <level.icon className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Level Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {level.description}
              </p>

              {/* Level Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Số đề thi:</span>
                  <span className="flex items-center">
                    <FileText className="h-4 w-4 mr-1" />
                    {level.examCount} đề
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Thời gian:</span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {level.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Độ khó:</span>
                  <div className="flex">
                    {getDifficultyStars(level.difficulty)}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center font-semibold group-hover:scale-105">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Xem đề thi
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredLevels.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm
                ? "Không tìm thấy cấp độ HSK nào"
                : "Chưa có cấp độ HSK nào trong thư viện"}
            </p>
          </motion.div>
        )}

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Thống kê thư viện
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
              <div className="text-gray-600">Cấp độ HSK</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">18</div>
              <div className="text-gray-600">Đề thi tổng cộng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                1000+
              </div>
              <div className="text-gray-600">Câu hỏi</div>
            </div>
          </div>
        </motion.div>
      </div>
      <FloatingChatIcons showSocialIcons={false} />
    </div>
  );
};

export default StudentExams;
