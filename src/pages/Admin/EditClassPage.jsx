import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { X } from "lucide-react";
import Header from "../../components/Admin/common/Header";
import { apiFetch } from "../../utils/api";

const EditClassPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    course_id: "",
    teacher_id: "",
    start_date: "",
    end_date: "",
    schedules: [],
  });
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    class_date: "",
    start_time: "",
    end_time: "",
    link: "",
    description: "",
  });

  // Lấy dữ liệu lớp học
  useEffect(() => {
    const fetchClass = async () => {
      setLoading(true);
      try {
        const res = await apiFetch(`/classroom/${id}`);
        const data = await res.json();
        if (data.status === 200) {
          setFormData({
            name: data.data.name,
            course_id: data.data.course_id,
            teacher_id: data.data.teacher_id,
            start_date: data.data.start_date
              ? dayjs(data.data.start_date).format("YYYY-MM-DD")
              : "",
            end_date: data.data.end_date
              ? dayjs(data.data.end_date).format("YYYY-MM-DD")
              : "",
            schedules: data.data.schedules.map((s) => ({
              id: s.id,
              class_date: s.class_date,
              start_time: s.start_time,
              end_time: s.end_time,
              link: s.link || "",
              description: s.description || "",
            })),
          });
        } else {
          toast.error("Lấy dữ liệu lớp thất bại");
        }
      } catch (error) {
        console.error("Lỗi lấy dữ liệu lớp:", error);
        toast.error("Lỗi khi lấy dữ liệu lớp");
      } finally {
        setLoading(false);
      }
    };

    const fetchCourses = async () => {
      try {
        const res = await apiFetch("/course/list");
        const data = await res.json();
        if (data.status === 200) {
          setCourses(data.data);
        }
      } catch (error) {
        console.error("Lỗi lấy khóa học:", error);
      }
    };

    const fetchTeachers = async () => {
      try {
        const res = await apiFetch("/user/teachers");
        const data = await res.json();
        if (data.status === 200) {
          setTeachers(data.data);
        }
      } catch (error) {
        console.error("Lỗi lấy giáo viên:", error);
      }
    };

    fetchClass();
    fetchCourses();
    fetchTeachers();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule({ ...newSchedule, [name]: value });
  };

  const addSchedule = () => {
    if (
      !newSchedule.class_date ||
      !newSchedule.start_time ||
      !newSchedule.end_time
    ) {
      toast.error("Vui lòng điền đầy đủ ngày, giờ bắt đầu và giờ kết thúc");
      return;
    }
    setFormData({
      ...formData,
      schedules: [...formData.schedules, { ...newSchedule }],
    });
    setNewSchedule({
      class_date: "",
      start_time: "",
      end_time: "",
      link: "",
      description: "",
    });
  };

  const removeSchedule = (index) => {
    setFormData({
      ...formData,
      schedules: formData.schedules.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiFetch(`/classroom/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status === 200) {
        toast.success("Cập nhật lớp thành công");
        navigate("/admin/classes");
      } else {
        toast.error(
          `Cập nhật thất bại: ${data.message || "Không rõ nguyên nhân"}`
        );
      }
    } catch (error) {
      console.error("Lỗi cập nhật lớp:", error);
      toast.error("Lỗi khi cập nhật lớp");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Tạo lớp học mới" />
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-gray-100 mb-6">
          Chỉnh sửa lớp học
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tên lớp
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Khóa học
              </label>
              <select
                name="course_id"
                value={formData.course_id}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Chọn khóa học</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.course_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Giáo viên
              </label>
              <select
                name="teacher_id"
                value={formData.teacher_id}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Chọn giáo viên</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.full_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ngày bắt đầu
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ngày kết thúc
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-100 mb-4">Lịch học</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="date"
                name="class_date"
                value={newSchedule.class_date}
                onChange={handleScheduleChange}
                className="bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ngày học"
              />
              <input
                type="time"
                name="start_time"
                value={newSchedule.start_time}
                onChange={handleScheduleChange}
                className="bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Giờ bắt đầu"
              />
              <input
                type="time"
                name="end_time"
                value={newSchedule.end_time}
                onChange={handleScheduleChange}
                className="bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Giờ kết thúc"
              />
              <input
                type="text"
                name="link"
                value={newSchedule.link}
                onChange={handleScheduleChange}
                className="bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Link (nếu có)"
              />
              <input
                type="text"
                name="description"
                value={newSchedule.description}
                onChange={handleScheduleChange}
                className="bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mô tả (nếu có)"
              />
              <button
                type="button"
                onClick={addSchedule}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Thêm lịch
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Ngày học
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Giờ bắt đầu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Giờ kết thúc
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Link
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Mô tả
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {formData.schedules.map((schedule, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {dayjs(schedule.class_date).format("DD/MM/YYYY")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {dayjs(schedule.start_time, "HH:mm:ss").format("HH:mm")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {dayjs(schedule.end_time, "HH:mm:ss").format("HH:mm")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {schedule.link || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {schedule.description || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <button
                          type="button"
                          onClick={() => removeSchedule(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/admin/classes")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
            >
              {loading ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>

        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      </motion.div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default EditClassPage;
