import React, { useState, useEffect } from "react";
import HSK1Quiz from "../components/Quiz/HSK1Quiz";
import AOS from "aos";
import "aos/dist/aos.css";

const QuizPage = () => {
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
    <div className="min-h-screen pb-20">
      <HSK1Quiz />
    </div>
  );
};

export default QuizPage;
