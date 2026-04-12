import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../../utils/api";

const RegistrationTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 5;
  const navigate = useNavigate();

  // Gọi API để lấy danh sách học viên theo vai trò
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/user/get-users-by-role/3`);
      const data = await res.json();
      if (data.status === 200 && Array.isArray(data.result)) {
        setStudents(data.result);
        setFilteredList(data.result);
      } else {
        toast.error("Lấy dữ liệu học viên thất bại");
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách học viên:", error);
      toast.error("Lỗi khi lấy danh sách học viên");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Tải danh sách học viên theo vai trò (ví dụ: 2 = user, 3 = teacher)
    loadData(2); // Vai trò 2 là người dùng (user)
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = students.filter(
      (item) =>
        item.fullName.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term) ||
        item.phoneNumber.toLowerCase().includes(term) ||
        item.address?.toLowerCase().includes(term) // Thêm tìm kiếm theo địa chỉ
    );
    setFilteredList(filtered);
    setCurrentPage(1);
  };

  const handleAddStudent = () => {
    navigate(`/admin/create-user`);
  };

  const handleBanUnban = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1; // Toggle ban/unban
    try {
      setLoading(true);
      const res = await apiFetch(`/user/update-status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await res.json();

      if (result.status === 200) {
        toast.success(
          currentStatus === 1
            ? "Học viên đã bị cấm"
            : "Học viên đã được mở khóa"
        );
        loadData(); // Tải lại danh sách sau khi cập nhật
      } else {
        toast.error("Lỗi khi cập nhật trạng thái");
      }
    } catch (err) {
      toast.error("Lỗi khi cập nhật trạng thái");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);
  const paginatedData = filteredList.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100">
            Danh sách học viên
          </h2>
          <button
            onClick={handleAddStudent}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
          >
            + Thêm học viên
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Họ tên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Số điện thoại
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Giới tính
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Địa chỉ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Ngày đăng ký
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
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
                    {item.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.gender === 0 ? "Nam" : "Nữ"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(item.createdDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 space-x-2 flex items-center">
                    <button
                      onClick={() => handleBanUnban(item.id, item.status)}
                      className={`${
                        item.status === 1 ? "bg-red-500" : "bg-yellow-500"
                      } hover:bg-${
                        item.status === 1 ? "red" : "yellow"
                      }-600 text-white px-3 py-1 rounded-md text-xs ml-2`}
                      disabled={loading}
                    >
                      {item.status === 1 ? "Ban" : "Unban"}
                    </button>
                    <a
                      href={`https://zalo.me/${item.phoneNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md text-xs ml-2"
                    >
                      Liên hệ
                    </a>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PHÂN TRANG */}
        {totalPages > 1 && (
          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || loading}
              className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-40"
            >
              &laquo; Prev
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
              Next &raquo;
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center text-gray-400 mt-4">
            Đang tải dữ liệu...
          </div>
        )}
      </motion.div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default RegistrationTable;
