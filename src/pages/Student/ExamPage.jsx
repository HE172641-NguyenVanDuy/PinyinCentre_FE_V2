import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/Shared/AuthContext";
import { getExamById } from "../../Data/hsk-exams";
import HSKQuiz from "../../components/Quiz/HSKQuiz";

// Import exam data files
import hsk1QuizData1 from "../../Data/hsk1-quiz1";
import hsk1QuizData2 from "../../Data/hsk1-quiz2";

const ExamPage = () => {
  const { examId } = useParams();
  const { role } = useAuth();
  const navigate = useNavigate();
  const [examInfo, setExamInfo] = useState(null);
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== 3) {
      navigate("/login");
      return;
    }
    loadExamData();
  }, [role, navigate, examId]);

  const loadExamData = () => {
    setLoading(true);
    try {
      // Get exam info from our data
      const exam = getExamById(examId);
      if (!exam) {
        navigate("/student/exams");
        return;
      }
      setExamInfo(exam);

      // Load exam data based on examData reference
      let data = null;
      switch (exam.examData) {
        case "hsk1-quiz1":
          data = hsk1QuizData1;
          break;
        case "hsk1-quiz2":
          data = hsk1QuizData2;
          break;
        // Add more cases for other exam data files
        default:
          // For now, use HSK1 quiz 1 as fallback
          data = hsk1QuizData1;
          break;
      }
      setExamData(data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu đề thi:", error);
      navigate("/student/exams");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!examInfo || !examData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Không tìm thấy đề thi
          </h2>
          <button
            onClick={() => navigate("/student/exams")}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
          >
            Quay lại thư viện đề thi
          </button>
        </div>
      </div>
    );
  }

  return <HSKQuiz examData={examData} examInfo={examInfo} />;
};

export default ExamPage;
