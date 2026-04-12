import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="bg-orange-100 shadow-lg rounded-lg p-6 dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Thông Tin Liên Hệ</h2>

      {/* Địa chỉ */}
      <div className="flex items-center gap-4 mb-4">
        <FaMapMarkerAlt className="text-green-800 text-2xl" />
        <p className="text-gray-700 dark:text-gray-300">Địa chỉ: Đại học FPT, Khu Công nghệ cao Hòa Lạc</p>
      </div>

      {/* Điện thoại */}
      <div className="flex items-center gap-4 mb-4">
        <FaPhoneAlt className="text-green-400 text-2xl" />
        <p className="text-gray-700 dark:text-gray-300">Điện thoại: +84 123 456 789</p>
      </div>

      {/* Email */}
      <div className="flex items-center gap-4 mb-4">
        <FaEnvelope className="text-red-500 text-2xl" />
        <p className="text-gray-700 dark:text-gray-300">Email: contact@pinyincentre.com</p>
      </div>

      {/* Mạng xã hội */}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mt-6 mb-4">Theo dõi chúng tôi</h2>
      <div className="flex space-x-6">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-3xl transition transform hover:scale-125">
          <FaFacebook />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-red-400 text-3xl transition transform hover:scale-125">
          <FaInstagram />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-3xl transition transform hover:scale-125">
          <FaTiktok />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-red-600 text-3xl transition transform hover:scale-125">
          <FaYoutube />
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;
