import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaBookOpen,
  FaClock,
  FaUsers,
  FaCheckCircle,
  FaStar,
  FaAward,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Subscribe from "../../components/Subscribe/Subscribe";
import AOS from "aos";
import "aos/dist/aos.css";
const HSKCourses = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  const [expandedCourse, setExpandedCourse] = useState(null);

  const courses = [
    {
      id: 0,
      level: "HSK 1",
      target:
        "Thí sinh dự thi HSK1 hoặc học viên mới bắt đầu học tiếng Trung tại Pinyin Centre",
      outcome: "HSK1",
      sessions: 30,
      grammar: 74,
      content: [
        "Giới thiệu và luyện tập 74 điểm ngữ pháp cơ bản theo cấp độ NEW HSK1",
        "Làm quen với định dạng đề thi và luyện kỹ năng làm bài thi HSK1",
        "Học và ghi nhớ 300 từ vựng nền tảng, áp dụng trong giao tiếp đời sống",
      ],
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      id: 1,
      level: "HSK 2",
      target:
        "Thí sinh dự thi NEW HSK1, 2 hoặc học viên đang theo học/đã hoàn thành khóa Hán ngữ tích hợp New HSK 2 tại Pinyin Centre",
      outcome: "HSK2",
      sessions: 30,
      grammar: 121,
      content: [
        "Tổng hợp – củng cố 121 điểm ngữ pháp cấp độ NEW HSK2",
        "Làm quen và rèn luyện kĩ năng làm bài NEW HSK2",
        "Bổ sung từ vựng trong các chủ điểm liên quan, từ vựng xuất hiện trong đề thi NEW HSK 2",
      ],
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: 2,
      level: "HSK 3",
      target:
        "Thí sinh dự thi NEW HSK3 hoặc học viên đang theo học/đã hoàn thành khóa Hán ngữ tích hợp New HSK3 tại Pinyin Centre",
      outcome: "HSK3",
      sessions: 30,
      grammar: 81,
      content: [
        "Tổng hợp – củng cố 81 điểm ngữ pháp cấp độ NEW HSK3",
        "Làm quen và rèn luyện kĩ năng làm bài NEW HSK3",
        "Bổ sung từ vựng trong các chủ điểm liên quan, từ vựng xuất hiện trong đề thi NEW HSK 3",
      ],
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: 3,
      level: "HSK 4",
      target:
        "Thí sinh dự thi NEW HSK4 hoặc học viên đang theo học/đã hoàn thành khóa Hán ngữ tích hợp New HSK 4 tại Pinyin Centre",
      outcome: "HSK4",
      sessions: 30,
      grammar: 76,
      content: [
        "Tổng hợp – củng cố 76 điểm ngữ pháp cấp độ HSK4",
        "Làm quen và rèn luyện kĩ năng làm bàiHSK4",
        "Bổ sung từ vựng trong các chủ điểm liên quan, từ vựng xuất hiện trong đề thi HSK 4",
      ],
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      id: 4,
      level: "HSK 5",
      target:
        "Thí sinh dự thi HSK5 hoặc học viên đang theo học/đã hoàn thành khóa Hán ngữ tích hợp New HSK 5 tại Pinyin Centre",
      outcome: "HSK5",
      sessions: 35,
      grammar: 71,
      content: [
        "Tổng hợp – củng cố 71 điểm ngữ pháp cấp độ NEW HSK5",
        "Làm quen và rèn luyện kĩ năng làm bài NEW HSK5",
        "Bổ sung từ vựng trong các chủ điểm liên quan, từ vựng xuất hiện trong đề thi NEW HSK 5",
      ],
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      id: 5,
      level: "HSK 6",
      target:
        "Thí sinh dự thi HSK6 hoặc học viên đang theo học/đã hoàn thành khóa Hán ngữ tích hợp New HSK 6 tại Pinyin Centre",
      outcome: "HSK6",
      sessions: 40,
      grammar: 67,
      content: [
        "Tổng hợp – củng cố 67 điểm ngữ pháp cấp độ HSK6",
        "Làm quen và rèn luyện kĩ năng làm bài HSK6",
        "Bổ sung từ vựng trong các chủ điểm liên quan, từ vựng xuất hiện trong đề thi HSK 6",
      ],
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
  ];

  const features = [
    {
      icon: <FaBookOpen className="text-2xl" />,
      title: "Giáo trình độc quyền",
      description:
        "Tài liệu biên soạn riêng bởi giảng viên nhiều năm kinh nghiệm, thiết kế theo form đề thi mới nhất của Hanban",
    },
    {
      icon: <FaGraduationCap className="text-2xl" />,
      title: "Giáo viên chất lượng",
      description:
        "Đội ngũ giáo viên có trình độ sư phạm cao, học vị Thạc sĩ và Tiến sĩ, nhiều năm kinh nghiệm luyện thi HSK",
    },
    {
      icon: <FaAward className="text-2xl" />,
      title: "Cam kết đỗ",
      description:
        "Pinyin Centre cam kết đỗ nếu học và ôn thi đầy đủ theo lộ trình. Nếu trượt sẽ được học lại miễn phí",
    },
    {
      icon: <FaStar className="text-2xl" />,
      title: "Sát đề thi thật",
      description:
        "Tài liệu có tính nâng cao, sát với đề thi thật và cập nhật theo xu hướng mới nhất",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 20, stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-yellow-600/10"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl  lg:text-6xl font-black bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 dark:from-yellow-300 dark:via-red-400
             dark:to-red-300 bg-clip-text text-transparent mb-6 leading-tight" style={{ lineHeight: "1.55" }}>
              Khóa Luyện Thi HSK
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Hệ thống khóa học luyện thi HSK chuyên nghiệp từ cấp độ 2 đến 6,
              với cam kết đỗ và phương pháp giảng dạy hiệu quả tại Pinyin Centre
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { number: "5", label: "Cấp độ HSK", icon: <FaGraduationCap /> },
                { number: "165", label: "Buổi học tổng", icon: <FaClock /> },
                { number: "416", label: "Điểm ngữ pháp", icon: <FaBookOpen /> },
                {
                  number: "100%",
                  label: "Cam kết đỗ",
                  icon: <FaCheckCircle />,
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                >
                  <div className="text-red-600 dark:text-yellow-400 mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
          >
            Các Khóa Học Luyện Thi HSK
          </motion.h2>

          <div className="grid gap-8 max-w-6xl mx-auto">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                className={`${course.bgColor} dark:bg-gray-800 rounded-2xl border-2 ${course.borderColor} dark:border-gray-700 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="p-6">
                  {/* Course Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div className="flex items-center mb-4 lg:mb-0">
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-r ${course.color} flex items-center justify-center text-white text-2xl font-bold mr-4`}
                      >
                        {course.level.split(" ")[2]}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                          Luyện thi {course.level}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Đạt chứng chỉ {course.outcome}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg px-4 py-2 shadow-sm">
                        <FaClock className="text-red-600 dark:text-yellow-400 mr-2" />
                        <span className="font-semibold text-gray-800 dark:text-white">
                          {course.sessions} buổi
                        </span>
                      </div>
                      <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg px-4 py-2 shadow-sm">
                        <FaBookOpen className="text-red-600 dark:text-yellow-400 mr-2" />
                        <span className="font-semibold text-gray-800 dark:text-white">
                          {course.grammar} ngữ pháp
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                      <FaUsers className="text-red-600 dark:text-yellow-400 mr-2" />
                      Đối tượng học viên
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {course.target}
                    </p>
                  </div>

                  {/* Course Content */}
                  <div>
                    <button
                      onClick={() =>
                        setExpandedCourse(
                          expandedCourse === course.id ? null : course.id
                        )
                      }
                      className="flex items-center justify-between w-full text-left mb-4"
                    >
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                        <FaBookOpen className="text-red-600 dark:text-yellow-400 mr-2" />
                        Nội dung khóa học
                      </h4>
                      {expandedCourse === course.id ? (
                        <FaChevronUp className="text-gray-600 dark:text-gray-400" />
                      ) : (
                        <FaChevronDown className="text-gray-600 dark:text-gray-400" />
                      )}
                    </button>

                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedCourse === course.id ? "auto" : 0,
                        opacity: expandedCourse === course.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3">
                        {course.content.map((item, idx) => (
                          <div key={idx} className="flex items-start">
                            <FaCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-gray-700 dark:text-gray-300">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
            >
              Ưu Điểm Nổi Bật
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
                >
                  <div className="text-red-600 dark:text-yellow-400 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-600 to-yellow-600 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Sẵn sàng chinh phục chứng chỉ HSK?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Đăng ký ngay để nhận tư vấn lộ trình học phù hợp và ưu đãi đặc
              biệt từ Pinyin Centre
            </p>
          </motion.div>

          {/* Subscribe Component */}
          <div className="max-w-full mx-auto">
            <Subscribe />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HSKCourses;
