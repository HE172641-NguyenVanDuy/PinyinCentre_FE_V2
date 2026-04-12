import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../../utils/api";
const RegistrationTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const rowsPerPage = 5;
  const navigate = useNavigate();
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await apiFetch(
        "/registration-info/get-not-registered"
      );
      const data = await res.json();
      if (data.status === 200 && Array.isArray(data.result)) {
        setRegistrations(data.result);
        setFilteredList(data.result);
      } else if (data.data && Array.isArray(data.data)) {
        setRegistrations(data.data);
        setFilteredList(data.data);
      } else {
        toast.error("Lấy dữ liệu thất bại");
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách đăng ký:", error);
      toast.error("Lỗi khi lấy danh sách đăng ký");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = registrations.filter(
      (item) =>
        item.fullName.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term) ||
        item.phoneNumber.toLowerCase().includes(term) ||
        item.courseName?.toLowerCase().includes(term)
    );
    setFilteredList(filtered);
    setCurrentPage(1);
  };

  // Mở modal confirm xóa
  const openConfirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  // Đóng modal confirm xóa
  const closeConfirmDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  // Xác nhận xóa thực tế
  const confirmDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      const res = await apiFetch(
        `/registration-info/delete/${deleteId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Xóa thất bại");
      toast.success("Xóa thành công");
      await loadData();
    } catch (error) {
      toast.error(error.message || "Lỗi khi xóa");
    } finally {
      setLoading(false);
      closeConfirmDelete();
    }
  };

  const handleAddStudent = (item) => {
    const queryParams = new URLSearchParams({
      fullName: item.fullName,
      phoneNumber: item.phoneNumber,
      email: item.email,
    }).toString();
    navigate(`/admin/create-user?${queryParams}`);
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
            Danh sách đăng ký
          </h2>
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
                  Khóa học
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
                    {item.courseName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(item.createdDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 space-x-2 flex items-center">
                    <>
                      <button
                        onClick={() => handleAddStudent(item)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs"
                        disabled={loading}
                      >
                        + Học viên
                      </button>
                      <button
                        onClick={() => openConfirmDelete(item.id)}
                        disabled={loading}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs ml-2"
                      >
                        Xóa
                      </button>
                    </>
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

      {/* Modal confirm xóa */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-80 text-center text-white">
            <p className="mb-4">Bạn có chắc muốn xóa đăng ký này không?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                disabled={loading}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Xóa
              </button>
              <button
                onClick={closeConfirmDelete}
                disabled={loading}
                className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default RegistrationTable;
