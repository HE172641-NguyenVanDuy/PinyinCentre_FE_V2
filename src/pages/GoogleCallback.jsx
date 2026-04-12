import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../components/Shared/AuthContext";
import { apiFetch } from "../utils/api";

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [status, setStatus] = useState("Đang xác thực với Google...");
  const [isError, setIsError] = useState(false);
  const hasCalled = useRef(false); // Guard against double call in StrictMode

  useEffect(() => {
    if (hasCalled.current) return; // Prevent double call (React StrictMode)
    hasCalled.current = true;

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      setStatus("Thiếu thông tin xác thực từ Google.");
      setIsError(true);
      return;
    }

    const handleCallback = async () => {
      try {
        setStatus("Đang xác thực tài khoản...");
        const res = await apiFetch(`/auth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`);
        const json = await res.json();

        if (!res.ok) {
          const errMsg = json?.message || "Đăng nhập Google thất bại!";
          setStatus(errMsg);
          setIsError(true);
          return;
        }

        const tokenData = json.data;
        const accessToken = tokenData.accessToken;
        const roles = tokenData.roles || [];

        let roleNum = 0;
        if (
          roles.includes("ROLE_ADMIN") || roles.includes("ADMIN") ||
          roles.includes("ROLE_CENTRE_OWNER") || roles.includes("CENTRE_OWNER") ||
          roles.includes("ROLE_ADMIN_SYSTEM") || roles.includes("ADMIN_SYSTEM")
        ) {
          roleNum = 1;
        } else if (roles.includes("ROLE_TEACHER") || roles.includes("TEACHER")) {
          roleNum = 2;
        } else if (roles.includes("ROLE_STUDENT") || roles.includes("STUDENT")) {
          roleNum = 3;
        }

        login(accessToken, roleNum);
        setStatus("Đăng nhập thành công! Đang chuyển hướng...");

        setTimeout(() => {
          switch (roleNum) {
            case 1: navigate("/admin"); break;
            case 2: navigate("/teacher"); break;
            case 3: navigate("/student"); break;
            default: navigate("/");
          }
        }, 1000);
      } catch (err) {
        console.error("Google callback error:", err);
        setStatus("Có lỗi xảy ra khi xử lý đăng nhập Google.");
        setIsError(true);
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-sm w-full text-center">
        {!isError ? (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-lg font-semibold text-gray-700">{status}</h2>
            <p className="text-sm text-gray-400 mt-2">Vui lòng đợi trong giây lát...</p>
          </>
        ) : (
          <>
            <div className="text-5xl mb-4">❌</div>
            <h2 className="text-lg font-semibold text-red-500">{status}</h2>
            <button
              onClick={() => navigate("/login")}
              className="mt-6 w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 rounded-xl hover:brightness-110 transition-all"
            >
              Quay lại đăng nhập
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleCallback;
