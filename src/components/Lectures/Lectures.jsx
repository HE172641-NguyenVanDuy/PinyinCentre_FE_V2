import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const Lecture1 = "/assets/Lecture/l1.png";
const Lecture2 = "/assets/Lecture/l2.png";
const Lecture3 = "/assets/Lecture/l3.png";

const TeachersData = [
  {
    id: 1,
    img: Lecture1,
    name: "Trần Thi Bình",
    description:
      "Tốt nghiệp loại giỏi khoa Ngôn Ngữ Trung, trình độ HSK 6, HSKK cao cấp.",
  },
  {
    id: 2,
    img: Lecture2,
    name: "Lưu Quỳnh Chi",
    description:
      "Trình độ HSK5+, nhiều kinh nghiệm giảng dạy tiếng Trung và tiếng Nhật.",
  },
  {
    id: 3,
    img: Lecture3,
    name: "Hoàng Đức Bình",
    description:
      "3 năm kinh nghiệm giảng dạy tiếng Trung phồn thể và giản thể, trình độ HSK6, HSKK cao cấp.",
  },
];

const Teachers = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(TeachersData.length / itemsPerPage);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const nextPage = () => {
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setDirection(-1);
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        {/* Header */}
        <div
          className="text-center mb-10 max-w-[600px] mx-auto"
          data-aos="fade-up"
        >
          <p className="text-sm text-primary uppercase tracking-wide">
            Đội Ngũ Giảng Viên
          </p>
          <h2 className="text-3xl font-bold mb-2">Giảng Viên Hàng Đầu</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Chúng tôi tự hào với đội ngũ giảng viên chất lượng cao, giàu kinh
            nghiệm và tận tâm với học viên.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center">
          {/* Left button */}
          <button
            onClick={prevPage}
            className="absolute left-0 z-10 bg-primary text-white p-3 rounded-full shadow-lg hover:scale-110 hover:bg-red-600 transition"
          >
            <FaChevronLeft />
          </button>

          {/* Content */}
          <div className="w-full flex justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 pb-24"
              >
                {TeachersData.slice(
                  currentPage * itemsPerPage,
                  (currentPage + 1) * itemsPerPage
                ).map((teacher) => (
                  <div
                    key={teacher.id}
                    className="bg-orange-100 dark:bg-orange-900 hover:bg-orange-200 dark:hover:bg-orange-700 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5"
                  >
                    <img
                      src={teacher.img}
                      alt={teacher.name}
                      className="h-[250px] w-[200px] object-cover rounded-xl mb-5 transform hover:scale-105 transition duration-500"
                    />
                    <h3 className="text-xl font-bold mb-2">{teacher.name}</h3>
                    <p className="text-sm text-gray-700 dark:text-white">
                      {teacher.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right button */}
          <button
            onClick={nextPage}
            className="absolute right-0 z-10 bg-primary text-white p-3 rounded-full shadow-lg hover:scale-110 hover:bg-red-600 transition"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
