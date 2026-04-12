import React, { useEffect, useState } from "react";
import { apiFetch } from "../../utils/api";
import { useAuth } from "../../components/Shared/AuthContext";
import { CheckCircle, XCircle, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import FloatingChatIcons from "../../components/Shared/FloatingChatIcons";

const StudentAttendanceStatus = () => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    fetchAttendance();
    // eslint-disable-next-line
  }, [user]);

  const fetchAttendance = async () => {
    if (!user) return;
    const res = await apiFetch(`/attendance/by-user/${user.id}`);
    const data = await res.json();
    if (data.status === 200) {
      setAttendance(data.result || []);
      const total = data.result.length;
      const present = data.result.filter((a) => a.status).length;
      setPercent(total ? Math.round((present / total) * 100) : 0);
    }
  };

  const total = attendance.length;
  const present = attendance.filter((a) => a.status).length;
  const absent = total - present;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto mb-8"
    >
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-xl p-6 border border-blue-100">
        <div className="mb-6 flex items-center gap-3">
          <CalendarDays className="h-7 w-7 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900">
            Tình trạng điểm danh
          </h2>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:gap-8 gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold text-base shadow-sm">
              <CheckCircle className="h-5 w-5 mr-1 text-green-500" />
              Có mặt: {present}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-600 font-bold text-base shadow-sm">
              <XCircle className="h-5 w-5 mr-1 text-red-500" />
              Vắng: {absent}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-base shadow-sm">
              Tổng: {total}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <span className="font-semibold text-blue-700 text-base">
              Tỉ lệ đi học:
            </span>
            <span className="inline-block min-w-[40px] px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-base shadow">
              {total ? percent : 0}%
            </span>
          </div>
        </div>
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1 }}
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full shadow"
              style={{ width: `${percent}%` }}
            ></motion.div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full rounded-xl overflow-hidden shadow border border-blue-100 bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-blue-100 to-purple-100">
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  Ngày
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  Lớp
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((item, idx) => (
                <tr
                  key={item.attendanceId}
                  className={
                    idx % 2 === 0
                      ? "bg-white hover:bg-blue-50 transition-all"
                      : "bg-blue-50 hover:bg-blue-100 transition-all"
                  }
                >
                  <td className="py-2 px-4 text-gray-800">{item.classDate}</td>
                  <td className="py-2 px-4 text-gray-800">{item.className}</td>
                  <td className="py-2 px-4">
                    {item.status ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700 font-bold">
                        <CheckCircle className="h-4 w-4 mr-1 text-green-500" />{" "}
                        Có mặt
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-600 font-bold">
                        <XCircle className="h-4 w-4 mr-1 text-red-500" /> Vắng
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {attendance.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-gray-400">
                    Không có dữ liệu điểm danh.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <FloatingChatIcons />
    </motion.div>
  );
};

export default StudentAttendanceStatus;
