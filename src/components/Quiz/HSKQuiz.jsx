import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Clock, AlertTriangle } from "lucide-react";
import FloatingChatIcons from "../Shared/FloatingChatIcons";

const HSKQuiz = ({ examData, examInfo }) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(examInfo.duration * 60); // Convert to seconds
  const [isTimeStopped, setIsTimeStopped] = useState(false);
  const [currentTab, setCurrentTab] = useState("listening");

  // Get all questions from the exam data
  const allQuestions = [
    ...(examData[0]?.exam?.listening?.questions || []),
    ...(examData[0]?.exam?.reading?.questions || []),
  ];

  const currentQuestion = allQuestions[currentQuestionIndex];
  const audio = examData[0]?.exam?.audio_file;

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isTimeStopped) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      checkFinalResult(); // Auto submit when time runs out
    }
  }, [timeLeft, isTimeStopped]);

  // Format time (mm:ss)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle answer selection
  const handleSelectAnswer = (answer) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: answer });
  };

  // Check final result when "Hoàn Thành" is clicked
  const checkFinalResult = () => {
    let newScore = 0;

    // Check listening questions
    examData[0].exam.listening.questions.forEach((question) => {
      if (selectedAnswers[question.id - 1] === question.correct_answer) {
        newScore++;
      }
    });

    // Check reading questions
    examData[0].exam.reading.questions.forEach((question) => {
      if (selectedAnswers[question.id - 1] === question.correct_answer) {
        newScore++;
      }
    });

    // Update score and status
    setScore(newScore);
    setIsCompleted(true);
    setIsTimeStopped(true); // Stop timer when submitting
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/student/exams")}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="font-medium">Quay lại thư viện đề thi</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {examInfo.title}
                </h1>
                <p className="text-sm text-gray-600">
                  {examInfo.level} • {examInfo.question_count} câu hỏi •{" "}
                  {examInfo.duration} phút
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Progress indicator */}
              <div className="text-center">
                <div className="text-sm text-gray-600">Tiến độ</div>
                <div className="text-lg font-bold text-red-600">
                  {Object.keys(selectedAnswers).length}/{allQuestions.length}
                </div>
              </div>

              {/* Timer */}
              <div className="flex items-center space-x-2 px-4 py-2 bg-red-100 rounded-lg">
                <Clock className="h-4 w-4 text-red-600" />
                <span className="font-semibold text-red-600">
                  {formatTime(timeLeft)}
                </span>
              </div>

              {/* Warning when time is low */}
              {timeLeft <= 300 && timeLeft > 0 && (
                <div className="flex items-center space-x-2 px-3 py-2 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-700">
                    Còn ít thời gian!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
        {/* Quiz Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 dark:text-yellow-400 mb-2">
            {examInfo.level}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chào mừng bạn đến với bài thi {examInfo.level}. Hãy đọc kỹ câu hỏi
            và chọn đáp án chính xác nhất.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Left side: Display current question */}
          <div className="w-3/4 bg-white rounded-xl shadow-lg border border-orange-200 overflow-hidden">
            {/* Question header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h2 className="text-lg font-semibold">
                    {currentTab === "listening"
                      ? "🎧 Phần Nghe"
                      : "📖 Phần Đọc"}
                  </h2>
                  <p className="text-sm opacity-90">
                    Câu {currentQuestion?.id} / {allQuestions.length}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-90">Thời gian còn lại</div>
                  <div className="text-xl font-bold">
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              {currentTab === "listening" &&
                currentQuestion?.type !== "nghe_text" && (
                  <div className="mb-6 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-gray-700">
                        Phát âm thanh
                      </span>
                    </div>
                    <audio controls className="w-full">
                      <source src={audio} type="audio/mp3" />
                      Trình duyệt của bạn không hỗ trợ phát âm thanh.
                    </audio>
                  </div>
                )}

              {!isCompleted ? (
                <div>
                  {currentTab === "reading" && currentQuestion?.question && (
                    <div className="mb-6 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {currentQuestion.question}
                      </h2>
                    </div>
                  )}

                  {/* If question has images (3 images) */}
                  {currentQuestion?.type === "nghe_3_hinh" && (
                    <div className="flex justify-center gap-6 items-center">
                      {currentQuestion.choices.map((choice, index) => (
                        <button
                          key={index}
                          className={`border-2 p-4 rounded-xl transition-all hover:shadow-lg ${
                            selectedAnswers[currentQuestionIndex] ===
                            choice.text
                              ? "border-red-500 bg-red-50 shadow-lg"
                              : "border-gray-200 hover:border-red-300"
                          }`}
                          onClick={() => handleSelectAnswer(choice.text)}
                        >
                          <img
                            src={choice.src}
                            alt={`Option ${choice.text}`}
                            className="w-32 h-32 object-contain mb-3"
                          />
                          <p className="text-center font-medium text-gray-700">
                            {choice.text}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* If question has single image (True/False) */}
                  {(currentQuestion?.type === "nghe_hinh_anh" ||
                    currentQuestion?.type === "doc_hinh_anh") && (
                    <div className="flex flex-col items-center">
                      {/* Display image */}
                      <div className="mb-6 bg-gray-50 rounded-lg p-4">
                        <img
                          src={currentQuestion.image}
                          alt={`Question ${currentQuestion.id}`}
                          className="w-80 h-80 object-contain"
                        />
                      </div>

                      {/* Display True/False choices */}
                      <div className="flex gap-6">
                        {currentQuestion.choices.map((choice, index) => {
                          const choiceText = Object.values(choice)[0];
                          const choiceKey = Object.keys(choice)[0];
                          return (
                            <button
                              key={index}
                              className={`w-32 p-4 border-2 rounded-xl transition-all font-medium ${
                                selectedAnswers[currentQuestionIndex] ===
                                choiceKey
                                  ? "border-red-500 bg-red-500 text-white shadow-lg"
                                  : "border-gray-300 hover:border-red-400 hover:bg-red-50"
                              }`}
                              onClick={() => handleSelectAnswer(choiceKey)}
                            >
                              {choiceKey}: {choiceText}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Common choices questions */}
                  {(currentQuestion?.type === "nghe_common_choices" ||
                    currentQuestion?.type === "doc_common_choices") && (
                    <div className="flex gap-8 items-start">
                      <div className="w-2/3">
                        {currentQuestion.type === "nghe_common_choices" &&
                          examData[0].exam.common_listening && (
                            <div className="mb-6 bg-gray-50 rounded-lg p-4">
                              <img
                                src={examData[0].exam.common_listening}
                                alt="Common listening image"
                                className="w-full h-96 object-contain"
                              />
                            </div>
                          )}

                        {currentQuestion.id >= 26 &&
                          currentQuestion.id <= 30 &&
                          examData[0].exam.common_reading1 && (
                            <div className="mb-6 bg-gray-50 rounded-lg p-4">
                              <img
                                src={examData[0].exam.common_reading1}
                                alt="Common reading image"
                                className="w-full h-96 object-contain"
                              />
                            </div>
                          )}

                        {/* Display vocabulary for questions 31-35 */}
                        {currentQuestion.id >= 31 &&
                          currentQuestion.id <= 35 &&
                          examData[0].exam.common_reading2 && (
                            <div className="mb-6 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                              <h3 className="font-semibold text-gray-900 mb-4">
                                Từ vựng tham khảo:
                              </h3>
                              <ul className="space-y-3">
                                {Object.entries(
                                  examData[0].exam.common_reading2[0]
                                ).map(([key, value], index) => (
                                  <li
                                    key={index}
                                    className="text-lg flex items-center space-x-3"
                                  >
                                    <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                      {key}
                                    </span>
                                    <span className="font-medium">{value}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {/* Display vocabulary for questions 36-40 */}
                        {currentQuestion.id > 35 &&
                          currentQuestion.id <= 40 &&
                          examData[0].exam.common_reading3 && (
                            <div className="mb-6 bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                              <h3 className="font-semibold text-gray-900 mb-4">
                                Từ vựng tham khảo:
                              </h3>
                              <ul className="space-y-3">
                                {Object.entries(
                                  examData[0].exam.common_reading3[0]
                                ).map(([key, value], index) => (
                                  <li
                                    key={index}
                                    className="text-lg flex items-center space-x-3"
                                  >
                                    <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                      {key}
                                    </span>
                                    <span className="font-medium">{value}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>

                      {/* Display multiple choice options on the right */}
                      <div className="w-1/3 flex flex-col space-y-3">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Chọn đáp án:
                        </h3>
                        {examData[0].exam[currentQuestion.choices_ref]?.[0] &&
                          Object.entries(
                            examData[0].exam[currentQuestion.choices_ref][0]
                          ).map(([key, value], index) => (
                            <button
                              key={index}
                              className={`w-full p-4 border-2 rounded-lg transition-all text-left font-medium ${
                                selectedAnswers[currentQuestionIndex] === key
                                  ? "border-red-500 bg-red-500 text-white shadow-lg"
                                  : "border-gray-300 hover:border-red-400 hover:bg-red-50"
                              }`}
                              onClick={() => handleSelectAnswer(key)}
                            >
                              <span className="inline-block w-6 h-6 bg-white text-red-500 rounded-full text-center text-sm font-bold mr-3">
                                {key}
                              </span>
                              {value}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Text questions */}
                  {currentQuestion?.type === "nghe_text" && (
                    <div className="flex flex-col items-center">
                      {/* Display audio */}
                      <div className="mb-6 bg-gray-50 rounded-lg p-4 w-full">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="font-medium text-gray-700">
                            Phát âm thanh
                          </span>
                        </div>
                        <audio controls className="w-full">
                          <source
                            src={examData[0].exam.audio_file}
                            type="audio/mp3"
                          />
                          Trình duyệt của bạn không hỗ trợ phát âm thanh.
                        </audio>
                      </div>

                      {/* Display multiple choice options */}
                      <div className="flex flex-col space-y-3 w-full max-w-2xl">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Chọn đáp án:
                        </h3>
                        {currentQuestion.choices.map((choice, index) => {
                          const choiceKey = Object.keys(choice)[0];
                          const choiceText = Object.values(choice)[0];

                          return (
                            <button
                              key={index}
                              className={`w-full p-4 border-2 rounded-lg transition-all text-left font-medium ${
                                selectedAnswers[currentQuestionIndex] ===
                                choiceKey
                                  ? "border-red-500 bg-red-500 text-white shadow-lg"
                                  : "border-gray-300 hover:border-red-400 hover:bg-red-50"
                              }`}
                              onClick={() => handleSelectAnswer(choiceKey)}
                            >
                              <span className="inline-block w-6 h-6 bg-white text-red-500 rounded-full text-center text-sm font-bold mr-3">
                                {choiceKey}
                              </span>
                              {choiceText}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mb-8">
                    <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-white">
                        {score}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-red-600 mb-2">
                      Kết Quả
                    </h2>
                    <p className="text-lg text-gray-600 mb-4">
                      Bạn trả lời đúng {score} /{" "}
                      {examData[0].exam.total_questions} câu.
                    </p>
                    <p className="text-xl font-semibold text-gray-800">
                      Tỷ lệ đúng:{" "}
                      {(
                        (score / examData[0].exam.total_questions) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => {
                        setCurrentQuestionIndex(0);
                        setScore(0);
                        setIsCompleted(false);
                        setSelectedAnswers({});
                        setTimeLeft(examInfo.duration * 60);
                        setIsTimeStopped(false);
                        setCurrentTab("listening");
                      }}
                      className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold"
                    >
                      Làm lại
                    </button>
                    <button
                      onClick={() => navigate("/student/exams")}
                      className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all font-semibold"
                    >
                      Quay lại thư viện đề thi
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right side: Question list (grid) */}
          <div className="w-1/4 bg-white rounded-xl shadow-lg border border-orange-200 overflow-hidden">
            {/* Tab selector */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-4">
              <h2 className="text-lg font-semibold text-white mb-4">
                Chọn phần thi
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCurrentTab("listening");
                    setCurrentQuestionIndex(0);
                  }}
                  className={`flex-1 p-3 rounded-lg transition-all font-medium ${
                    currentTab === "listening"
                      ? "bg-white text-red-600 shadow-lg"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  🎧 Listening
                </button>
                <button
                  onClick={() => {
                    setCurrentTab("reading");
                    setCurrentQuestionIndex(20);
                  }}
                  className={`flex-1 p-3 rounded-lg transition-all font-medium ${
                    currentTab === "reading"
                      ? "bg-white text-red-600 shadow-lg"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  📖 Reading
                </button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Danh Sách Câu Hỏi
              </h3>
              <div className="grid grid-cols-5 gap-2 mb-6">
                {/* Combine questions from Listening and Reading */}
                {[
                  ...(examData[0]?.exam?.listening?.questions || []),
                  ...(examData[0]?.exam?.reading?.questions || []),
                ]
                  .slice(
                    currentTab === "listening" ? 0 : 20,
                    currentTab === "listening" ? 20 : 40
                  )
                  .map((question, index) => {
                    const questionIndex =
                      currentTab === "listening" ? index : index + 20;

                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentQuestionIndex(questionIndex)}
                        className={`w-12 h-12 text-sm font-semibold rounded-lg transition-all flex items-center justify-center ${
                          currentQuestionIndex === questionIndex
                            ? "bg-red-600 text-white shadow-lg"
                            : selectedAnswers[questionIndex]
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {questionIndex + 1}
                      </button>
                    );
                  })}
              </div>

              {/* Legend */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-600 rounded"></div>
                  <span className="text-gray-700">Câu hiện tại</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-gray-700">Đã trả lời</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-100 rounded"></div>
                  <span className="text-gray-700">Chưa trả lời</span>
                </div>
              </div>

              {/* Complete button */}
              {!isCompleted && (
                <button
                  onClick={checkFinalResult}
                  className="mt-6 w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-semibold text-lg shadow-lg"
                >
                  🎯 Hoàn Thành Bài Thi
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <FloatingChatIcons showSocialIcons={false} />
    </div>
  );
};

export default HSKQuiz;
