import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Users,
  Calendar,
  BookOpen,
  Eye,
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

const TeacherClasses = () => {
  const { role } = useAuth();
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
  const [attendanceStats, setAttendanceStats] = useState([]);
  const rowsPerPage = 6;

  useEffect(() => {
    if (role !== 2) {
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

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/teacher/classes");
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
      const res = await apiFetch(`/teacher/classes/${classId}/students`);
      const data = await res.json();

      if (data.status === 200) {
        setStudents(data.result || []);
      } else {
        toast.error("Lỗi khi lấy danh sách học sinh");
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách học sinh:", error);
      toast.error("Có lỗi xảy ra khi kết nối với API");
    } finally {
      setLoadingStudents(false);
    }
  };

  const fetchAttendanceStats = async (classId) => {
    const res = await apiFetch(`/attendance/class-summary/${classId}`);
    const data = await res.json();
    if (data.status === 200 && Array.isArray(data.result)) {
      setAttendanceStats(data.result);
    } else {
      setAttendanceStats([]);
    }
  };

  const handleShowStudents = async (cls) => {
    setSelectedClass(cls);
    setShowStudentsModal(true);
    setLoadingStudents(true);
    await fetchAttendanceStats(cls.id);
    setLoadingStudents(false);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header title="Lớp học của tôi" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/teacher")}
          className="mb-6 px-5 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-2"
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
            Quản lý các lớp học và xem danh sách học sinh của bạn
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
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
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                          {cls.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {cls.course_name}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
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
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleShowStudents(cls)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center font-semibold"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Xem học sinh
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
                          ? "bg-green-500 text-white shadow-lg"
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
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">
                        Học sinh - {selectedClass.name}
                      </h3>
                      <p className="text-green-100">
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
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                    </div>
                  ) : attendanceStats.length > 0 ? (
                    <>
                      <div className="mb-4">
                        <h4 className="font-bold text-lg mb-2 text-green-700">
                          Tình trạng điểm danh
                        </h4>
                        <table className="w-full text-sm border">
                          <thead>
                            <tr className="bg-green-50">
                              <th className="p-2 border">Học sinh</th>
                              <th className="p-2 border">Email</th>
                              <th className="p-2 border">Có mặt</th>
                              <th className="p-2 border">Vắng</th>
                              <th className="p-2 border">Tổng buổi</th>
                              <th className="p-2 border">% vắng</th>
                            </tr>
                          </thead>
                          <tbody>
                            {attendanceStats.map((stat) => {
                              const percentAbsent =
                                stat.total > 0
                                  ? Math.round((stat.absent * 100) / stat.total)
                                  : 0;
                              return (
                                <tr key={stat.id}>
                                  <td className="p-2 border font-semibold">
                                    {stat.name}
                                  </td>
                                  <td className="p-2 border text-gray-500">
                                    {stat.email}
                                  </td>
                                  <td className="p-2 border text-green-700 font-bold text-center">
                                    {stat.present}
                                  </td>
                                  <td className="p-2 border text-red-500 font-bold text-center">
                                    {stat.absent}
                                  </td>
                                  <td className="p-2 border text-center">
                                    {stat.total}
                                  </td>
                                  <td className="p-2 border text-center">
                                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                                      <div
                                        className="bg-red-500 h-2 rounded-full"
                                        style={{ width: `${percentAbsent}%` }}
                                      ></div>
                                    </div>
                                    <span className="font-semibold">
                                      {percentAbsent}%
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Chưa có học sinh nào trong lớp này</p>
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

export default TeacherClasses;
