import React, {useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const UnderDevelopment = () => {
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">
        Tính năng này đang trong quá trình phát triển
      </h1>
      <p className="text-lg text-center">
        Chúng tôi đang làm việc chăm chỉ để hoàn thiện. Hãy quay lại sau!
      </p>
    </div>
  );
};

export default UnderDevelopment;
