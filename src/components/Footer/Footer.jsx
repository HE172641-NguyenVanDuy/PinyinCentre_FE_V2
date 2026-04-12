import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaTiktok,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const footerLogo = "/assets/logo/logoPinyin1.png";
const lightBanner = "/assets/website/footer.png";
const darkBanner = "/assets/website/footer-dark.png";

const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
      document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const updateDarkMode = () => {
      const darkModeEnabled =
        document.documentElement.classList.contains("dark");
      setIsDarkMode(darkModeEnabled);
      localStorage.setItem("theme", darkModeEnabled ? "dark" : "light");
    };

    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("storage", updateDarkMode);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", updateDarkMode);
    };
  }, []);

  return (
    <div
      className={`text-black dark:text-white transition-all`}
      style={{
        backgroundImage: `url(${isDarkMode ? darkBanner : lightBanner})`,
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-44 pt-10">
          {/* Logo + Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={footerLogo} alt="logo" className="w-14" />
              <h1 className="text-2xl font-bold">Pinyin Centre</h1>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Pinyin - Nền tảng ngôn ngữ, chắp cánh tương lai!
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.tiktok.com/@tiengtrungbackinh235"
                className="hover:text-red-600"
                target="_blank"
              >
                <FaTiktok className="text-2xl" />
              </a>
              <a
                href="https://www.facebook.com/people/Ti%E1%BA%BFng-Trung-B%E1%BA%AFc-Kinh/61551807950988/"
                className="hover:text-red-600"
                target="_blank"
              >
                <FaFacebook className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-2">Menu</h2>
            <ul className="space-y-3">
              {[
                { title: "Trang Chủ", link: "/" },
                { title: "Về Chúng Tôi", link: "/#about" },
                { title: "Liên Hệ", link: "/#contact" },
                { title: "Tin Tức", link: "/#blog" },
              ].map((item) => (
                <li
                  key={item.title}
                  className="cursor-pointer hover:text-primary hover:translate-x-1 transition-all"
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h2 className="text-xl font-semibold mb-2">Liên Hệ</h2>
            <div className="flex gap-3 items-start">
              <FaLocationArrow className="mt-1" />
              <p className="text-sm">
                Đại Học FPT, Khu Công Nghệ Cao, Hòa Lạc, Hà Nội
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <FaMobileAlt />
              <a
                href="tel:+84369960429"
                className="hover:text-primary transition-all"
              >
                +84 369960429
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
