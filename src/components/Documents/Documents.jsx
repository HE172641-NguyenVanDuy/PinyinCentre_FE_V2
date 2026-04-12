import React, { useState } from "react";

const removeVietnameseDiacritics = (str) => {
  return str
    .normalize("NFD") // Chuyển thành dạng Unicode tổ hợp (tách dấu ra)
    .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ dấu
};

// Dữ liệu mẫu cho tài liệu
const documentsData = [
  {
    id: 1,
    title: "Ngữ Pháp HSK1",
    description:
      "Tổng hợp các loại từ, loại câu thường gặp trong hsk1",
    image:
      "https://fangfang.edu.vn/wp-content/uploads/2024/09/anh-dai-dien-trung-19.jpg", // Thay thế bằng link ảnh tài liệu thực tế
    link: "https://drive.google.com/file/d/1MZRf_a8a616ku6uzpA7lCVwRIt_nYmu1/view?usp=sharing", // Link tài liệu
  },
  {
    id: 2,
    title: "Trọn bộ 500 từ vựng tiếng Trung HSK1",
    description: "Tài liệu tổng hợp 500 từ vựng thường gặp trong các bài thi HSK1HSK1",
    image:
      "https://thanhmaihsk.edu.vn/wp-content/uploads/2021/09/so-tay-tu-vung-new-hsk2-400x400.png",
    link: "https://drive.google.com/file/d/1wna6d8bJt89u62O6OxDxbwdwpoBgqXNv/view?usp=sharing",
  },
  {
    id: 3,
    title: "Tài liệu ngữ pháp",
    description:
      "Khóa học dành cho những người muốn nâng cao khả năng nghe, nói, đọc, viết tiếng Trung.",
    image:
      "https://thanhmaihsk.edu.vn/wp-content/uploads/2021/09/so-tay-tu-vung-new-hsk2-400x400.png",
    link: "https://example.com/document3.pdf",
  },
  {
    id: 4,
    title: "Tài liệu ngữ pháp",
    description: "Khóa học nâng cao kỹ năng nghe, nói, đọc, viết tiếng Trung.",
    image:
      "https://thanhmaihsk.edu.vn/wp-content/uploads/2021/09/so-tay-tu-vung-new-hsk2-400x400.png",
    link: "https://example.com/document4.pdf",
  },
  {
    id: 5,
    title: "Tài liệu ngữ pháp",
    description: "Khóa học nâng cao kỹ năng nghe, nói, đọc, viết tiếng Trung.",
    image:
      "https://thanhmaihsk.edu.vn/wp-content/uploads/2021/09/so-tay-tu-vung-new-hsk2-400x400.png",
    link: "https://example.com/document4.pdf",
  },
  {
    id: 6,
    title: "Tài liệu ngữ pháp",
    description: "Khóa học nâng cao kỹ năng nghe, nói, đọc, viết tiếng Trung.",
    image:
      "https://thanhmaihsk.edu.vn/wp-content/uploads/2021/09/so-tay-tu-vung-new-hsk2-400x400.png",
    link: "https://example.com/document4.pdf",
  },
  {
    id: 7,
    title: "Khóa Học Tiếng Trung Cao Cấp",
    description: "Khóa học nâng cao kỹ năng nghe, nói, đọc, viết tiếng Trung.",
    image:
      "https://thanhmaihsk.edu.vn/wp-content/uploads/2021/09/so-tay-tu-vung-new-hsk2-400x400.png",
    link: "https://example.com/document4.pdf",
  },
  {
    id: 8,
    title: "Khóa Học Tiếng Trung Cao Cấp",
    description: "Khóa học nâng cao kỹ năng nghe, nói, đọc, viết tiếng Trung.",
    image:
      "https://thanhmaihsk.edu.vn/wp-content/uploads/2021/09/so-tay-tu-vung-new-hsk2-400x400.png",
    link: "https://example.com/document4.pdf",
  },
  {
    id: 9,
    title: "Khóa Học Tiếng Trung Cao Cấp",
    description: "Khóa học nâng cao kỹ năng nghe, nói, đọc, viết tiếng Trung.",
    image:
      "https://thanhmaihsk.edu.vn/wp-content/uploads/2021/09/so-tay-tu-vung-new-hsk2-400x400.png",
    link: "https://example.com/document4.pdf",
  },
  {
    id: 10,
    title: "Khóa Học Tiếng Trung Cao Cấp",
    description: "Khóa học nâng cao kỹ năng nghe, nói, đọc, viết tiếng Trung.",
    image:
      "https://thanhmaihsk.edu.vn/wp-content/uploads/2021/09/so-tay-tu-vung-new-hsk2-400x400.png",
    link: "https://example.com/document4.pdf",
  },
];

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 9;
  const [selectedDocument, setSelectedDocument] = useState(null);

  const normalizedSearchTerm = removeVietnameseDiacritics(
    searchTerm.toLowerCase()
  );

  const filteredDocuments = documentsData.filter(
    (doc) =>
      removeVietnameseDiacritics(doc.title.toLowerCase()).includes(
        normalizedSearchTerm
      ) ||
      removeVietnameseDiacritics(doc.description.toLowerCase()).includes(
        normalizedSearchTerm
      )
  );

  const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage);
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = filteredDocuments.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  // Hàm chuyển trang
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-red-600 dark:text-yellow-400 mb-8">
        Thư Viện Tài Liệu
      </h1>

      {/* Ô tìm kiếm */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm tài liệu..."
          className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Danh sách tài liệu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentDocuments.map((document) => (
          <div
            key={document.id}
            onClick={() => setSelectedDocument(document)}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="relative overflow-hidden">
              <img
                src={document.image}
                alt={document.title}
                className="w-full h-48 object-cover transform transition duration-300 hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-red-600 dark:text-yellow-400 mb-2">
                {document.title}
              </h2>
              <p
                className="text-gray-600 dark:text-gray-300 text-sm mb-4"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {document.description}
              </p>
              <a
                href={document.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white py-2 px-4 rounded-lg inline-block text-center w-full transition duration-300 hover:bg-[#ff5733]"
              >
                Tải Tài Liệu
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal hiển thị chi tiết tài liệu */}
      {selectedDocument && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold text-red-600 dark:text-yellow-400 mb-4">
              {selectedDocument.title}
            </h2>
            <img
              src={selectedDocument.image}
              alt={selectedDocument.title}
              className="w-full h-48 object-cover mb-4"
            />
            <p className="text-gray-600 dark:text-gray-300">
              {selectedDocument.description}
            </p>
            <a
              href={selectedDocument.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-primary text-white py-2 px-4 rounded-lg mt-4 transition duration-300 hover:bg-[#ff5733]"
            >
              Tải Tài Liệu
            </a>
            <button
              onClick={() => setSelectedDocument(null)}
              className="block w-full mt-4 py-2 text-center text-red-600 dark:text-yellow-400 hover:underline"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Phân trang */}
      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex items-center space-x-2">
            {/* Nút "Previous" */}
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg border text-red-600 dark:text-yellow-400 border-red-600 dark:border-yellow-400 hover:bg-red-600 hover:text-white transition duration-300 ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>
            </li>

            {/* Hiển thị số trang */}
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <li key={pageNumber}>
                    <button
                      onClick={() => paginate(pageNumber)}
                      className={`px-4 py-2 rounded-lg border ${
                        currentPage === pageNumber
                          ? "bg-red-600 text-white"
                          : "bg-white dark:bg-gray-800 text-red-600 dark:text-yellow-400 border-red-600 dark:border-yellow-400 hover:bg-red-600 hover:text-white"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  </li>
                );
              }
              return <li key={pageNumber}>...</li>;
            })}

            {/* Nút "Next" */}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg border text-red-600 dark:text-yellow-400 border-red-600 dark:border-yellow-400 hover:bg-red-600 hover:text-white transition duration-300 ${
                  currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Documents;
