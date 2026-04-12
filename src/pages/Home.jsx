import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "../components/Hero/Hero";
import Products from "../components/Lectures/Lectures";
import Course from "../components/Course/Course";
import Banner from "../components/Banner/Banner";
import Subscribe from "../components/Subscribe/Subscribe";
import Testimonials from "../components/Testimonials/Testimonials";
import Popup from "../components/Popup/Popup";
import HskJourney from "../components/HskJourney/HskJourney";
import ChatbotIntro from "../components/ChatbotIntro/ChatbotIntro";

const Home = () => {
  const [orderPopup, setOrderPopup] = useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  const roadmapData = [
    {
      level: "HSK 1",
      description: [
        "Đối tượng: Người mới bắt đầu học tiếng Trung.",
        "Từ vựng: Khoảng 150 từ cơ bản.",
        "Ngữ pháp: Câu trúc đơn giản, chủ yếu là khẩu ngữ định, phụ định và nghi vấn.",
        "Kỹ năng đánh giá: Nghe và đọc (Không có phần viết và nói)",
      ],
      duration: "Khoảng 2-3 tháng (30-45 giờ học).", // 150 words, basic grammar, beginner level
    },
    {
      level: "HSK 2",
      description: [
        "HSK 2 đánh giá khả năng sử dụng tiếng Trung giao tiếp cơ bản, yêu cầu người học có khả năng sử dụng tiếng Trung trong các tình huống giao tiếp hàng ngày.",
        "Từ vựng: Khoảng 300 từ (bao gồm 150 từ của HSK 1).",
      ],
      duration: "Khoảng 3-4 tháng (45-60 giờ học).", // Additional 150 words, slightly more complex grammar
    },
    {
      level: "HSK 3",
      description: [
        "Hiểu và sử dụng khoảng 600 từ vựng thông dụng.",
        "Giao tiếp bằng tiếng Trung trong các tình huống quen thuộc như mua sắm, ăn uống, du lịch và công việc.",
        "Đọc hiểu các đoạn văn ngắn và viết đoạn văn đơn giản bằng tiếng Trung.",
        "Hiểu hội thoại dài hơn so với HSK 2.",
      ],
      duration: "Khoảng 5-6 tháng (75-90 giờ học).", // Additional 300 words, more practical usage
    },
    {
      level: "HSK 4",
      description: [
        "Hiểu và sử dụng khoảng 1.200 từ vựng và các cấu trúc ngữ pháp phức tạp hơn.",
        "Giao tiếp tự nhiên hơn về các chủ đề quen thuộc và một số chủ đề trừu tượng.",
      ],
      duration: "Khoảng 6-8 tháng (90-120 giờ học).", // Additional 600 words, intermediate grammar
    },
    {
      level: "HSK 5",
      description: [
        "Hiệu quả sử dụng khoảng 2.500 từ vựng và các cấu trúc ngữ pháp nâng cao.",
        "Đọc hiểu các bài báo, tin tức và văn bản mang tính học thuật.",
        "Giao tiếp trôi chảy về các chủ đề trừu tượng, kinh tế, chính trị.",
      ],
      duration: "Khoảng 8-10 tháng (120-150 giờ học).", // Additional 1,300 words, advanced grammar
    },
    {
      level: "HSK 6",
      description: [
        "Hiểu và sử dụng khoảng 5.000 từ vựng và các cấu trúc ngữ pháp nâng cao.",
        "Đọc hiểu các bài báo, tiểu thuyết ngắn, tin tức và văn bản mang tính học thuật.",
        "Giao tiếp trôi chảy về các chủ đề trừu tượng như văn hóa, kinh tế, chính trị.",
      ],
      duration: "Khoảng 12-18 tháng (180-270 giờ học).", // Additional 2,500 words, near-fluency
    },
  ];
  const handleScrollToSubscribe = () => {
    const element = document.getElementById("subscribe");
    if (element) {
      const offset = 160;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      {/* <Navbar handleOrderPopup={handleOrderPopup} /> */}
      <Hero handleOrderPopup={handleOrderPopup} />
      <ChatbotIntro />
      <Course handleOrderPopup={handleOrderPopup} />
      <div className="text-center p-8 font-sans">
        <h1 className="text-4xl text-red-500 dark:text-yellow-300 mb-8 font-bold">
          Lộ trình học
        </h1>
        <HskJourney roadmapData={roadmapData} />
        <button
          onClick={handleScrollToSubscribe}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded mt-8"
        >
          Bắt đầu
        </button>
      </div>
      <Banner />
      <Products />

      <Testimonials />
      <div id="subscribe">
        <Subscribe />
      </div>
      {/* <Footer /> */}
      <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </div>
  );
};

export default Home;
