import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import StudentListModal from "./StudentListModal";
import RemoveStudentModal from "./RemoveStudentModal";
import { apiFetch } from "../../../utils/api";

const ClassListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [classes, setClasses] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [openAddStudentModal, setOpenAddStudentModal] = useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [openRemoveStudentModal, setOpenRemoveStudentModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const rowsPerPage = 5;

  // Lấy danh sách lớp học
  const loadClasses = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/classroom/list");
      const data = await res.json();
      if (data.status === 200 && Array.isArray(data.data)) {
        setClasses(data.data);
        setFilteredList(data.data);
      } else {
        toast.error("Lấy dữ liệu lớp học thất bại");
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách lớp:", error);
      toast.error("Lỗi khi lấy danh sách lớp");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClasses();
  }, []);

  // Tìm kiếm lớp
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = classes.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.course_name.toLowerCase().includes(term) ||
        item.teacher_name.toLowerCase().includes(term)
    );
    setFilteredList(filtered);
    setCurrentPage(1);
  };

  // Lấy lịch của lớp
  const fetchSchedules = async (classId) => {
    try {
      const res = await apiFetch(`/schedule/by-class/${classId}`);
      const data = await res.json();
      if (data.status === 200 && Array.isArray(data.data)) {
        setSchedules(data.data);
        if (data.data.length > 0) {
          const earliestDate = data.data
            .map((s) => dayjs(s.classDate))
            .sort((a, b) => a - b)[0];
          setSelectedWeek(earliestDate.startOf("week").add(1, "day"));
        }
      } else {
        toast.error("Lấy dữ liệu lịch thất bại");
      }
    } catch (error) {
      console.error("Lỗi lấy lịch:", error);
      toast.error("Lỗi khi lấy lịch");
    }
  };

  // Mở modal thêm học sinh
  const handleOpenAddStudentModal = (classId) => {
    setSelectedClassId(classId);
    setOpenAddStudentModal(true);
  };

  // Đóng modal thêm học sinh
  const handleCloseAddStudentModal = () => {
    setOpenAddStudentModal(false);
    setSelectedClassId(null);
  };

  // Mở modal xóa học sinh
  const handleOpenRemoveStudentModal = (classId) => {
    setSelectedClassId(classId);
    setOpenRemoveStudentModal(true);
  };

  // Đóng modal xóa học sinh
  const handleCloseRemoveStudentModal = () => {
    setOpenRemoveStudentModal(false);
    setSelectedClassId(null);
  };

  // Mở modal xem lịch
  const handleOpenScheduleModal = (classId) => {
    setSelectedClassId(classId);
    fetchSchedules(classId);
    setOpenScheduleModal(true);
  };

  // Đóng modal lịch
  const handleCloseScheduleModal = () => {
    setOpenScheduleModal(false);
    setSelectedClassId(null);
    setSchedules([]);
    setSelectedWeek(null);
  };

  // Xử lý thêm/xóa học sinh thành công
  const handleStudentChangeSuccess = () => {
    handleCloseAddStudentModal();
    handleCloseRemoveStudentModal();
    loadClasses();
  };

  // Lấy danh sách tuần
  const getWeekOptions = () => {
    if (!schedules.length) return [];
    const dates = schedules
      .map((s) => dayjs(s.classDate))
      .sort((a, b) => a - b);
    const minDate = dates[0];
    const maxDate = dates[dates.length - 1];
    const weeks = [];
    let current = minDate.startOf("week").add(1, "day");
    while (
      current.isBefore(maxDate, "week") ||
      current.isSame(maxDate, "week")
    ) {
      weeks.push(current);
      current = current.add(1, "week");
    }
    return weeks;
  };

  // Tạo dữ liệu cho bảng lịch
  const generateWeeklyCalendar = () => {
    if (!selectedWeek) return { days: [], calendarData: [] };

    const days = Array.from({ length: 7 }, (_, i) =>
      selectedWeek.add(i, "day").format("YYYY-MM-DD")
    );

    const calendarData = days.map((day) => {
      const daySchedules = schedules.filter(
        (s) => dayjs(s.classDate).format("YYYY-MM-DD") === day
      );
      return daySchedules.map((schedule) => {
        const classInfo = classes.find((c) => c.id === selectedClassId);
        return {
          className: classInfo?.name || "Unnamed Class",
          time: `${schedule.startTime?.substring(
            0,
            5
          )} - ${schedule.endTime?.substring(0, 5)}`,
          link: schedule.link,
          description: schedule.description,
        };
      });
    });

    return { days, calendarData };
  };

  const { days, calendarData } = generateWeeklyCalendar();

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);
  const paginatedData = filteredList.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100">
            Danh sách lớp học
          </h2>
          <button
            onClick={() => navigate("/admin/create-class")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm flex items-center"
          >
            <Plus size={18} className="mr-2" /> Thêm lớp
          </button>
          <button
            onClick={() => navigate("/admin/schedule-page")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center"
          >
            <Plus size={18} className="mr-2" /> Xem lịch học trung tâm
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="bg-gray-700 text-white rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
              value={searchTerm}
              disabled={loading}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Tên lớp
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Khóa học
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Giáo viên
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Ngày bắt đầu
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Ngày kết thúc
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Số học sinh
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {paginatedData.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.course_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.teacher_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {dayjs(item.start_date).isValid()
                      ? dayjs(item.start_date).format("DD/MM/YYYY")
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {dayjs(item.end_date).isValid()
                      ? dayjs(item.end_date).format("DD/MM/YYYY")
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.student_count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 space-x-2 flex items-center">
                    <button
                      onClick={() => navigate(`/admin/edit-class/${item.id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleOpenAddStudentModal(item.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-xs"
                    >
                      Thêm học sinh
                    </button>
                    <button
                      onClick={() => handleOpenRemoveStudentModal(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs"
                    >
                      Xóa học sinh
                    </button>
                    <button
                      onClick={() => handleOpenScheduleModal(item.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs"
                    >
                      Xem lịch
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || loading}
              className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-40"
            >
              « Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                disabled={loading}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || loading}
              className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-40"
            >
              Next »
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center text-gray-400 mt-4">
            Đang tải dữ liệu...
          </div>
        )}
      </motion.div>

      {/* Modal thêm học sinh */}
      {openAddStudentModal && (
        <StudentListModal
          classId={selectedClassId}
          onClose={handleCloseAddStudentModal}
          onAddSuccess={handleStudentChangeSuccess}
        />
      )}

      {/* Modal xóa học sinh */}
      {openRemoveStudentModal && (
        <RemoveStudentModal
          classId={selectedClassId}
          onClose={handleCloseRemoveStudentModal}
          onRemoveSuccess={handleStudentChangeSuccess}
        />
      )}

      {/* Modal xem lịch */}
      {openScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-7xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">
              Lịch học
            </h3>
            <div className="mb-4">
              <label className="text-gray-100 mr-2">Chọn tuần:</label>
              <select
                value={selectedWeek ? selectedWeek.format("YYYY-MM-DD") : ""}
                onChange={(e) => setSelectedWeek(dayjs(e.target.value))}
                className="bg-gray-700 text-white rounded-lg p-2"
              >
                {getWeekOptions().map((week) => (
                  <option
                    key={week.format("YYYY-MM-DD")}
                    value={week.format("YYYY-MM-DD")}
                  >
                    Tuần {week.format("DD/MM/YYYY")} -{" "}
                    {week.add(6, "day").format("DD/MM/YYYY")}
                  </option>
                ))}
              </select>
            </div>
            {schedules.length > 0 && selectedWeek ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      {days.map((day) => (
                        <th
                          key={day}
                          className="border border-gray-700 p-2 text-gray-100"
                        >
                          {dayjs(day).format("ddd, DD/MM")}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {calendarData.map((daySchedules, index) => (
                        <td
                          key={days[index]}
                          className="border border-gray-700 p-2 min-w-[150px] align-top"
                        >
                          {daySchedules.map((slot, slotIndex) => (
                            <div
                              key={slotIndex}
                              className="bg-blue-900 bg-opacity-50 rounded p-2 text-gray-100 text-sm mb-2"
                            >
                              <p className="font-semibold">{slot.className}</p>
                              <p>{slot.teacherName}</p>
                              <p>{slot.time}</p>
                              {slot.link && (
                                <a
                                  href={slot.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 underline"
                                >
                                  Link
                                </a>
                              )}
                              {slot.description && <p>{slot.description}</p>}
                            </div>
                          ))}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-300">Không có lịch học</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseScheduleModal}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
};

export default ClassListPage;
