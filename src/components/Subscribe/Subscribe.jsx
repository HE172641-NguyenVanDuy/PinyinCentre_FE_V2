import React, { useEffect, useState } from "react";
import { apiFetch } from "../../utils/api";

const Banner =
  "https://firebasestorage.googleapis.com/v0/b/interviewmangement-7da65.appspot.com/o/banner%2F12.jpg?alt=media&token=21dec2c0-d687-4253-a3ed-704635fcc18b";

const Subscribe = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    courseId: "",
  });

  useEffect(() => {
    apiFetch("/course/get-all-course")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200 && Array.isArray(data.result)) {
          setCourses(data.result);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách khóa học:", err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    apiFetch("/registration-info/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setMessage("🎉 Bạn đã đăng ký thành công! Chúng tôi sẽ sớm liên hệ với bạn.");
          setFormData({
            fullName: "",
            email: "",
            phoneNumber: "",
            courseId: "",
          });
          setFieldErrors({});
        } else if (data.status === 400 && data.errors) {
          setFieldErrors(data.errors);
          setMessage("❌ Vui lòng kiểm tra lại thông tin.");
        } else if (data.status === 400 && data.message?.includes("Email")) {
          setFieldErrors({
            email: "Email này đã được đăng ký, vui lòng dùng email khác.",
          });
          setMessage("❌ Đăng ký thất bại.");
        } else {
          setMessage("❌ Đăng ký thất bại, vui lòng thử lại.");
        }
      })
      .catch((err) => {
        console.error("Lỗi gửi form:", err);
        setMessage("❌ Có lỗi xảy ra, vui lòng thử lại sau.");
      });
  };

  return (
    <div className="container mx-auto my-20 px-4 sm:px-8">
      <div className="flex flex-col lg:flex-row bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
        {/* Image Section */}
        <div
          className="w-full max-w-[600px] aspect-square relative"
          style={{
            backgroundImage: `url(${Banner})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center p-10 space-y-6 flex-grow">
          <h1 className="text-3xl font-bold text-center lg:text-left text-red-600 dark:text-yellow-300">
            Đăng ký tư vấn để nhận ưu đãi cho học viên!
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block mb-2 font-medium">
                Họ và Tên
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nhập họ và tên"
                required
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700"
              />
              {fieldErrors.fullName && (
                <p className="text-red-600 text-sm mt-1">{fieldErrors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email"
                required
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700"
              />
              {fieldErrors.email && (
                <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block mb-2 font-medium">
                Số Điện Thoại
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                required
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700"
              />
              {fieldErrors.phoneNumber && (
                <p className="text-red-600 text-sm mt-1">{fieldErrors.phoneNumber}</p>
              )}
            </div>

            {/* Course */}
            <div>
              <label htmlFor="courseId" className="block mb-2 font-medium">
                Chọn Khóa Học
              </label>
              <select
                id="courseId"
                value={formData.courseId}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="" disabled>
                  Chọn khóa học...
                </option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.courseName}
                  </option>
                ))}
              </select>
              {fieldErrors.courseId && (
                <p className="text-red-600 text-sm mt-1">{fieldErrors.courseId}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 dark:from-orange-700 dark:to-orange-900 text-white font-semibold rounded-xl hover:scale-105 hover:brightness-110 transition-all duration-300"
              >
                Đăng Ký Ngay
              </button>
            </div>

            {/* Message */}
            {message && (
              <div className="text-center text-green-600 dark:text-green-400 mt-4">
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
