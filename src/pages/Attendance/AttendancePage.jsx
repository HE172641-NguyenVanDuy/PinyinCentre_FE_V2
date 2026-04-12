import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";
import { toast } from "react-toastify";
import Header from "../../components/Admin/common/Header";

const AttendancePage = () => {
  const [searchParams] = useSearchParams();
  const scheduleId = searchParams.get("scheduleId");
  const classId = searchParams.get("classId");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [scheduleId, classId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Lấy danh sách học sinh của lớp
      const resStudents = await apiFetch(`/user/students/in-class/${classId}`);
      const dataStudents = await resStudents.json();
      if (dataStudents.status !== 200)
        throw new Error("Không tìm thấy học sinh");
      setStudents(dataStudents.data || []);
      // Lấy trạng thái điểm danh (nếu đã có)
      const resAttendance = await apiFetch(
        `/attendance/by-schedule/${scheduleId}`
      );
      const dataAttendance = await resAttendance.json();
      if (
        dataAttendance.status === 200 &&
        Array.isArray(dataAttendance.result)
      ) {
        const attMap = {};
        dataAttendance.result.forEach((a) => {
          attMap[a.userId] = a.status;
        });
        setAttendance(attMap);
      } else {
        setAttendance({});
      }
    } catch (e) {
      toast.error(e.message || "Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = (userId, checked) => {
    setAttendance((prev) => ({ ...prev, [userId]: checked }));
  };

  const handleSave = async () => {
    try {
      const list = students.map((s) => ({
        userId: s.id,
        scheduleId: Number(scheduleId),
        status: !!attendance[s.id],
      }));
      const res = await apiFetch("/attendance/save-all", {
        method: "POST",
        body: JSON.stringify(list),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log("API response:", data); // Thêm dòng này
      if (data.status === 200) {
        toast.success("Lưu điểm danh thành công!");
        // fetchData(); // thử comment dòng này để test
      } else {
        toast.error("Lưu điểm danh thất bại!");
      }
    } catch (e) {
      toast.error("Có lỗi khi lưu điểm danh");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header title="Điểm danh buổi học" />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-5 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
        >
          Quay lại
        </button>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <table className="w-full mb-4">
              <thead>
                <tr>
                  <th className="text-left">Học sinh</th>
                  <th className="text-left">Email</th>
                  <th className="text-center">Có mặt</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td className="font-semibold text-gray-900">
                      {s.name || s.full_name}
                    </td>
                    <td className="text-gray-500">{s.email}</td>
                    <td className="text-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!attendance[s.id]}
                          onChange={(e) => handleCheck(s.id, e.target.checked)}
                          className="w-6 h-6 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 transition-all"
                        />
                        <span className="ml-2 text-base font-medium text-green-700 select-none">
                          {attendance[s.id] ? "Có mặt" : "Vắng"}
                        </span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"
              >
                Lưu điểm danh
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
