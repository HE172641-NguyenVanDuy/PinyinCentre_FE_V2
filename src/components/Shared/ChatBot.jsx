import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
// Import Font Awesome cho icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Danh sách gợi ý
  const suggestions = [
    "Học HSK 1 mất bao lâu?",
    "Giá khóa học HSK 3 là bao nhiêu?",
    "Ai là giảng viên tại Pinyin Centre?",
    "Combo HSK 1.2 có ưu đãi gì?",
    "Liên hệ với trung tâm như thế nào?",
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    setLoading(true);

    try {
      const res = await fetch("/api/gemini/generate-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response || "No response data" },
        ]);
      } else {
        toast.error(data.message || "Lỗi khi lấy dữ liệu từ Gemini");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Có lỗi xảy ra khi kết nối với API");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Có lỗi xảy ra khi kết nối với API" },
      ]);
    } finally {
      setLoading(false);
      setUserInput("");
    }
  };

  // Xử lý khi nhấn Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Xử lý khi nhấp vào gợi ý (gửi ngay lập tức)
  const handleSuggestionClick = async (suggestion) => {
    setMessages((prev) => [...prev, { role: "user", content: suggestion }]);
    setLoading(true);

    try {
      const res = await fetch("/api/gemini/generate-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: suggestion }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response || "No response data" },
        ]);
      } else {
        toast.error(data.message || "Lỗi khi lấy dữ liệu từ Gemini");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Có lỗi xảy ra khi kết nối với API");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Có lỗi xảy ra khi kết nối với API" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Hàm để xử lý và render nội dung tin nhắn với link và định dạng
  const renderMessageContent = (content) => {
    const facebookLink = "https://www.facebook.com/profile.php?id=61560228721942";
    const linkRegex = new RegExp(facebookLink, "g");

    // Tách nội dung thành các đoạn dựa trên ký tự xuống dòng hoặc cấu trúc
    const lines = content.split("\n").map((line) => line.trim()).filter(Boolean);

    return lines.map((line, index) => {
      // Kiểm tra nếu dòng chứa link Facebook
      if (line.includes(facebookLink)) {
        const parts = line.split(facebookLink);
        return (
          <React.Fragment key={index}>
            {parts[0] && (
              <p className="leading-relaxed text-base">{parts[0]}</p>
            )}
            <a
              href={facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-800 inline-flex items-center space-x-1 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faFacebook} className="text-lg" />
              <span>Facebook</span>
            </a>
            {parts[1] && (
              <p className="leading-relaxed text-base">{parts[1]}</p>
            )}
          </React.Fragment>
        );
      }
      // Kiểm tra nếu dòng là mục danh sách (bắt đầu bằng *)
      else if (line.startsWith("*")) {
        const listItem = line.replace(/^[*]\s+/, "").replace(/^\*\*\s+/, "**").replace(/\*\*$/, "**");
        return (
          <p key={index} className="leading-relaxed text-base pl-4">
            <span className="font-medium">{listItem}</span>
          </p>
        );
      }
      // Các dòng thông thường
      else {
        return (
          <p key={index} className="leading-relaxed text-base">
            {line}
          </p>
        );
      }
    });
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto bg-gradient-to-br from-orange-50 to-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
      {/* Tiêu đề */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white text-center py-5 rounded-t-xl shadow-lg">
        <h2 className="text-3xl font-bold tracking-wide">Chatbot AI - Pinyin Centre</h2>
      </div>

      {/* Khu vực trò chuyện */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-6 overflow-y-auto bg-white/90 backdrop-blur-sm"
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-600 mt-20">
            <p className="text-lg">Chào bạn! Hãy nhập câu hỏi hoặc chọn gợi ý để bắt đầu.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              } mb-6`}
            >
              <div
                className={`max-w-[75%] p-4 rounded-xl ${
                  msg.role === "user"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-50 text-gray-900 border border-gray-200"
                } shadow-md hover:shadow-lg transition-shadow duration-200`}
              >
                {renderMessageContent(msg.content)}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start mb-6">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-md">
              <p className="text-green-600 animate-pulse font-medium">Đang xử lý...</p>
            </div>
          </div>
        )}
      </div>

      {/* Khu vực gợi ý (chỉ hiển thị khi chưa có tin nhắn) */}
      {messages.length === 0 && (
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700 text-sm mb-3 font-medium">Gợi ý cho bạn:</p>
          <div className="flex flex-wrap gap-3">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Form nhập liệu */}
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white border-t border-gray-200"
      >
        <div className="flex items-center space-x-3">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập câu hỏi của bạn..."
            rows="2"
            className="flex-1 p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none transition-all duration-200"
            disabled={loading}
          />
          <button
            type="submit"
            className={`px-6 py-3 text-white font-semibold rounded-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            } transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-75`}
            disabled={loading}
          >
            {loading ? "..." : "Gửi"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;