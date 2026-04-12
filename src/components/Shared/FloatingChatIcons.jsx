import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { apiFetch } from "../../utils/api";

const FloatingChatIcons = ({ showSocialIcons = true }) => {
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
  const chatContainerRef = useRef(null);

  // Danh sách gợi ý từ component gốc
  const suggestions = [
    "Học HSK 1 mất bao lâu?",
    "Giá khóa học HSK 3 là bao nhiêu?",
    "Ai là giảng viên tại Pinyin Centre?",
    "Combo HSK 1.2 có ưu đãi gì?",
    "Liên hệ với trung tâm như thế nào?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Hàm xử lý và render nội dung tin nhắn (từ component gốc)
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

  // Hàm gửi tin nhắn (từ component gốc, đã điều chỉnh)
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: userInput,
      timestamp: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    const currentInput = userInput;
    setUserInput("");

    try {
      const res = await apiFetch("/gemini/generate-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: currentInput }),
      });

      const data = await res.json();

      if (res.ok) {
        const botResponse = {
          id: Date.now() + 1,
          role: "assistant",
          content: data.response || "No response data",
          timestamp: new Date().toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, botResponse]);
      } else {
        toast.error(data.message || "Lỗi khi lấy dữ liệu từ Gemini");
        const errorMessage = {
          id: Date.now() + 1,
          role: "assistant",
          content: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.",
          timestamp: new Date().toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Có lỗi xảy ra khi kết nối với API");
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Có lỗi xảy ra khi kết nối với API. Vui lòng thử lại sau.",
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

  // Xử lý gợi ý - ĐÃ SỬA LẠI
  const handleSuggestionClick = async (suggestion) => {
    // Set input value và gửi luôn
    setUserInput(suggestion);

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: suggestion }),
      });

      const data = await res.json();

      if (res.ok) {
        const botResponse = {
          id: Date.now() + 1,
          role: "assistant",
          content: data.response || "No response data",
          timestamp: new Date().toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, botResponse]);
      } else {
        toast.error(data.message || "Lỗi khi lấy dữ liệu từ Gemini");
        const errorMessage = {
          id: Date.now() + 1,
          role: "assistant",
          content: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.",
          timestamp: new Date().toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Có lỗi xảy ra khi kết nối với API");
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Có lỗi xảy ra khi kết nối với API. Vui lòng thử lại sau.",
        timestamp: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      // Clear input sau khi gửi
      setUserInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes circularShake {
            0% { transform: rotate(0deg); }
            5% { transform: rotate(20deg); } /* Shake starts at 0.1s (5%) */
            15% { transform: rotate(-20deg); } /* Shake ends at 0.3s (15%) */
            25% { transform: rotate(20deg); } /* Back to 8deg at 0.5s (25%) */
            30% { transform: rotate(0deg); } /* Back to rest at 0.66s (30%) */
            100% { transform: rotate(0deg); } /* Hold rest until 1s (100%) */
          }
          .animate-circular-shake {
            animation: circularShake 1s ease-in-out infinite;
            transform-origin: center;
          }
        `}
      </style>
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
        {/* Chatbot Button */}
        <motion.button
          onClick={() => setIsChatOpen(!isChatOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(249, 115, 22, 0.4)",
                "0 0 0 10px rgba(249, 115, 22, 0)",
                "0 0 0 0 rgba(249, 115, 22, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <AnimatePresence mode="wait">
              {!isChatOpen ? (
                <motion.img
                  key="panda"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  src="https://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/512/22261-panda-face-icon.png"
                  alt="Pinda Chatbot"
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <motion.div
                  key="close"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaTimes className="text-white text-xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-full h-full bg-green-500 rounded-full"
            />
          </div>
        </motion.button>

        {/* Other Social Icons - Only show if showSocialIcons is true */}
        {showSocialIcons && (
          <>
            <motion.a
              href="https://www.facebook.com/messages/t/135428502983430"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </motion.a>

            <motion.a
              href="https://zalo.me/0369960429"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </motion.a>

            <motion.a
              href="tel:+84369960429"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg transform animate-circular-shake"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </motion.a>
          </>
        )}

        {/* Enhanced Chat Window - VỊ TRÍ ĐÃ ĐƯỢC ĐIỀU CHỈNH */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed bottom-0 right-24 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
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
                    <h3 className="text-white font-semibold text-lg">
                      Pinda AI
                    </h3>
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
              <div
                ref={chatContainerRef}
                className="flex-1 p-4 h-[420px] overflow-y-auto bg-gray-50"
              >
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
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

                  {/* Typing Indicator */}
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

              {/* Input Area với Suggestions ở trên */}
              <div className="relative">
                {/* Suggestions - ĐÃ CHUYỂN LÊN TRÊN INPUT */}
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

                {/* Input Area */}
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
    </>
  );
};

export default FloatingChatIcons;
