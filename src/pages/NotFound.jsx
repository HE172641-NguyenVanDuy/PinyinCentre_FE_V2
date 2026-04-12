import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 - Không tìm thấy trang</h1>
      <Link to="/" className="text-blue-500 mt-4">
        Quay về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
