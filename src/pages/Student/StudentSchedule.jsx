import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Clock,
  MapPin,
  BarChart2,
} from "lucide-react";
import { SiGooglemeet } from "react-icons/si";
import Header from "../../components/Admin/common/Header";
import { useAuth } from "../../components/Shared/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import FloatingChatIcons from "../../components/Shared/FloatingChatIcons";
import StudentAttendanceStatus from "./StudentAttendanceStatus";

const StudentSchedule = () => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const [selectedWeek, setSelectedWeek] = useState(dayjs().startOf("week"));
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  useEffect(() => {
    if (role !== 3) {
      navigate("/login");
      return;
    }
    fetchSchedules();
    // eslint-disable-next-line
  }, [role, navigate, selectedWeek]);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const startDate = selectedWeek.format("YYYY-MM-DD");
      const endDate = selectedWeek.endOf("week").format("YYYY-MM-DD");
      const res = await apiFetch(
        `/student/schedule?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await res.json();
      if (data.status === 200 && data.result) {
        setSchedules(data.result || []);
      } else {
        setSchedules([]);
        toast.error("Lỗi khi lấy lịch học");
      }
    } catch (error) {
      setSchedules([]);
      console.error("Lỗi khi lấy lịch học:", error);
      toast.error("Có lỗi xảy ra khi kết nối với API");
    } finally {
      setLoading(false);
    }
  };

  const nextWeek = () => {
    setSelectedWeek(selectedWeek.add(1, "week"));
  };

  const prevWeek = () => {
    setSelectedWeek(selectedWeek.subtract(1, "week"));
  };

  const getDayName = (date) => {
    return dayjs(date).locale("vi").format("dddd");
  };

  const getDayNumber = (date) => {
    return dayjs(date).format("DD");
  };

  const isToday = (date) => {
    return dayjs(date).isSame(dayjs(), "day");
  };

  const getSchedulesForDay = (date) => {
    return schedules.filter((schedule) =>
      dayjs(schedule.class_date).isSame(dayjs(date), "day")
    );
  };

  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    selectedWeek.add(i, "day")
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header title="Lịch học" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top action buttons: Back to Dashboard & Attendance Status */}
        <div className="flex flex-row gap-4 items-center mb-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/student")}
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-2"
          >
            <ChevronLeft className="h-5 w-5" /> Quay lại Dashboard
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAttendanceModal(true)}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold text-base"
            style={{ minHeight: 44 }}
          >
            <BarChart2 className="h-5 w-5" />
            Tình trạng điểm danh
          </motion.button>
        </div>

        {/* Attendance Status Modal */}
        {showAttendanceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl p-0 max-w-2xl w-full border border-blue-200 relative"
            >
              <button
                onClick={() => setShowAttendanceModal(false)}
                className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-800 rounded-full text-3xl font-bold shadow-lg transition-all duration-200 focus:outline-none z-10"
                aria-label="Đóng"
              >
                ×
              </button>
              <div className="p-6">
                <StudentAttendanceStatus />
              </div>
            </motion.div>
          </div>
        )}

        {/* Header với điều hướng tuần */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
        >
          <h2 className="text-3xl font-bold text-gray-900 drop-shadow-sm">
            Lịch học tuần {selectedWeek.format("DD/MM/YYYY")} -{" "}
            {selectedWeek.endOf("week").format("DD/MM/YYYY")}
          </h2>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevWeek}
              className="p-3 rounded-lg bg-white shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all border border-blue-200"
            >
              <ChevronLeft className="h-5 w-5 text-blue-600" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedWeek(dayjs().startOf("week"))}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all shadow-md font-semibold"
            >
              Hôm nay
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextWeek}
              className="p-3 rounded-lg bg-white shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all border border-blue-200"
            >
              <ChevronRight className="h-5 w-5 text-blue-600" />
            </motion.button>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {daysOfWeek.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl shadow-lg p-4 bg-white border-2 ${
                  isToday(day)
                    ? "border-blue-400 ring-2 ring-blue-300 shadow-xl"
                    : "border-gray-100"
                } hover:scale-[1.02] transition-all duration-300 flex flex-col min-h-[250px]`}
              >
                {/* Header ngày */}
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                    {getDayName(day)}
                  </p>
                  <p
                    className={`text-2xl font-bold ${
                      isToday(day) ? "text-blue-600" : "text-gray-900"
                    }`}
                  >
                    {getDayNumber(day)}
                  </p>
                </div>
                {/* Danh sách lịch học */}
                <div className="space-y-3 flex-1">
                  {getSchedulesForDay(day).map((schedule, idx) => (
                    <motion.div
                      key={schedule.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-3 cursor-pointer hover:bg-blue-200/60 border border-blue-200 flex flex-col gap-1 shadow group hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-base text-blue-900 truncate">
                          {schedule.classroom_name}
                        </h4>
                      </div>
                      <div className="flex items-center text-xs text-gray-700 mb-1 gap-2">
                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded shadow">
                          {schedule.course_name}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-700 mb-1 gap-2">
                        <Clock className="h-3 w-3 mr-1" />
                        {schedule.start_time} - {schedule.end_time}
                      </div>
                      {schedule.link && (
                        <div className="flex items-center text-xs text-green-700 gap-2 mt-1">
                          <SiGooglemeet className="h-4 w-4 mr-1 text-green-500" />
                          <a
                            href={schedule.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-700 hover:underline font-medium"
                            title="Tham gia Google Meet"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Google Meet
                          </a>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {getSchedulesForDay(day).length === 0 && (
                    <div className="flex flex-col items-center justify-center text-gray-400 text-sm py-6 gap-2">
                      <MapPin className="h-8 w-8 text-blue-200 mb-1" />
                      Không có lịch học
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
        {/* <StudentAttendanceStatus /> */}
      </div>
      <FloatingChatIcons showSocialIcons={false} />
    </div>
  );
};

export default StudentSchedule;
