import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";
import { apiFetch } from "../../utils/api";

const ChatbotIntro = () => {
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Xin chào! Tôi là Pinda, trợ lý AI của Pinyin Centre. Tôi có thể giúp gì cho bạn hôm nay?",
      timestamp: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const speechMessages = [
    "Xin chào! Tôi là Pinda 🐼",
    "Trợ lý AI thông minh của bạn!",
    "Sẵn sàng hỗ trợ học tập 24/7 ✨",
  ];

  const suggestions = [
    "Học HSK 1 mất bao lâu?",
    "Giá khóa học HSK 3 là bao nhiêu?",
    "Ai là giảng viên tại Pinyin Centre?",
    "Combo HSK 1.2 có ưu đãi gì?",
    "Liên hệ với trung tâm như thế nào?",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpeechBubble(true);
    }, 1500);

    const messageTimer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % speechMessages.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(messageTimer);
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Render message content với Facebook link
  const renderMessageContent = (content) => {
    const facebookLink =
      "https://www.facebook.com/profile.php?id=61560228721942";
    // Regex phát hiện URL
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const lines = content
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    return lines.map((line, index) => {
      // Nếu là Facebook link cũ
      if (line.includes(facebookLink)) {
        const parts = line.split(facebookLink);
        return (
          <React.Fragment key={index}>
            {parts[0] && <p className="leading-relaxed text-sm">{parts[0]}</p>}
            <a
              href={facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-800 inline-flex items-center space-x-1 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faFacebook} className="text-sm" />
              <span className="text-sm">Facebook</span>
            </a>
            {parts[1] && <p className="leading-relaxed text-sm">{parts[1]}</p>}
          </React.Fragment>
        );
      }
      // Nếu là dòng bắt đầu bằng * (list item)
      else if (line.startsWith("*")) {
        const listItem = line
          .replace(/^[*]\s+/, "")
          .replace(/^\*\*\s+/, "**")
          .replace(/\*\*$/, "**");
        return (
          <p key={index} className="leading-relaxed text-sm pl-2">
            <span className="font-medium">{listItem}</span>
          </p>
        );
      } else {
        // Tìm tất cả các URL trong dòng
        const parts = line.split(urlRegex);
        return (
          <p key={index} className="leading-relaxed text-sm">
            {parts.map((part, i) => {
              if (urlRegex.test(part)) {
                // Lấy link từ đầu đến ký tự ']', bỏ phần sau
                let endIdx = part.indexOf("]");
                let cleanUrl = endIdx !== -1 ? part.substring(0, endIdx) : part;
                // Nếu là link Facebook (nhưng khác facebookLink cụ thể ở trên)
                if (cleanUrl.includes("facebook.com")) {
                  return (
                    <a
                      key={i}
                      href={cleanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline mx-1"
                    >
                      Facebook
                    </a>
                  );
                } else {
                  // Link khác
                  return (
                    <a
                      key={i}
                      href={cleanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:text-orange-800 underline mx-1"
                    >
                      Mở liên kết
                    </a>
                  );
                }
              } else {
                return part;
              }
            })}
          </p>
        );
      }
    });
  };

  // Hàm gửi tin nhắn - ĐÃ SỬA LẠI HOÀN TOÀN
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    console.log("1. Starting handleSendMessage with input:", userInput); // Debug

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: userInput.trim(), // Trim whitespace
      timestamp: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Cập nhật messages và clear input TRƯỚC khi gọi API
    setMessages((prev) => {
      console.log("2. Adding user message to state"); // Debug
      return [...prev, userMessage];
    });

    const currentInput = userInput.trim();
    setUserInput(""); // Clear input ngay lập tức
    setLoading(true);

    try {
      console.log("3. Calling API with prompt:", currentInput); // Debug

      const res = await apiFetch("/gemini/generate-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: currentInput }),
      });

      console.log("4. API Response status:", res.status); // Debug
      console.log("5. API Response headers:", res.headers); // Debug

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("6. API Response data:", data); // Debug

      if (data && data.response) {
        const botResponse = {
          id: Date.now() + 1,
          role: "assistant",
          content: data.response,
          timestamp: new Date().toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => {
          console.log("7. Adding bot response to state"); // Debug
          return [...prev, botResponse];
        });
      } else {
        console.error("8. Invalid response format:", data);
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("9. Error occurred:", error); // Debug

      // Hiển thị lỗi cho user
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: `Xin lỗi, có lỗi xảy ra: ${error.message}. Vui lòng thử lại sau.`,
        timestamp: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, errorMessage]);

      // Hiển thị toast error nếu có
      if (typeof toast !== "undefined") {
        toast.error(`Lỗi: ${error.message}`);
      }
    } finally {
      console.log("10. Setting loading to false"); // Debug
      setLoading(false);
    }
  };

  // Hoặc cách khác cho handleSuggestionClick:
  const handleSuggestionClick = async (suggestion) => {
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: suggestion,
      timestamp: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await apiFetch("/gemini/generate-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: suggestion }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data && data.response) {
        const botResponse = {
          id: Date.now() + 1,
          role: "assistant",
          content: data.response,
          timestamp: new Date().toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, botResponse]);
      }
    } catch (error) {
      console.error("Suggestion API Error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: `Lỗi: ${error.message}`,
        timestamp: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Đảm bảo handleKeyPress hoạt động đúng
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log("Enter key pressed, calling handleSendMessage"); // Debug
      handleSendMessage();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 20, stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-200 dark:bg-yellow-200 rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[80vh]"
        >
          {/* Left side - Enhanced Text content */}
          <motion.div variants={itemVariants} className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <h1
                className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 dark:from-yellow-300 dark:via-red-400 dark:to-red-300 bg-clip-text text-transparent mb-6"
                style={{ lineHeight: "1.55" }}
              >
                Gặp gỡ Pinda
              </h1>
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-red-100 dark:bg-yellow-100 rounded-full opacity-20 blur-xl"></div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-medium"
            >
              Trợ lý AI thông minh luôn sẵn sàng hỗ trợ bạn 24/7 với mọi thắc
              mắc về:
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-4 mb-10">
              {[
                {
                  icon: "🎯",
                  text: "Thông tin khóa học và lộ trình học tập",
                  color: "from-blue-500 to-purple-500",
                },
                {
                  icon: "📚",
                  text: "Giải đáp các câu hỏi về ngữ pháp và từ vựng",
                  color: "from-green-500 to-teal-500",
                },
                {
                  icon: "💡",
                  text: "Tư vấn phương pháp học tập hiệu quả",
                  color: "from-yellow-500 to-orange-500",
                },
                {
                  icon: "🎓",
                  text: "Hướng dẫn đăng ký và thi HSK",
                  color: "from-red-500 to-pink-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + index * 0.15,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    scale: 1.02,
                    x: 10,
                    transition: { duration: 0.2 },
                  }}
                  className="group"
                >
                  <div className="flex items-center p-4 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center text-xl mr-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {item.icon}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                      {item.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Modified Button - Mở chat thay vì navigate */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => setIsChatOpen(true)}
                className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center">
                  Chat với Pinda ngay!
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-2"
                  >
                    🚀
                  </motion.span>
                </span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right side - Premium Pinda Character */}
          <motion.div
            variants={itemVariants}
            className="flex-1 flex justify-center relative"
          >
            {/* Dynamic Speech Bubble */}
            <AnimatePresence mode="wait">
              {showSpeechBubble && (
                <motion.div
                  key={currentMessageIndex}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-8 -right-12 z-20"
                >
                  <div className="relative">
                    <div className="bg-gradient-to-r from-white to-red-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-4 shadow-2xl border-2 border-red-200 dark:border-yellow-300 max-w-64 backdrop-blur-sm">
                      <motion.p
                        key={currentMessageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-gray-700 dark:text-gray-300 font-semibold leading-relaxed"
                      >
                        {speechMessages[currentMessageIndex]}
                      </motion.p>
                    </div>

                    <div className="absolute left-0 top-6 transform -translate-x-full flex items-center">
                      <motion.div
                        animate={{ scaleX: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-0.5 bg-gradient-to-r from-red-300 to-red-500 dark:from-yellow-300 dark:to-yellow-500"
                      ></motion.div>
                      <div className="w-0 h-0 border-t-4 border-b-4 border-r-6 border-t-transparent border-b-transparent border-r-red-300 dark:border-r-yellow-300 -ml-px"></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Premium Pinda Character - existing code */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
              }}
              className="relative mt-16"
            >
              {/* Existing Pinda animations and effects */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                  className={`absolute inset-0 rounded-full border-2 ${
                    i === 0
                      ? "border-red-300"
                      : i === 1
                      ? "border-yellow-300"
                      : "border-pink-300"
                  }`}
                  style={{
                    width: `${100 + i * 20}%`,
                    height: `${100 + i * 20}%`,
                    left: `${-i * 10}%`,
                    top: `${-i * 10}%`,
                  }}
                />
              ))}

              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                  animate={{
                    x: [0, Math.cos((i * 45 * Math.PI) / 180) * 100],
                    y: [0, Math.sin((i * 45 * Math.PI) / 180) * 100],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut",
                  }}
                  style={{ left: "50%", top: "50%" }}
                />
              ))}

              <motion.div
                animate={{
                  y: [-15, 15, -15],
                  x: [-8, 8, -8],
                  rotate: [-3, 3, -3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.img
                  src="https://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/512/22261-panda-face-icon.png"
                  alt="Pinda - AI Assistant"
                  className="w-80 h-80 object-contain drop-shadow-2xl"
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3 },
                  }}
                  style={{
                    filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.15))",
                  }}
                />
              </motion.div>

              <motion.div
                animate={{
                  scaleX: [1, 1.3, 1],
                  scaleY: [1, 0.8, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12"
              >
                <div className="w-48 h-16 bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-600 rounded-full blur-xl opacity-60"></div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Chat Window Modal */}
      {/* Chat Window - Floating Style thay vì Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 right-24 w-[400px] h-[600px] bg-white rounded-t-2xl shadow-2xl overflow-hidden border border-gray-200 z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src="https://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/512/22261-panda-face-icon.png"
                    alt="Pinda"
                    className="w-10 h-10 rounded-full bg-white p-1"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Pinda AI</h3>
                  <p className="text-orange-100 text-xs">
                    Pinyin Centre • Đang hoạt động
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 h-[420px] overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                          : "bg-white border border-gray-200"
                      } rounded-2xl px-4 py-3 shadow-sm`}
                    >
                      <div
                        className={`${
                          message.role === "user"
                            ? "text-white"
                            : "text-gray-800"
                        }`}
                      >
                        {message.role === "user" ? (
                          <p className="text-sm">{message.content}</p>
                        ) : (
                          renderMessageContent(message.content)
                        )}
                      </div>
                      <p
                        className={`text-xs mt-2 ${
                          message.role === "user"
                            ? "text-orange-100"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                            className="w-2 h-2 bg-orange-400 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area với Suggestions */}
            <div className="relative">
              {messages.length === 1 && (
                <div className="absolute bottom-full left-0 right-0 p-3 bg-white border-t border-gray-200 rounded-t-2xl shadow-lg">
                  <p className="text-gray-600 text-xs mb-2 font-medium">
                    Gợi ý cho bạn:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.slice(0, 3).map((suggestion, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-all duration-200 text-xs cursor-pointer"
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-end space-x-2">
                  <div className="flex-1 relative">
                    <textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Nhập tin nhắn..."
                      className="w-full p-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent max-h-20 text-sm"
                      rows="1"
                      disabled={loading}
                    />
                  </div>
                  <motion.button
                    onClick={handleSendMessage}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!userInput.trim() || loading}
                    className={`p-3 rounded-full transition-all ${
                      userInput.trim() && !loading
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <FaPaperPlane className="text-sm" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotIntro;
