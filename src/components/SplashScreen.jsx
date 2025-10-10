// src/components/SplashScreen.jsx
import { useState, useEffect } from "react";
import l1 from "../assets/images/logo.jpg";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // notify parent to hide splash
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-700">
      <img
        src={l1}// replace with your image path
        alt="Splash"
        className="w-1/2 md:w-1/3 animate-pulse"
      />
    </div>
  );
}
