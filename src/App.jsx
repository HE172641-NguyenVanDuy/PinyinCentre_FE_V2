import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import DocumentsPage from "./pages/Documents";
import Layout from "./components/Shared/Layout";
import Contact from "./pages/Contact";
import QuizPage from "./pages/Quiz";
import UnderDevelopment from "./pages/UnderDevelopment";
import ExamHSK from "./pages/ExamHSK";
import ChatPage from "./pages/Student/ChatBotAI";
import HSKCourses from "./pages/Courses/HSKCourses";
import ComboHSKCourses from "./pages/Courses/ComboHSKCourses";
import { AuthProvider } from "./components/Shared/AuthContext";
import ScrollToTop from "./components/Shared/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Teacher pages
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import TeacherSchedule from "./pages/Teacher/TeacherSchedule";
import TeacherClasses from "./pages/Teacher/TeacherClasses";

// Student pages
import StudentDashboard from "./pages/Student/StudentDashboard";
import StudentExams from "./pages/Student/StudentExams";
import StudentSchedule from "./pages/Student/StudentSchedule";
import StudentClasses from "./pages/Student/StudentClasses";
import HSKLevelExams from "./pages/Student/HSKLevelExams";
import ExamPage from "./pages/Student/ExamPage";
import AttendancePage from "./pages/Attendance/AttendancePage";
import StudentAttendancePage from "./pages/Attendance/StudentAttendancePage";
import GoogleCallback from "./pages/GoogleCallback";

const App = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=AW-16930221747";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;

      gtag("js", new Date());
      gtag("config", "AW-16930221747");
    };
  }, []);
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/exam" element={<ExamHSK />} />
            <Route path="/under-development" element={<UnderDevelopment />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/chatbot" element={<ChatPage />} />
            {/* Course Routes */}
            <Route path="/courses/hsk" element={<HSKCourses />} />
            <Route path="/courses/hsk-:level" element={<HSKCourses />} />
            <Route path="/courses/combo-hsk" element={<ComboHSKCourses />} />
            <Route
              path="/courses/combo-hsk-:levels"
              element={<ComboHSKCourses />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/login/*" element={<Login />} />

          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/schedule" element={<TeacherSchedule />} />
          <Route path="/teacher/classes" element={<TeacherClasses />} />

          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/exams" element={<StudentExams />} />
          <Route path="/student/exams/:level" element={<HSKLevelExams />} />
          <Route path="/student/exam/:examId" element={<ExamPage />} />
          <Route path="/student/schedule" element={<StudentSchedule />} />
          <Route path="/student/classes" element={<StudentClasses />} />

          {/* Google OAuth Callback */}
          <Route path="/callback" element={<GoogleCallback />} />

          {/* Attendance Routes */}
          <Route path="/attendance" element={<AttendancePage />} />
          <Route
            path="/attendance/student"
            element={<StudentAttendancePage />}
          />
        </Routes>
      </Router>
      <Analytics />
      <ToastContainer position="top-center" autoClose={2000} />
    </AuthProvider>
  );
};

export default App;
