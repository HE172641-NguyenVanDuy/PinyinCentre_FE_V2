import React from "react";
import { FaUsers, FaChartBar, FaBriefcase, FaUserFriends } from "react-icons/fa";
const BannerImg = "/assets/website/banner-reason.jpg";

const Banner = () => {
  return (
    <div className="min-h-[600px] flex justify-center items-center py-16">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
          {/* Image section */}
          <div data-aos="zoom-in">
            <img
              src={BannerImg}
              alt="Banner"
              className="max-w-[600px] h-[450px] w-full mx-auto rounded-xl object-cover drop-shadow-2xl"
            />
          </div>

          {/* Text details */}
          <div className="flex flex-col justify-center gap-6">
            <h1
              data-aos="fade-up"
              className="text-3xl sm:text-4xl font-extrabold text-red-600 dark:text-yellow-300 leading-snug"
            >
              Thành Tựu Nổi Bật
              <br />
              <span className="text-black dark:text-white">
                Trung Tâm Tiếng Trung PINYIN Centre
              </span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div
                data-aos="fade-up"
                className="flex flex-col items-center gap-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="bg-violet-200 dark:bg-violet-500 text-3xl p-4 rounded-full">
                  <FaUsers />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">300+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Khóa Học HSK 3–5 Hoàn Thành
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div
                data-aos="fade-up"
                className="flex flex-col items-center gap-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="bg-green-200 dark:bg-green-500 text-3xl p-4 rounded-full">
                  <FaChartBar />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Học viên Tự Tin Giao Tiếp Sau Khóa Học
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div
                data-aos="fade-up"
                className="flex flex-col items-center gap-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="bg-yellow-200 dark:bg-yellow-500 text-3xl p-4 rounded-full">
                  <FaBriefcase />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">50+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Học viên Đạt Được Việc Làm Sau Khóa HSK 4.5
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div
                data-aos="fade-up"
                className="flex flex-col items-center gap-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="bg-orange-200 dark:bg-orange-500 text-3xl p-4 rounded-full">
                  <FaUserFriends />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">90%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Học Viên Giới Thiệu Thêm Bạn Bè Đến Học
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
