import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaLaptop,
  FaWifi,
  FaGraduationCap,
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaStar,
  FaGift,
  FaVideo,
  FaDownload,
  FaChartLine,
  FaGlobe,
  FaHeadset,
  FaAward,
  FaPlay,
  FaChevronDown,
  FaChevronUp,
  FaBookOpen,
} from "react-icons/fa";
import Subscribe from "../../components/Subscribe/Subscribe";

const ComboHSKCourses = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  const [expandedCombo, setExpandedCombo] = useState(null);
  const [activeTab, setActiveTab] = useState("benefits");

  const comboCourses = [
    {
      id: 1,
      title: "COMBO HSK 1 – 2",
      subtitle: "(MỚI BẮT ĐẦU)",
      level: "Cơ bản",
      vocabulary: "300",
      target: "Thi đậu HSK2 – giao tiếp cơ bản đời sống",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      content: [
        "Làm quen pinyin, phát âm chuẩn",
        "300 từ vựng & ngữ pháp cơ bản",
        "Giao tiếp đời sống đơn giản: chào hỏi, ăn uống, hỏi đường",
        "Luyện đề thi HSK 1 – 2, hướng dẫn kỹ năng làm bài",
      ],
    },
    {
      id: 2,
      title: "COMBO HSK 3 – 4",
      subtitle: "(TRUNG CẤP)",
      level: "Trung cấp",
      vocabulary: "1200+",
      target: "Thi đậu HSK4 – đủ tiêu chuẩn du học hệ tiếng Trung",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      content: [
        "1200+ từ vựng HSK, ngữ pháp giao tiếp mở rộng",
        "Luyện nghe – nói – đọc – viết tích hợp",
        "Viết đoạn văn ngắn, thảo luận các chủ đề học thuật",
        "Thi thử HSK 3 – 4, luyện đề sát đề thi thật",
      ],
    },
    {
      id: 3,
      title: "COMBO HSK 5 – 6",
      subtitle: "(NÂNG CAO)",
      level: "Nâng cao",
      vocabulary: "2500+",
      target:
        "Thi đậu HSK6 – đủ điều kiện xin học bổng, làm phiên dịch, nghiên cứu",
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      content: [
        "2500+ từ vựng chuyên sâu + cấu trúc học thuật",
        "Kỹ năng đọc báo, luận văn, viết bài nghị luận",
        "Luyện tập phần viết dài và xử lý đề thi nâng cao",
        "Rèn phản xạ ngôn ngữ phục vụ dịch thuật, giảng dạy, nghiên cứu",
      ],
    },
  ];

  const targetAudience = [
    "Học sinh, sinh viên, người đi làm bận rộn",
    "Người mới bắt đầu học tiếng Trung hoặc đã học nhưng chưa có chứng chỉ",
    "Người ở xa trung tâm, muốn học online nhưng vẫn được kèm sát, có lộ trình",
    "Người cần thi chứng chỉ HSK để du học, định cư, nộp hồ sơ học bổng, hoặc làm việc tại công ty Trung Quốc",
  ];

  const learningProcess = [
    {
      icon: <FaVideo className="text-2xl" />,
      title: "Học trực tuyến tương tác",
      description:
        "Học qua Zoom hoặc Google Meet với giáo viên giảng dạy trực tiếp",
    },
    {
      icon: <FaDownload className="text-2xl" />,
      title: "Tài liệu đầy đủ",
      description:
        "Tài liệu bài giảng, video bài học, flashcard từ vựng cập nhật qua Google Drive",
    },
    {
      icon: <FaPlay className="text-2xl" />,
      title: "Ghi hình ôn tập",
      description:
        "Mỗi buổi đều có file ghi hình lại, học viên có thể ôn tập bất cứ lúc nào",
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Nhóm hỗ trợ",
      description: "Tham gia nhóm Zalo/Telegram để trao đổi, hỏi bài, chữa lỗi",
    },
    {
      icon: <FaChartLine className="text-2xl" />,
      title: "Thi thử định kỳ",
      description:
        "Định kỳ thi thử online, chấm điểm và tư vấn điểm mạnh – điểm yếu cá nhân",
    },
  ];

  const benefits = [
    "Học online nhưng tương tác trực tiếp 100% với giáo viên",
    "Có bài tập, chấm chữa đầy đủ như học offline",
    "Học linh hoạt tại nhà – phù hợp mọi tỉnh thành",
    "Hỗ trợ tạo tài khoản thi thử, đăng ký thi thật HSK",
    "Cam kết chất lượng – học lại miễn phí nếu không đạt kết quả đã cam kết",
  ];

  const gifts = [
    "Tặng kèm bộ đề luyện HSK PDF",
    "Từ vựng theo cấp độ",
    "Thẻ học flashcard",
    "Ưu đãi 5-10% nếu đăng ký sớm hoặc đăng ký theo nhóm",
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

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-red-200 dark:bg-yellow-200 rounded-full opacity-20"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5,
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-red-600 to-yellow-600
               text-white px-6 py-2 rounded-full text-lg font-semibold">
                💻 KHÓA HỌC COMBO HSK ONLINE
              </div>
            </div>

            <h1 className="text-4xl lg:text-6xl font-black bg-gradient-to-r
             from-red-600 via-red-500 to-yellow-500 dark:from-yellow-300
              dark:via-red-400 dark:to-red-300 bg-clip-text text-transparent
               mb-6 leading-tight" style={{ lineHeight: "1.55" }}>
              Lộ Trình Chinh Phục Tiếng Trung Tại Nhà
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Học mọi lúc mọi nơi, chỉ cần có mạng Internet. Thi HSK để du học,
              xin học bổng, làm việc với doanh nghiệp Trung Quốc
            </p>

            {/* Pain Points */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              {[
                { icon: <FaClock />, text: "Không có thời gian đến lớp?" },
                { icon: <FaWifi />, text: "Muốn học mọi lúc mọi nơi?" },
                {
                  icon: <FaGraduationCap />,
                  text: "Muốn thi HSK du học, làm việc?",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                >
                  <div className="text-red-600 dark:text-yellow-400 mb-3 flex justify-center text-2xl">
                    {item.icon}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gradient-to-r from-red-600 to-yellow-600 text-white rounded-2xl p-8 max-w-3xl mx-auto"
            >
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                🎯 Vậy thì Combo HSK Online tại Pinyin Centre chính là lựa chọn
                lý tưởng cho bạn!
              </h2>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* What is Combo HSK Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-gray-800 dark:text-white">
              📘 KHÓA HỌC COMBO HSK LÀ GÌ?
            </h2>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Combo HSK là gói học online trọn bộ, được thiết kế theo lộ trình
                HSK mới (2021), giúp học viên học liền mạch từ HSK1 đến HSK6 mà
                không cần tìm lớp lẻ tẻ.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Bạn chỉ cần thiết bị kết nối Internet, toàn bộ chương trình học
                sẽ diễn ra qua lớp học trực tuyến có giáo viên giảng dạy và
                tương tác trực tiếp – y như học offline!
              </p>
            </div>
          </motion.div>

          {/* Target Audience */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-2xl lg:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              👩‍🏫 AI PHÙ HỢP VỚI KHÓA NÀY?
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {targetAudience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">{item}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Combo Courses Section */}
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
              🧭 NỘI DUNG CHƯƠNG TRÌNH HỌC
            </motion.h2>

            <div className="grid gap-8 max-w-6xl mx-auto">
              {comboCourses.map((combo, index) => (
                <motion.div
                  key={combo.id}
                  variants={itemVariants}
                  className={`${combo.bgColor} dark:bg-gray-800 rounded-2xl border-2 ${combo.borderColor} dark:border-gray-700 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="p-6">
                    {/* Combo Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div className="flex items-center mb-4 lg:mb-0">
                        <div
                          className={`w-20 h-20 rounded-xl bg-gradient-to-r ${combo.color} flex items-center justify-center text-white text-lg font-bold mr-6`}
                        >
                          📗📘📙
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                            {combo.title}
                          </h3>
                          <p className="text-lg text-gray-600 dark:text-gray-300 font-semibold">
                            {combo.subtitle}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {combo.level}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg px-4 py-2 shadow-sm">
                          <FaBookOpen className="text-red-600 dark:text-yellow-400 mr-2" />
                          <span className="font-semibold text-gray-800 dark:text-white">
                            {combo.vocabulary} từ vựng
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Target */}
                    <div className="mb-6">
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
                          🎯 Mục tiêu:
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">
                          {combo.target}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <button
                        onClick={() =>
                          setExpandedCombo(
                            expandedCombo === combo.id ? null : combo.id
                          )
                        }
                        className="flex items-center justify-between w-full text-left mb-4"
                      >
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                          <FaBookOpen className="text-red-600 dark:text-yellow-400 mr-2" />
                          Nội dung chi tiết
                        </h4>
                        {expandedCombo === combo.id ? (
                          <FaChevronUp className="text-gray-600 dark:text-gray-400" />
                        ) : (
                          <FaChevronDown className="text-gray-600 dark:text-gray-400" />
                        )}
                      </button>

                      <motion.div
                        initial={false}
                        animate={{
                          height: expandedCombo === combo.id ? "auto" : 0,
                          opacity: expandedCombo === combo.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-3">
                          {combo.content.map((item, idx) => (
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
      </div>

      {/* Learning Process Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            💡 HỌC ONLINE NHƯ THẾ NÀO?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningProcess.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
              >
                <div className="text-red-600 dark:text-yellow-400 mb-4 flex justify-center">
                  {process.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  {process.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {process.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Benefits & Gifts Section */}
      <div className="bg-gradient-to-r from-red-600 to-yellow-600 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-white">
              🌟 ƯU ĐIỂM NỔI BẬT & QUÀ TẶNG
            </h2>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("benefits")}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === "benefits"
                      ? "bg-white text-red-600"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Ưu điểm nổi bật
                </button>
                <button
                  onClick={() => setActiveTab("gifts")}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === "gifts"
                      ? "bg-white text-red-600"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Quà tặng kèm
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              {(activeTab === "benefits" ? benefits : gifts).map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-white/20 backdrop-blur-sm rounded-xl p-6"
                  >
                    <div className="flex items-start">
                      {activeTab === "benefits" ? (
                        <FaCheckCircle className="text-yellow-300 mr-3 mt-1 flex-shrink-0" />
                      ) : (
                        <FaGift className="text-yellow-300 mr-3 mt-1 flex-shrink-0" />
                      )}
                      <span className="text-white text-lg">{item}</span>
                    </div>
                  </div>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section with Subscribe */}
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              📞 LIÊN HỆ TƯ VẤN VÀ ĐĂNG KÝ
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Đăng ký ngay để giữ chỗ và nhận ưu đãi học phí trong hôm nay!
            </p>
          </motion.div>

          {/* Subscribe Component */}
          <div className="max-w-full mx-auto">
            <Subscribe />
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            {[
              { icon: <FaGlobe />, title: "Trung tâm", text: "Pinyin Centre" },
              { icon: <FaHeadset />, title: "Hotline", text: "0369.960.429" },
              {
                icon: <FaLaptop />,
                title: "Website",
                text: "pinyincentre.com",
              },
              { icon: <FaUsers />, title: "Zalo", text: "0369.960.429" },
            ].map((contact, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg"
              >
                <div className="text-red-600 dark:text-yellow-400 mb-3 flex justify-center text-2xl">
                  {contact.icon}
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-1">
                  {contact.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {contact.text}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComboHSKCourses;
