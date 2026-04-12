import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Play, Clock, Star, FileText } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Admin/common/Header";
import { useAuth } from "../../components/Shared/AuthContext";
import { getExamsByLevel } from "../../Data/hsk-exams";
import FloatingChatIcons from "../../components/Shared/FloatingChatIcons";

const HSKLevelExams = () => {
  const { level } = useParams();
  const { role } = useAuth();
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (role !== 3) {
      navigate("/login");
      return;
    }
    loadExams();
  }, [role, navigate, level]);

  const loadExams = () => {
    setLoading(true);
    try {
      const levelExams = getExamsByLevel(level);
      setExams(levelExams);
    } catch (error) {
      console.error("Lỗi khi tải danh sách đề thi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartExam = (exam) => {
    navigate(`/student/exam/${exam.id}`);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "HSK1":
        return "bg-green-100 text-green-800";
      case "HSK2":
        return "bg-blue-100 text-blue-800";
      case "HSK3":
        return "bg-yellow-100 text-yellow-800";
      case "HSK4":
        return "bg-orange-100 text-orange-800";
      case "HSK5":
        return "bg-red-100 text-red-800";
      case "HSK6":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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

  const getLevelTitle = (level) => {
    switch (level) {
      case "HSK1":
        return "HSK 1 - Cơ bản";
      case "HSK2":
        return "HSK 2 - Sơ cấp";
      case "HSK3":
        return "HSK 3 - Trung cấp thấp";
      case "HSK4":
        return "HSK 4 - Trung cấp";
      case "HSK5":
        return "HSK 5 - Trung cấp cao";
      case "HSK6":
        return "HSK 6 - Cao cấp";
      default:
        return level;
    }
  };

  const getLevelDescription = (level) => {
    switch (level) {
      case "HSK1":
        return "150 từ vựng, giao tiếp cơ bản hàng ngày";
      case "HSK2":
        return "300 từ vựng, giao tiếp đơn giản";
      case "HSK3":
        return "600 từ vựng, giao tiếp cơ bản";
      case "HSK4":
        return "1200 từ vựng, giao tiếp trung bình";
      case "HSK5":
        return "2500 từ vựng, giao tiếp khá";
      case "HSK6":
        return "5000+ từ vựng, giao tiếp thành thạo";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header title={`Thư viện đề thi ${level}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/student/exams")}
          className="mb-6 px-5 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-2"
        >
          <ChevronLeft className="h-5 w-5" /> Quay lại thư viện đề thi
        </motion.button>

        {/* Level Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {getLevelTitle(level)}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {getLevelDescription(level)}
          </p>
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${getLevelColor(
              level
            )}`}
          >
            {level}
          </span>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Exams Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exams.map((exam, index) => (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  {/* Exam Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {exam.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                          exam.level
                        )}`}
                      >
                        {exam.level}
                      </span>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Exam Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {exam.description}
                  </p>

                  {/* Exam Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Thời gian:</span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {exam.duration} phút
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Số câu:</span>
                      <span>{exam.question_count} câu</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Độ khó:</span>
                      <div className="flex">
                        {getDifficultyStars(exam.difficulty)}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStartExam(exam)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center font-semibold"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Bắt đầu thi
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {exams.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Chưa có đề thi nào cho {level}
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>

      <FloatingChatIcons showSocialIcons={false} />
    </div>
  );
};

export default HSKLevelExams;
