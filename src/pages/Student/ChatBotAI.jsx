import React, { useState, useEffect } from "react";
import Chatbot from "../../components/Shared/ChatBot.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
const ChatPage = () => {
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
      <Chatbot />
    </div>
  );
};
export default ChatPage;
