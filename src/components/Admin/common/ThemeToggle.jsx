import React, { useState, useEffect } from "react";
const LightButton = "/light-mode-button.png"; // Đường dẫn ảnh trong public
const DarkButton = "/dark-mode-button.png";

const DarkMode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const element = document.documentElement; // Thẻ <html>
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div className="relative w-12">
      {/* Light Mode Button (Hiện khi theme là Light) */}
      <img
        src={LightButton}
        alt="Light Mode"
        onClick={() => setTheme("dark")}
        className={`w-12 cursor-pointer transition-all duration-300 absolute right-0 z-10 ${
          theme === "dark" ? "opacity-0" : "opacity-100"
        }`}
      />
      
      {/* Dark Mode Button (Hiện khi theme là Dark) */}
      <img
        src={DarkButton}
        alt="Dark Mode"
        onClick={() => setTheme("light")}
        className={`w-12 cursor-pointer transition-all duration-300 absolute right-0 z-10 ${
          theme === "light" ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
};

export default DarkMode;
