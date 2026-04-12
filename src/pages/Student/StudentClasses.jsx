import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Users,
  Calendar,
  BookOpen,
  X,
  Mail,
  Phone,
  User,
  ChevronLeft,
} from "lucide-react";
import Header from "../../components/Admin/common/Header";
import { useAuth } from "../../components/Shared/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import FloatingChatIcons from "../../components/Shared/FloatingChatIcons";

const StudentClasses = () => {
  const { role, user } = useAuth();
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  const [attendanceSummary, setAttendanceSummary] = useState({});
  const rowsPerPage = 6;

  useEffect(() => {
    if (role !== 3) {
      navigate("/login");
      return;
    }
    fetchClasses();
  }, [role, navigate]);

  useEffect(() => {
    const filtered = classes.filter(
      (cls) =>
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.course_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClasses(filtered);
    setCurrentPage(1);
  }, [searchTerm, classes]);

  useEffect(() => {
    if (classes.length > 0 && role === 3 && user) {
      classes.forEach(async (cls) => {
        const res = await apiFetch(`/attendance/class-summary/${cls.id}`);
        const data = await res.json();
        if (data.status === 200 && Array.isArray(data.result)) {
          const stat = data.result.find((s) => s.id === user.id);
          setAttendanceSummary((prev) => ({ ...prev, [cls.id]: stat }));
        }
      });
    }
  }, [classes, role, user]);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/student/classes");
      const data = await res.json();

      if (data.status === 200) {
        setClasses(data.result || []);
        setFilteredClasses(data.result || []);
      } else {
        toast.error("Lỗi khi lấy danh sách lớp");
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách lớp:", error);
      toast.error("Có lỗi xảy ra khi kết nối với API");
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async (classId) => {
    setLoadingStudents(true);
    try {
      const res = await apiFetch(`/student/classes/${classId}/students`);
      const data = await res.json();

      if (data.status === 200) {
        setStudents(data.result || []);
      } else {
        toast.error("Lỗi khi lấy danh sách bạn học");
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bạn học:", error);
      toast.error("Có lỗi xảy ra khi kết nối với API");
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleShowStudents = async (cls) => {
    setSelectedClass(cls);
    setShowStudentsModal(true);
    await fetchStudents(cls.id);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Đang học";
      case "completed":
        return "Đã hoàn thành";
      case "upcoming":
        return "Sắp khai giảng";
      default:
        return "Không xác định";
    }
  };

  const paginatedClasses = filteredClasses.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredClasses.length / rowsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header title="Lớp học của tôi" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/student")}
          className="mb-6 px-5 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-2"
        >
          <ChevronLeft className="h-5 w-5" /> Quay lại Dashboard
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Lớp học của tôi
          </h2>
          <p className="text-gray-600">
            Xem danh sách các lớp học và bạn học của bạn
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-col sm:flex-row gap-4"
        >
          <div className="flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm lớp học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedClasses.map((cls, index) => (
                <motion.div
                  key={cls.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-6">
                    {/* Class Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {cls.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {cls.course_name}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    {/* Class Info */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {cls.student_count || 0} học sinh
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {cls.start_date
                          ? dayjs(cls.start_date).format("DD/MM/YYYY")
                          : "Chưa có lịch"}
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <BookOpen className="h-4 w-4 mr-2" />
                        {cls.schedule_count || 0} buổi học
                      </div>

                      {/* Attendance summary */}
                      <div className="flex flex-col items-center justify-center mt-4 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100 shadow">
                        <div className="flex items-center gap-4 mb-1">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold text-base shadow-sm">
                            <span
                              role="img"
                              aria-label="present"
                              className="mr-1"
                            >
                              ✅
                            </span>
                            Điểm danh:{" "}
                            {attendanceSummary[cls.id]?.present ?? "-"}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-600 font-bold text-base shadow-sm">
                            <span
                              role="img"
                              aria-label="absent"
                              className="mr-1"
                            >
                              ❌
                            </span>
                            Vắng: {attendanceSummary[cls.id]?.absent ?? "-"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-blue-700 text-base">
                            % vắng:
                          </span>
                          <span className="inline-block min-w-[40px] px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-base shadow">
                            {attendanceSummary[cls.id] ? (attendanceSummary[cls.id].absent / cls.schedule_count * 100).toFixed(1) : "-"}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleShowStudents(cls)}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center font-semibold"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Xem bạn học
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center items-center space-x-2"
              >
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
                >
                  Trước
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        currentPage === page
                          ? "bg-blue-500 text-white shadow-lg"
                          : "border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
                >
                  Sau
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* Students Modal */}
        <AnimatePresence>
          {showStudentsModal && selectedClass && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowStudentsModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">
                        Bạn học - {selectedClass.name}
                      </h3>
                      <p className="text-blue-100">
                        {selectedClass.course_name}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowStudentsModal(false)}
                      className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                  {loadingStudents ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  ) : students.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {students.map((student, index) => (
                        <motion.div
                          key={student.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {student.fullName?.charAt(0) || "S"}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">
                                {student.fullName}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {student.email}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Chưa có bạn học nào trong lớp này</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <FloatingChatIcons showSocialIcons={false} />
    </div>
  );
};

export default StudentClasses;
