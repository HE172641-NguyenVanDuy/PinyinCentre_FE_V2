import React, { useState } from "react";
import { FaFacebook, FaTiktok, FaCaretDown } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import DarkMode from "./DarkMode";

const Logo = "/assets/logo/logoPinyin1.png";

const Menu = [
  { id: 1, name: "Trang Chủ", link: "/" },
  { id: 2, name: "Thi Thử", link: "/exam" },
  { id: 3, name: "Liên Hệ", link: "/contact" },
];

const CourseDropdownLinks = [
  { id: 1, name: "Khóa Học HSK", link: "/courses/hsk" },
  { id: 2, name: "Combo HSK", link: "/courses/combo-hsk" },
];

const DocumentDropdownLinks = [
  { id: 1, name: "HSK 1", link: "/documents" },
  { id: 2, name: "HSK 2", link: "/documents" },
  { id: 3, name: "HSK 3", link: "/documents" },
  { id: 4, name: "HSK 4", link: "/documents" },
  { id: 5, name: "HSK 5", link: "/documents" },
  { id: 6, name: "HSK 6", link: "/documents" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <div className="sticky top-0 z-50 shadow-md bg-white dark:bg-gray-900">
      <div className="bg-gradient-to-r from-orange-200 to-orange-300 dark:from-orange-800 dark:to-orange-900">
        <div className="container flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-white"
          >
            <img src={Logo} alt="Logo" className="w-16 object-contain" />
            <div className="leading-5">
              PINYIN
              <br />
              CENTRE
            </div>
          </Link>

          {/* Menu Center */}
          <div className="hidden sm:flex items-center gap-8">
            {Menu.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="relative text-lg font-semibold hover:text-red-500 transition group"
              >
                {item.name}
                <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
            ))}

            {/* Dropdown: Khóa học */}
            <div className="relative group cursor-pointer">
              <div className="flex items-center gap-1 text-lg font-semibold hover:text-red-500 transition">
                Khóa Học
                <FaCaretDown className="transition group-hover:rotate-180" />
              </div>
              <div className="absolute top-7 hidden group-hover:block bg-white dark:bg-gray-800 shadow-md rounded-md p-2 min-w-[180px]">
                {CourseDropdownLinks.map((course) => (
                  <Link
                    key={course.id}
                    to={course.link}
                    className="block px-3 py-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900"
                  >
                    {course.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Dropdown: Thư viện */}
            <div className="relative group cursor-pointer">
              <div className="flex items-center gap-1 text-lg font-semibold hover:text-red-500 transition">
                Thư Viện
                <FaCaretDown className="transition group-hover:rotate-180" />
              </div>
              <div className="absolute top-7 hidden group-hover:block bg-white dark:bg-gray-800 shadow-md rounded-md p-2 min-w-[180px]">
                {DocumentDropdownLinks.map((doc) => (
                  <Link
                    key={doc.id}
                    to={doc.link}
                    className="block px-3 py-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900"
                  >
                    {doc.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Social + Darkmode */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/people/Tiếng-Trung-Bắc-Kinh/61551807950988/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-2xl hover:text-blue-600 hover:scale-110 transition" />
            </a>
            <a
              href="https://www.tiktok.com/@tiengtrungbackinh235?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="text-2xl hover:text-black dark:hover:text-white hover:scale-110 transition" />
            </a>
            <Link
              to="/login"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-semibold hover:brightness-110 shadow-lg transition"
            >
              Đăng Nhập
            </Link>
            <DarkMode />

            {/* Mobile Button */}
            <div className="sm:hidden">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-900 px-4 pb-4">
          <ul className="space-y-2">
            {Menu.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.link}
                  className="block py-2 font-semibold hover:text-red-500"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {/* Khóa học */}
            <li>
              <div
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "courses" ? null : "courses"
                  )
                }
                className="flex items-center justify-between py-2 cursor-pointer font-semibold hover:text-red-500"
              >
                <span>Khóa Học</span>
                <FaCaretDown
                  className={`transition ${
                    activeDropdown === "courses" ? "rotate-180" : ""
                  }`}
                />
              </div>
              {activeDropdown === "courses" && (
                <div className="pl-4">
                  {CourseDropdownLinks.map((course) => (
                    <Link
                      key={course.id}
                      to={course.link}
                      className="block py-2 hover:text-red-500"
                      onClick={() => setIsOpen(false)}
                    >
                      {course.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
            {/* Thư viện */}
            <li>
              <div
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "documents" ? null : "documents"
                  )
                }
                className="flex items-center justify-between py-2 cursor-pointer font-semibold hover:text-red-500"
              >
                <span>Thư Viện</span>
                <FaCaretDown
                  className={`transition ${
                    activeDropdown === "documents" ? "rotate-180" : ""
                  }`}
                />
              </div>
              {activeDropdown === "documents" && (
                <div className="pl-4">
                  {DocumentDropdownLinks.map((doc) => (
                    <Link
                      key={doc.id}
                      to={doc.link}
                      className="block py-2 hover:text-red-500"
                      onClick={() => setIsOpen(false)}
                    >
                      {doc.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          </ul>

          {/* Social + Darkmode */}
          <div className="flex items-center gap-4 mt-4">
            <a
              href="https://www.facebook.com/people/Tiếng-Trung-Bắc-Kinh/61551807950988/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-2xl hover:text-blue-600 hover:scale-110 transition" />
            </a>
            <a
              href="https://www.tiktok.com/@tiengtrungbackinh235?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="text-2xl hover:text-black dark:hover:text-white hover:scale-110 transition" />
            </a>
            <Link
              to="/login"
              className="block w-full text-center px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-semibold hover:brightness-110 shadow-lg transition"
              onClick={() => setIsOpen(false)}
            >
              Đăng Nhập
            </Link>

            <DarkMode />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
