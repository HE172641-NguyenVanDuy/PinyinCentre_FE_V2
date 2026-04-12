import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/Shared/AuthContext";
import { apiFetch } from "../../utils/api";
import Header from "../../components/Admin/common/Header";

const StudentAttendancePage = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClasses();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (selectedClass) fetchAttendance(selectedClass);
    // eslint-disable-next-line
  }, [selectedClass]);

  const fetchClasses = async () => {
    if (!user) return;
    const res = await apiFetch("/student/classes");
    const data = await res.json();
    if (data.status === 200) {
      setClasses(data.result || []);
      if (data.result && data.result.length > 0)
        setSelectedClass(data.result[0].id);
    }
  };

  const fetchAttendance = async (classId) => {
    setLoading(true);
    try {
      // Lấy lịch học của lớp
      const resSchedules = await apiFetch(`/schedule/by-class/${classId}`);
      const dataSchedules = await resSchedules.json();
      const schedules = dataSchedules.data || [];
      // Lấy điểm danh của user cho tất cả schedule
      const resAttendance = await apiFetch(`/attendance/by-user/${user.id}`);
      const dataAttendance = await resAttendance.json();
      const attMap = {};
      if (
        dataAttendance.status === 200 &&
        Array.isArray(dataAttendance.result)
      ) {
        dataAttendance.result.forEach((a) => {
          attMap[a.scheduleId] = a;
        });
      }
      // Gộp lịch học với trạng thái điểm danh
      const merged = schedules.map((s) => ({
        scheduleId: s.id,
        classDate: s.classDate || s.class_date,
        className: s.classroom?.name || s.className,
        status: attMap[s.id]?.status,
      }));
      setAttendance(merged);
    } catch (e) {
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  const total = attendance.length;
  const absent = attendance.filter((a) => a.status === false).length;
  const absentList = attendance.filter((a) => a.status === false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header title="Tình trạng điểm danh của tôi" />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <label className="font-semibold mr-2">Chọn lớp:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="p-2 rounded border border-gray-300"
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <span className="font-bold">Tổng số buổi học: </span>
              {total}
              <span className="ml-4 font-bold text-red-500">
                Vắng: {absent}
              </span>
            </div>
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${total ? ((total - absent) / total) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Lớp</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((item) => (
                  <tr key={item.scheduleId}>
                    <td>{item.classDate}</td>
                    <td>{item.className}</td>
                    <td>
                      {item.status === true ? (
                        <span className="text-green-600 font-bold">Có mặt</span>
                      ) : item.status === false ? (
                        <span className="text-red-500 font-bold">Vắng</span>
                      ) : (
                        <span className="text-gray-400">Chưa điểm danh</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {absentList.length > 0 && (
              <div className="mt-6">
                <h3 className="font-bold text-red-600 mb-2">
                  Danh sách buổi vắng:
                </h3>
                <ul className="list-disc ml-6">
                  {absentList.map((a) => (
                    <li key={a.scheduleId}>
                      {a.classDate} - {a.className}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentAttendancePage;
