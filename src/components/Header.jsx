import React, { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import lightImg from "../assets/Header-image.png"
import darkImg from '../assets/header-image1.png'
import SearchBar from "./SearchBar";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-canvas/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="flex max-w-screen flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
        <a href="/" className="flex shrink-0 items-center gap-2 select-none" aria-label="Collective Search home">
          {/* <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-photos via-gif to-videos font-[var(--font-display)] text-sm font-bold text-white">
            L
          </span>
          <span className="font-[var(--font-display)] text-lg font-bold tracking-tight text-ink">Collective Search</span> */}
          {theme == "dark"?<img src={darkImg} alt="" className="h-10 w-auto"/> :<img src={lightImg} alt="Lumo Logo" className="h-10 w-auto" />}
        </a>

        <div className="min-w-0 flex-1">
          <SearchBar />
        </div>

        <button
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="flex size-10 max-sm:absolute max-sm:top-4 max-sm:right-4 shrink-0 items-center justify-center self-end rounded-full border border-line bg-surface text-ink transition-colors hover:text-photos cursor-pointer sm:self-auto"
        >
          {theme === "dark" ? <FiSun size={17} /> : <FiMoon size={17} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
