"use client";

// components/ThemeToggle.tsx
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="mt-1 text-sm w-18 h-5 shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-blue-800 bg-[#0070f3] rounded-md text-white font-light hover:text-gray-300 transition duration-200 ease-linear cursor-pointer"
    ></button>
  );
};

export default ThemeToggle;