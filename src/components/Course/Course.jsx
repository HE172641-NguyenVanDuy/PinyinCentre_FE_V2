import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Course1 = "/assets/courses/course1.jpg";
const Course2 = "/assets/courses/online.jpg";

const courses = [
  {
    id: 1,
    image: Course1,
    title: "KHÓA LUYỆN THI HSK 1-6",
    description:
      "Từ vựng, ngữ pháp, 4 kỹ năng Nghe – Nói – Đọc – Viết, luyện đề thi thật từ cơ bản đến nâng cao (HSK 1-6).",
    subDescription:
      "Cam kết đầu ra đúng trình độ, tăng phản xạ, đạt điểm HSK mục tiêu. Phù hợp người mới bắt đầu, học sinh, người đi làm cần chứng chỉ từ cấp độ cơ bản đến cao cấp.",
    detailPath: "/courses/hsk",
  },
  {
    id: 2,
    image: Course2,
    title: "Combo HSK Online – Học Trọn Bộ Tại Nhà",
    description:
      "Gói combo học online HSK từ cấp 1 đến 6 theo lộ trình HSK mới (2021), học trực tiếp qua Zoom/Meet với giáo viên – lý tưởng cho người bận rộn thi HSK.",
    subDescription:
      "Tiết kiệm đến 40% học phí so với offline. Tài liệu độc quyền, luyện 4 kỹ năng, thi thử định kỳ, hỗ trợ đăng ký thi thật, cam kết đầu ra rõ ràng.",
    detailPath: "/courses/combo-hsk",
  },
];

const Courses = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, delay: 100, once: true });
  }, []);

  const handleScrollToSubscribe = () => {
    const element = document.getElementById("subscribe");
    if (element) {
      const offset = 160;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  const handleViewDetails = (detailPath) => {
    navigate(detailPath);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1
        data-aos="fade-up"
        className="text-4xl sm:text-5xl font-extrabold text-center text-red-600 dark:text-yellow-300 mb-14"
      >
        KHÓA HỌC LUYỆN THI HSK & GIAO TIẾP TIẾNG TRUNG
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {courses.map((course) => (
          <div
            key={course.id}
            data-aos="zoom-in-up"
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
          >
            <div className="overflow-hidden rounded-t-3xl">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-64 object-cover hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center text-red-600 dark:text-yellow-300 mb-4">
                {course.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {course.description}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {course.subDescription}
              </p>

              {/* Button Group */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                <button
                  onClick={() => handleViewDetails(course.detailPath)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transition"
                >
                  📖 Chi tiết khóa học
                </button>
                <button
                  onClick={handleScrollToSubscribe}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transition"
                >
                  🚀 Đăng ký ngay
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
