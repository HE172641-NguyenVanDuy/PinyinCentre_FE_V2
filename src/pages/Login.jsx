import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../components/Shared/AuthContext";
import { apiFetch } from "../utils/api";
import Logo from "/assets/logo/logoPinyin1.png";
import {authService} from "../utils/authService.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // 1. Gọi hàm login từ authService
            // Lưu ý: authService.login đã xử lý response.json() và lưu token vào localStorage rồi
            const res = await authService.login(email, password);

            // 2. Kiểm tra success dựa trên object mà authService trả về
            if (!res.success) {
                throw new Error(res.message || "Email hoặc mật khẩu không đúng!");
            }

            // 3. Lấy dữ liệu user và tokens từ kết quả trả về của authService

            // tokens ở đây chính là data.data từ BE (chứa accessToken, roles,...)
            const accessToken = res.data.accessToken;
            const roles = res.data.roles || [];

            // 4. Phân loại Role để điều hướng (Sử dụng các hằng số từ BE trả về)
            let roleNum = 0;

            // Kiểm tra chính xác các giá trị roles trong mảng ["CENTRE_OWNER"]
            const isAdmin = roles.some(r => ["ADMIN", "CENTRE_OWNER", "ADMIN_SYSTEM"].includes(r));
            const isTeacher = roles.some(r => ["TEACHER"].includes(r));
            const isStudent = roles.some(r => ["STUDENT"].includes(r));

            if (isAdmin) {
                roleNum = 1;
            } else if (isTeacher) {
                roleNum = 2;
            } else if (isStudent) {
                roleNum = 3;
            }

            console.log("Parsed Token:", accessToken, "Parsed RoleNum:", roleNum);

            // 5. Gọi hàm login từ Context (nếu bạn dùng AuthContext)
            // và truyền đúng accessToken
            if (typeof login === 'function') {
                login(accessToken, roleNum);
            }

            toast.success("Đăng nhập thành công!", { autoClose: 700 });

            // 6. Điều hướng người dùng
            setTimeout(() => {
                switch (roleNum) {
                    case 1:
                        navigate("/admin");
                        break;
                    case 2:
                        navigate("/teacher");
                        break;
                    case 3:
                        navigate("/student");
                        break;
                    default:
                        navigate("/");
                }
            }, 1000);

        } catch (err) {
            console.error("Handle login error:", err);
            toast.error(err.message || "Đăng nhập thất bại!");
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-orange-400 to-red-500 items-center justify-center">
        <div className="text-center px-10">
          <img
            src={Logo}
            alt="Logo"
            className="w-32 mx-auto mb-6 drop-shadow-lg"
          />
          <h1 className="text-4xl font-bold text-white mb-4">
            Chào mừng đến với <br /> Pinyin Centre
          </h1>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-8">
        <div className="max-w-md w-full">
          <div className="mb-6 text-center">
            <img src={Logo} alt="Logo" className="w-16 mx-auto mb-2" />
            <h2 className="text-3xl font-bold text-red-500">Đăng Nhập</h2>
            <p className="text-gray-600 mt-1">
              Đăng nhập vào hệ thống Pinyin Centre
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email hoặc Username
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email hoặc username"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 rounded-xl hover:brightness-110 transition-all shadow-md hover:shadow-xl"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
            <div className="relative flex items-center justify-center mt-6">
              <span className="absolute bg-white px-2 text-sm text-gray-500">Hoặc</span>
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <button
              type="button"
              onClick={async () => {
                try {
                  const res = await apiFetch("/auth/login-google");
                  const json = await res.json();
                  if (json.data) {
                    window.location.href = json.data;
                  }
                } catch (err) {
                  toast.error("Lỗi khi kết nối Google Login");
                }
              }}
              className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-xl hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center mt-4"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
              Đăng nhập với Google
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            © {new Date().getFullYear()} Pinyin Centre. All rights reserved.
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
