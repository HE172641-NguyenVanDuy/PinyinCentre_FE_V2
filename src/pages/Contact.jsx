import React, { useState, useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import ContactInfo from "../components/Subscribe/ContactInfor";
import AOS from "aos";
import "aos/dist/aos.css";
const Contact = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Giả lập gửi form (thực tế có thể gửi bằng API)
    setSuccessMessage("Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm nhất.");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-6 dark:text-yellow-400">
        Liên Hệ Với Chúng Tôi
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form liên hệ */}
        <div className="bg-orange-100 shadow-lg rounded-lg p-6 dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Gửi Tin Nhắn
          </h2>

          {successMessage && (
            <p className="text-green-600 bg-green-100 p-2 rounded-lg mb-4">
              {successMessage}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">
                Tên của bạn
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none  dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none  dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">
                Tin nhắn
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none  dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Gửi Tin Nhắn
            </button>
          </form>
        </div>

        {/* Thông tin liên hệ */}
        <ContactInfo />
      </div>
    </div>
  );
};

export default Contact;
