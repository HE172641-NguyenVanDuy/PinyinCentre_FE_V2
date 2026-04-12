import React, { useState, useEffect } from "react";
import hsk1QuizData from "../../Data/hsk1-quiz1";
const HSK1Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Thời gian còn lại (40 phút = 2400 giây)
  const [timeLeft, setTimeLeft] = useState(2400);
  const [isTimeStopped, setIsTimeStopped] = useState(false); // Mới thêm
  const audio = hsk1QuizData[0].exam.audio_file;

  const [currentTab, setCurrentTab] = useState("listening");

  // const currentQuestion =
  //   currentTab === "listening"
  //     ? hsk1QuizData[0].exam.listening.questions[currentQuestionIndex]
  //     : hsk1QuizData[0].exam.reading.questions[currentQuestionIndex];

  const allQuestions = [
    ...hsk1QuizData[0].exam.listening.questions,
    ...hsk1QuizData[0].exam.reading.questions,
  ];

  const currentQuestion = allQuestions[currentQuestionIndex];

  // Cập nhật bộ đếm thời gian mỗi giây
  useEffect(() => {
    if (timeLeft > 0 && !isTimeStopped) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      checkFinalResult(); // Hết giờ thì tự động nộp bài
    }
  }, [timeLeft, isTimeStopped]);

  // Định dạng thời gian (mm:ss)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Chọn đáp án
  const handleSelectAnswer = (answer) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: answer });
  };

  // Kiểm tra kết quả khi nhấn "Hoàn Thành"
  const checkFinalResult = () => {
    let newScore = 0;
  
    // Kiểm tra câu hỏi Listening
    hsk1QuizData[0].exam.listening.questions.forEach((question) => {
      if (selectedAnswers[question.id-1] === question.correct_answer) {
        newScore++;
      }
    });
  
    // Kiểm tra câu hỏi Reading
    hsk1QuizData[0].exam.reading.questions.forEach((question) => {
      if (selectedAnswers[question.id-1] === question.correct_answer) {
        newScore++;
      }
    });
  
    // Cập nhật điểm và trạng thái
    setScore(newScore);
    setIsCompleted(true);
    setIsTimeStopped(true); // Dừng bộ đếm khi nộp bài
  };
  

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-8 dark:bg-gray-500">
      {/* Tiêu đề Quiz */}
      <h1 className="text-3xl font-bold text-center text-red-600 dark:text-yellow-400">
        HSK1
      </h1>

      <div className="flex gap-8">
        {/* Bên trái: Hiển thị câu hỏi hiện tại */}
        <div className="w-3/4 bg-orange-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all">
          {/* Hiển thị bộ đếm thời gian */}
          <h2 className="text-xl font-semibold text-center mb-4 dark:text-white">
            ⏳ Thời gian còn lại:{" "}
            <span className="text-red-600 dark:text-yellow-400">
              {formatTime(timeLeft)}
            </span>
          </h2>
          {currentTab === "listening" && (
            <audio controls className="mb-4 w-full">
              <source src={audio} type="audio/mp3" />
              Trình duyệt của bạn không hỗ trợ phát âm thanh.
            </audio>
          )}
          <h1 className="text-3xl font-bold text-center text-red-600 dark:text-yellow-400">
            Câu {currentQuestion.id}
          </h1>

          {!isCompleted ? (
            <div>
              {currentTab === "reading" && (
                <h2 className="text-xl font-semibold mb-4 dark:text-white text-center">
                  {currentQuestion.question}
                </h2>
              )}

              {/* Nếu câu hỏi có hình ảnh */}
              {currentQuestion.type === "nghe_3_hinh" && (
                <div className="flex justify-center gap-4 items-center">
                  {currentQuestion.choices.map((choice, index) => (
                    <button
                      key={index}
                      className={`border p-2 rounded-lg ${
                        selectedAnswers[currentQuestionIndex] === choice.text
                          ? "bg-red-500 text-white"
                          : "bg-gray-100"
                      }`}
                      onClick={() => handleSelectAnswer(choice.text)}
                    >
                      <img
                        src={choice.src}
                        alt={`Option ${choice.text}`}
                        className="w-24 h-24 object-contain" // Sử dụng object-contain để hình ảnh không bị cắt
                      />
                      <p className="text-center">{choice.text}</p>
                    </button>
                  ))}
                </div>
              )}

              {(currentQuestion.type === "nghe_hinh_anh" ||
                currentQuestion.type === "doc_hinh_anh") && (
                <div className="flex flex-col items-center">
                  {/* Hiển thị hình ảnh */}
                  <img
                    src={currentQuestion.image}
                    alt={`Question ${currentQuestion.id}`}
                    className="w-64 h-64 object-contain mb-4"
                  />

                  {/* Hiển thị các lựa chọn True/False */}
                  <div className="flex gap-4">
                    {currentQuestion.choices.map((choice, index) => {
                      // Lấy giá trị của lựa chọn (True hoặc False)
                      const choiceText = Object.values(choice)[0];
                      const choiceKey = Object.keys(choice)[0];
                      return (
                        <button
                          key={index}
                          className={`w-24 p-3 border rounded-lg transition-all ${
                            selectedAnswers[currentQuestionIndex] === choiceKey
                              ? "bg-red-500 text-white"
                              : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                          }`}
                          onClick={() => handleSelectAnswer(choiceKey)} // Lưu "A" hoặc "B" làm câu trả lời
                        >
                          {choiceKey}: {choiceText}{" "}
                          {/* Hiển thị "A: True" hoặc "B: False" */}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              {(currentQuestion.type === "nghe_common_choices" ||
                currentQuestion.type === "doc_common_choices") && (
                <div className="flex gap-8 items-start">
                  <div className="w-2/3">
                    {currentQuestion.type === "nghe_common_choices" &&
                      hsk1QuizData[0].exam[currentQuestion.choices_ref] && (
                        <div className="mb-4">
                          <img
                            src={hsk1QuizData[0].exam.common_listening}
                            alt="Common listening image"
                            className="w-full h-96 object-contain" // Tăng kích thước ảnh lên (h-96)
                          />
                        </div>
                      )}
                    {currentQuestion.id >= 26 &&
                      currentQuestion.id <= 30 &&
                      hsk1QuizData[0].exam[currentQuestion.choices_ref] && (
                        <div className="mb-4">
                          <img
                            src={hsk1QuizData[0].exam.common_reading1}
                            alt="Common listening image"
                            className="w-full h-96 object-contain" // Tăng kích thước ảnh lên (h-96)
                          />
                        </div>
                      )}
                    {/* Hiển thị các từ vựng cho câu hỏi từ 30-35 */}
                    {currentQuestion.id >= 31 && currentQuestion.id <= 35 && (
                      <div className="mb-4 bg-white p-4 rounded-lg shadow-lg w-full max-w-lg mx-auto">
                        <ul className="space-y-2">
                          {Object.entries(
                            hsk1QuizData[0].exam.common_reading2[0]
                          ).map(([key, value], index) => (
                            <li key={index} className="text-lg">
                              <strong>{key}:</strong> {value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Hiển thị các từ vựng cho câu hỏi từ 36-40 */}
                    {currentQuestion.id > 35 && currentQuestion.id <= 40 && (
                      <div className="mb-4 bg-white p-4 rounded-lg shadow-lg w-full max-w-lg mx-auto">
                        <ul className="space-y-2">
                          {Object.entries(
                            hsk1QuizData[0].exam.common_reading3[0]
                          ).map(([key, value], index) => (
                            <li key={index} className="text-lg">
                              <strong>{key}:</strong> {value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Hiển thị các lựa chọn trắc nghiệm bên phải */}
                  <div className="w-1/3 flex flex-col space-y-2">
                    {hsk1QuizData[0].exam[currentQuestion.choices_ref][0] &&
                      Object.entries(
                        hsk1QuizData[0].exam[currentQuestion.choices_ref][0]
                      ).map(([key, value], index) => (
                        <button
                          key={index}
                          className={`w-full p-3 border rounded-lg transition-all ${
                            selectedAnswers[currentQuestionIndex] === key
                              ? "bg-red-500 text-white"
                              : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                          }`}
                          onClick={() => handleSelectAnswer(key)} // Lưu đáp án là A, B, C, ...
                        >
                          {value}
                        </button>
                      ))}
                  </div>
                </div>
              )}
              {currentQuestion.type === "nghe_text" && (
                <div className="flex flex-col items-center">
                  {/* Hiển thị phần audio */}
                  <div className="mb-4">
                    <audio controls className="w-full">
                      <source
                        src={hsk1QuizData[0].exam.audio_file}
                        type="audio/mp3"
                      />
                      Trình duyệt của bạn không hỗ trợ phát âm thanh.
                    </audio>
                  </div>

                  {/* Hiển thị các lựa chọn trắc nghiệm */}
                  <div className="flex flex-col space-y-2">
                    {currentQuestion.choices.map((choice, index) => {
                      const choiceKey = Object.keys(choice)[0]; // Lấy A, B, C
                      const choiceText = Object.values(choice)[0]; // Lấy văn bản câu trả lời

                      return (
                        <button
                          key={index}
                          className={`w-full p-3 border rounded-lg transition-all ${
                            selectedAnswers[currentQuestionIndex] === choiceKey
                              ? "bg-red-500 text-white"
                              : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                          }`}
                          onClick={() => handleSelectAnswer(choiceKey)} // Lưu đáp án là A, B, C
                        >
                          {choiceKey}: {choiceText}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 dark:text-yellow-400">
                Kết Quả
              </h2>
              <p className="text-lg dark:text-white">
                Bạn trả lời đúng {score} / {hsk1QuizData[0].exam.total_questions} câu.
              </p>
              <button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setScore(0);
                  setIsCompleted(false);
                  setSelectedAnswers({});
                  setTimeLeft(2400);
                  setIsTimeStopped(false);
                }}
                className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
              >
                Làm lại
              </button>
            </div>
          )}
        </div>

        {/* Bên phải: Danh sách câu hỏi (grid) */}
        <div className="w-1/4 bg-orange-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg transition-all">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Chọn phần
          </h2>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => {setCurrentTab("listening");
                setCurrentQuestionIndex(0);}
              }
              className={`w-full p-3 border rounded-lg transition-all ${
                currentTab === "listening"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 dark:text-white"
              }`}
            >
              Listening
            </button>
            <button
              onClick={() => {setCurrentTab("reading");
                setCurrentQuestionIndex(20);}}
              className={`w-full p-3 border rounded-lg transition-all ${
                currentTab === "reading"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 dark:text-white"
              }`}
            >
              Reading
            </button>
          </div>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Danh Sách Câu Hỏi
          </h2>
          <div className="grid grid-cols-5 gap-2">
            {/* Gộp câu hỏi từ Listening và Reading */}
            {[
              ...hsk1QuizData[0].exam.listening.questions,
              ...hsk1QuizData[0].exam.reading.questions,
            ]
              .slice(
                currentTab === "listening" ? 0 : 20, // Nếu là Listening, lấy từ câu 1-20
                currentTab === "listening" ? 20 : 40 // Nếu là Listening, lấy đến câu 20; nếu là Reading, lấy đến câu 40
              )
              .map((question, index) => {
                // Tính toán số câu hỏi thực tế cho mỗi tab
                const questionIndex =
                  currentTab === "listening" ? index : index + 20;

                return (
                  <button
                    key={index} // Dùng ID của câu hỏi làm key
                    onClick={() => setCurrentQuestionIndex(questionIndex)} // Cập nhật currentQuestionIndex bằng index trong mảng gộp
                    className={`w-12 h-12 text-lg font-semibold rounded-lg transition-all flex items-center justify-center ${
                      currentQuestionIndex === questionIndex
                        ? "bg-red-600 text-white"
                        : selectedAnswers[questionIndex]
                        ? "bg-red-400 hover:bg-red-500"
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-white"
                    }`}
                  >
                    {questionIndex + 1} {/* Hiển thị số câu hỏi thực tế */}
                  </button>
                );
              })}
          </div>

          {/* Nút Hoàn Thành */}
          {!isCompleted && (
            <button
              onClick={checkFinalResult}
              className="mt-4 w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all"
            >
              Hoàn Thành
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HSK1Quiz;
