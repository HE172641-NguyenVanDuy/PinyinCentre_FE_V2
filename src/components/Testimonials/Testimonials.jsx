import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const nhi = "/assets/testimonials/nhi.jpg";
const duc = "/assets/testimonials/duc.jpg";
const han = "/assets/testimonials/han.jpg";
const trung = "/assets/testimonials/trung.jpg";

const TestimonialData = [
  {
    id: 1,
    name: "Thảo Nhi",
    job: "Sinh viên năm 2",
    text: "Khóa học rất dễ hiểu, giáo viên tận tâm và phát âm chuẩn. Mình học xong có thể tự tin giao tiếp cơ bản rồi!",
    img: nhi,
  },
  {
    id: 2,
    name: "Minh Đức",
    job: "Nhân viên văn phòng",
    text: "Nội dung học rất bổ ích, nếu có thêm phần luyện nghe với người bản xứ thì sẽ tuyệt vời hơn. Giáo viên hướng dẫn rất kỹ và nhiệt tình.",
    img: duc,
  },
  {
    id: 3,
    name: "Ngọc Hân",
    job: "Học viên lớp sơ cấp",
    text: "Ban đầu mình rất sợ học tiếng Trung vì nghĩ nó khó. Nhưng sau 2 tháng học tại đây, mình đã thuộc hết 4 thanh điệu, nhớ hơn 300 từ vựng và tự tin giới thiệu bản thân bằng tiếng Trung.",
    img: han,
  },
  {
    id: 4,
    name: "Lê Trung",
    job: "Freelancer",
    text: "Mình ở tỉnh nên học online. Thật bất ngờ khi bài giảng rất rõ ràng, giáo viên tương tác liên tục, còn có bài tập về nhà để luyện thêm.",
    img: trung,
  },
];

const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:scale-110 hover:bg-red-500 hover:text-white transition z-10"
  >
    <FaChevronLeft />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:scale-110 hover:bg-red-500 hover:text-white transition z-10"
  >
    <FaChevronRight />
  </button>
);

const Testimonials = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 600,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    pauseOnFocus: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 10000,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="py-20 bg-white dark:bg-gray-900">
      <div className="container">
        <div className="text-center mb-12 max-w-[600px] mx-auto">
          <h2 className="text-3xl font-extrabold dark:text-white mb-2">
            Cảm Nhận Của Học Viên
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Những chia sẻ chân thật từ các học viên sau khi hoàn thành khóa học
            tại Pinyin Centre.
          </p>
        </div>

        <div className="relative pb-16">
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div key={data.id} className="px-4 h-full py-11">
                <div className="flex flex-col justify-between shadow-xl py-8 px-6 rounded-2xl dark:bg-gray-800 bg-primary/10 h-[380px] relative hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                  <div className="flex justify-center mb-4">
                    <img
                      src={data.img}
                      alt={data.name}
                      className="rounded-full w-20 h-20 object-cover border-4 border-white dark:border-gray-700"
                    />
                  </div>
                  <div className="flex-grow text-center">
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                      {data.text}
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-black dark:text-white">
                      {data.name}
                    </h3>
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                      {data.job}
                    </p>
                  </div>
                  <p className="text-black/10 dark:text-gray-600 text-9xl font-serif absolute top-0 right-4">
                    “
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style jsx>{`
        .custom-dots li button:before {
          color: gray;
          font-size: 12px;
        }
        .dark .custom-dots li button:before {
          color: white;
        }
        .custom-dots li.slick-active button:before {
          color: red;
        }
        .dark .custom-dots li.slick-active button:before {
          color: yellow;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
