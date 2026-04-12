import React, { useEffect, useState } from "react";
import { apiFetch } from "../../utils/api";
import { toast } from "react-toastify";

const TeacherAttendanceModal = ({ scheduleId, onClose }) => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (scheduleId) fetchAttendance();
    // eslint-disable-next-line
  }, [scheduleId]);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/attendance/by-schedule/${scheduleId}`);
      const data = await res.json();
      if (data.status === 200) {
        setAttendanceList(data.result || []);
      } else {
        toast.error("Lỗi khi lấy danh sách điểm danh");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi kết nối với API");
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = (userId, checked) => {
    setAttendanceList((prev) =>
      prev.map((item) =>
        item.userId === userId ? { ...item, status: checked } : item
      )
    );
  };

  const handleSave = async () => {
    try {
      const res = await apiFetch("/attendance/save-all", {
        method: "POST",
        body: JSON.stringify(attendanceList),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === 200) {
        toast.success("Lưu điểm danh thành công!");
        onClose();
      } else {
        toast.error("Lưu điểm danh thất bại!");
      }
    } catch (error) {
      toast.error("Có lỗi khi lưu điểm danh");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Điểm danh buổi học</h2>
        {loading ? (
          <div>Đang tải...</div>
        ) : (
          <table className="w-full mb-4">
            <thead>
              <tr>
                <th className="text-left">Học sinh</th>
                <th className="text-center">Có mặt</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((item) => (
                <tr key={item.userId}>
                  <td>{item.userName}</td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={item.status}
                      onChange={(e) =>
                        handleCheck(item.userId, e.target.checked)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Đóng
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Lưu điểm danh
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendanceModal;
