import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../../components/Admin/common/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { apiFetch } from "../../utils/api";

const CreateClassPage = () => {
  const [className, setClassName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [slotsPerWeek, setSlotsPerWeek] = useState(1);
  const [slots, setSlots] = useState([
    { dayOfWeek: "", startTime: null, endTime: null },
  ]);
  const [link, setLink] = useState(""); // Thêm state cho link chung
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [totalSlots, setTotalSlots] = useState(0);
  const [loading, setLoading] = useState(false);

  // Tính số tuần học
  const numberOfWeeks =
    slotsPerWeek > 0 ? Math.ceil(totalSlots / slotsPerWeek) : 0;

  // Lấy danh sách khóa học
  useEffect(() => {
    apiFetch("/course/get-all-course")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.status === 200 && Array.isArray(data.result)) {
          setCourses(data.result);
        } else {
          toast.error("Dữ liệu khóa học không hợp lệ");
          setCourses([]);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách khóa học:", err);
        toast.error(`Lỗi khi lấy danh sách khóa học: ${err.message}`);
        setCourses([]);
      });
  }, []);

  // Cập nhật totalSlots khi chọn khóa học
  useEffect(() => {
    const selectedCourse = courses.find((course) => course.id === courseId);
    setTotalSlots(selectedCourse ? selectedCourse.slotNumber || 0 : 0);
  }, [courseId, courses]);

  // Lấy danh sách giáo viên
  const fetchTeachers = async (classDate, startTime, endTime) => {
    try {
      const response = await apiFetch("/schedule/available-teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          class_date: classDate ? dayjs(classDate).format("YYYY-MM-DD") : "",
          start_time: startTime ? dayjs(startTime).format("HH:mm:ss") : "",
          end_time: endTime ? dayjs(endTime).format("HH:mm:ss") : "",
        }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();
      if (result.status === 200 && Array.isArray(result.data)) {
        setTeachers(result.data);
      } else {
        toast.error("Dữ liệu giáo viên không hợp lệ");
        setTeachers([]);
      }
    } catch (err) {
      toast.error(`Lỗi khi lấy danh sách giáo viên: ${err.message}`);
      setTeachers([]);
    }
  };

  // Thêm slot mới
  const addSlot = () => {
    if (slots.length < slotsPerWeek) {
      setSlots([...slots, { dayOfWeek: "", startTime: null, endTime: null }]);
    } else {
      toast.warn(`Số slot không được vượt quá ${slotsPerWeek} slot/tuần`);
    }
  };

  // Cập nhật slot
  const updateSlot = (index, field, value) => {
    const newSlots = [...slots];
    newSlots[index][field] = value;
    setSlots(newSlots);
    if (field === "startTime" || field === "endTime") {
      const { dayOfWeek, startTime, endTime } = newSlots[index];
      if (dayOfWeek && startTime && endTime && startDate) {
        const firstDate = dayjs(startDate).day(
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].indexOf(dayOfWeek)
        );
        fetchTeachers(firstDate, startTime, endTime);
      }
    }
  };

  // Tạo danh sách lịch học
  const generateSchedules = () => {
    const schedules = [];
    let slotCount = 0;

    for (let week = 0; week < numberOfWeeks && slotCount < totalSlots; week++) {
      for (const slot of slots) {
        if (slotCount >= totalSlots) break;
        const { dayOfWeek, startTime, endTime } = slot;
        if (dayOfWeek && startTime && endTime) {
          const dayIndex = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].indexOf(dayOfWeek);
          const date = dayjs(startDate)
            .add(week * 7, "day")
            .day(dayIndex);
          schedules.push({
            class_date: date.format("YYYY-MM-DD"),
            start_time: dayjs(startTime).format("HH:mm:ss"),
            end_time: dayjs(endTime).format("HH:mm:ss"),
            description: "",
            link: link, // Gán link chung cho tất cả schedules
          });
          slotCount++;
        }
      }
    }
    return schedules;
  };

  // Xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (slots.length !== parseInt(slotsPerWeek)) {
      toast.error(`Vui lòng thêm đủ ${slotsPerWeek} slot`);
      return;
    }
    if (!startDate) {
      toast.error("Vui lòng chọn ngày bắt đầu");
      return;
    }
    setLoading(true);
    try {
      const schedules = generateSchedules();
      const response = await apiFetch("/classroom/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: className,
          course_id: courseId,
          teacher_id: teacherId,
          schedules,
          link, // Gửi link chung
        }),
      });
      const result = await response.json();
      if (result.status === 200) {
        toast.success("Tạo lớp học thành công!", { autoClose: 2000 });
        setTimeout(() => (window.location.href = "/admin/classes"), 2000);
      } else {
        toast.error(
          `Tạo lớp học thất bại: ${result.message || "Không rõ nguyên nhân"}`,
          { autoClose: 2000 }
        );
      }
    } catch (err) {
      toast.error(`Lỗi khi tạo lớp học: ${err.message}`, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Tạo lớp học mới" />

      <motion.div
        className="max-w-3xl mx-auto mt-10 bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-6 border border-gray-700 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-gray-100 mb-6">
          Tạo lớp học mới
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-gray-300 mb-2">
              Tên lớp học <span className="text-red-500">*</span>
            </label>
            <TextField
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
              fullWidth
              variant="outlined"
              InputProps={{
                style: { backgroundColor: "#374151", color: "white" },
              }}
              InputLabelProps={{ style: { color: "#9CA3af" } }}
            />
          </div>

          <div>
            <FormControl fullWidth>
              <InputLabel style={{ color: "#9CA3af" }}>Khóa học</InputLabel>
              <Select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                required
                style={{ backgroundColor: "#374151", color: "white" }}
              >
                <MenuItem value="">Chọn khóa học</MenuItem>
                {Array.isArray(courses) && courses.length > 0 ? (
                  courses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.courseName} ({course.slotNumber} slot)
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Không có khóa học</MenuItem>
                )}
              </Select>
            </FormControl>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Ngày bắt đầu</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={startDate}
                onChange={(value) => setStartDate(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    InputProps={{
                      style: { backgroundColor: "#374151", color: "white" },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>

          <div>
            <FormControl fullWidth>
              <InputLabel style={{ color: "#9CA3af" }}>
                Slot mỗi tuần
              </InputLabel>
              <Select
                value={slotsPerWeek}
                onChange={(e) => {
                  setSlotsPerWeek(e.target.value);
                  setSlots(
                    Array(parseInt(e.target.value))
                      .fill()
                      .map(() => ({
                        dayOfWeek: "",
                        startTime: null,
                        endTime: null,
                      }))
                  );
                }}
                style={{ backgroundColor: "#374151", color: "white" }}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num} slot/tuần
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Số tuần học: {numberOfWeeks}
            </label>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Link lớp học <span className="text-red-500">*</span>
            </label>
            <TextField
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
              fullWidth
              variant="outlined"
              placeholder="Nhập link Zoom/Google Meet"
              InputProps={{
                style: { backgroundColor: "#374151", color: "white" },
              }}
              InputLabelProps={{ style: { color: "#9CA3af" } }}
            />
          </div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {slots.map((slot, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-gray-600 pb-4"
              >
                <div>
                  <FormControl fullWidth>
                    <InputLabel style={{ color: "#9CA3af" }}>
                      Ngày trong tuần
                    </InputLabel>
                    <Select
                      value={slot.dayOfWeek}
                      onChange={(e) =>
                        updateSlot(index, "dayOfWeek", e.target.value)
                      }
                      style={{ backgroundColor: "#374151", color: "white" }}
                    >
                      <MenuItem value="">Chọn ngày</MenuItem>
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day) => (
                        <MenuItem key={day} value={day}>
                          {day}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">
                    Giờ bắt đầu
                  </label>
                  <TimePicker
                    value={slot.startTime}
                    onChange={(value) => updateSlot(index, "startTime", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        InputProps={{
                          style: { backgroundColor: "#374151", color: "white" },
                        }}
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">
                    Giờ kết thúc
                  </label>
                  <TimePicker
                    value={slot.endTime}
                    onChange={(value) => updateSlot(index, "endTime", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        InputProps={{
                          style: { backgroundColor: "#374151", color: "white" },
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            ))}
          </LocalizationProvider>

          <Button
            variant="outlined"
            onClick={addSlot}
            className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Thêm slot
          </Button>

          <div>
            <FormControl fullWidth>
              <InputLabel style={{ color: "#9CA3af" }}>Giáo viên</InputLabel>
              <Select
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                required
                style={{ backgroundColor: "#374151", color: "white" }}
              >
                <MenuItem value="">Chọn giáo viên</MenuItem>
                {Array.isArray(teachers) && teachers.length > 0 ? (
                  teachers.map((teacher) => (
                    <MenuItem key={teacher.id} value={teacher.id}>
                      {teacher.fullName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Không có giáo viên khả dụng</MenuItem>
                )}
              </Select>
            </FormControl>
          </div>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
          >
            {loading ? "Đang tạo..." : "Tạo lớp học"}
          </Button>
        </form>
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

export default CreateClassPage;
