import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";

const ExamTypes = [
  {
    id: 1,
    title: "HSK 1",
    image: "/assets/HSKExam/HSK1.png",
    link: "/quiz",
  },
  {
    id: 2,
    title: "HSK 2",
    image: "/assets/HSKExam/HSK2.png",
    link: "/quiz",
  },
  {
    id: 3,
    title: "HSK 3",
    image: "/assets/HSKExam/HSK3.png",
    link: "/quiz",
  },
  {
    id: 4,
    title: "HSK 4",
    image: "/assets/HSKExam/HSK4.png",
    link: "/quiz",
  },
  {
    id: 5,
    title: "HSK 5",
    image: "/assets/HSKExam/HSK5.png",
    link: "/quiz",
  },
  {
    id: 6,
    title: "HSK 6",
    image: "/assets/HSKExam/HSK6.png",
    link: "/quiz",
  },
];

const ExamPage = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen pb-20">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
        Danh Sách Các Loại Đề Thi HSK
      </h1>

      {/* Bố cục Grid: 3 loại trên, 3 loại dưới */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ExamTypes.map((exam) => (
          <div
            key={exam.id}
            className="bg-orange-200 rounded-lg overflow-hidden shadow-lg"
          >
            <Link to={exam.link}>
              <div className="relative group">
                {/* Hình ảnh */}
                <img
                  src={exam.image}
                  alt={exam.title}
                  className="w-full h-[300px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
                {/* Tiêu đề và hiệu ứng hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent group-hover:from-transparent group-hover:to-black">
                  <h3 className="text-white text-xl font-semibold">
                    {exam.title}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamPage;
