// Sử dụng base URL động cho production và proxy cho dev
export function apiFetch(path, options = {}) {
  // Đảm bảo path luôn bắt đầu bằng '/'
  const normalizedPath = path.startsWith("/") ? path : "/" + path;
  const isProd = import.meta.env.PROD;
  const base = isProd ? "https://api.tiengtrungbackinh.store" : "";

  // Lấy token từ localStorage
  const token = localStorage.getItem("token");

  // Debug log
  console.log("API Call:", `${base}/api${normalizedPath}`);
  console.log("Token:", token ? "Present" : "Missing");

  // Tạo headers mặc định
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  // Thêm Authorization header nếu có token
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  // Merge headers
  const finalOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  console.log("Final options:", finalOptions);

  return fetch(`${base}/api${normalizedPath}`, finalOptions);
}
