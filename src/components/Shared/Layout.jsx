import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import FloatingChatIcons from "./FloatingChatIcons";

const Layout = () => {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow dark:bg-gray-500">
          <Outlet />
        </main>
        <FloatingChatIcons />
        <Footer />
      </div>
    );
  };

export default Layout;
