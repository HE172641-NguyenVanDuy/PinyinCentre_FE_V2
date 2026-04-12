import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Search } from "lucide-react";
import { apiFetch } from "../../../utils/api";

const StudentListModal = ({ classId, onClose, onAddSuccess }) => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 5;

  // Lấy danh sách học sinh chưa có trong lớp
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/user/students/not-in-class/${classId}`);
      const data = await res.json();
      if (data.status === 200 && Array.isArray(data.data)) {
        setStudents(data.data);
        setFilteredStudents(data.data);
      } else {
        toast.error("Lấy dữ liệu học sinh thất bại");
      }
    } catch (error) {
      console.error("Lỗi lấy học sinh:", error);
      toast.error("Lỗi khi lấy danh sách học sinh");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [classId]);

  // Tìm kiếm học sinh
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = students.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term)
    );
    setFilteredStudents(filtered);
    setCurrentPage(1);
  };

  // Xử lý checkbox
  const handleCheckboxChange = (studentId) => {
    setSelectedStudentIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Thêm học sinh
  const handleAddStudent = async () => {
    if (selectedStudentIds.length === 0) {
      toast.error("Vui lòng chọn ít nhất một học sinh");
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch("/classroom/add-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          class_id: classId,
          user_ids: selectedStudentIds,
        }),
      });
      const result = await res.json();
      if (result.status === 200) {
        toast.success("Thêm học sinh thành công");
        onAddSuccess();
      } else {
        toast.error(
          `Thêm học sinh thất bại: ${result.message || "Không rõ nguyên nhân"}`
        );
      }
    } catch (error) {
      console.error("Lỗi thêm học sinh:", error);
      toast.error("Lỗi khi thêm học sinh");
    } finally {
      setLoading(false);
    }
  };

  // Phân trang
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">
          Thêm học sinh vào lớp
        </h3>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Tìm tên hoặc email..."
            className="w-full bg-gray-700 text-white rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
            disabled={loading}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Chọn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Số điện thoại
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {paginatedStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={selectedStudentIds.includes(student.id)}
                      onChange={() => handleCheckboxChange(student.id)}
                      className="form-checkbox h-4 w-4 text-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {student.phone_number || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || loading}
              className="px-3 py-1 rounded-md bg-gray-700 text-white disabled:opacity-40"
            >
              « Prev
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(page)}
                  disabled={loading}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || loading}
              className="px-3 py-1 rounded-md bg-gray-700 text-white disabled:opacity-40"
            >
              Next »
            </button>
          </div>
        )}

        {loading && (
          <p className="text-gray-300 mt-4 text-center">Đang tải dữ liệu...</p>
        )}

        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm"
          >
            Hủy
          </button>
          <button
            onClick={handleAddStudent}
            disabled={loading || selectedStudentIds.length === 0}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
          >
            {loading ? "Đang thêm..." : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentListModal;
