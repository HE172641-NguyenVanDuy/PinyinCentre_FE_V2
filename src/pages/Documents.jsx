
import Documents from "../components/Documents/Documents";
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const DocumentsPage = () => {

  useEffect(() => {
      AOS.init({
        offset: 100,
        duration: 800,
        easing: "ease-in-sine",
        delay: 100,
      });
      AOS.refresh();
    }, []);
  return (
    <div>
      <Documents />
    </div>
  );
};

export default DocumentsPage;
