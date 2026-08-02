import React, { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="animate-scale-in fixed bottom-5 right-5 z-40 flex size-11 items-center justify-center rounded-full border border-line bg-surface-2/90 text-ink shadow-lg backdrop-blur-md transition-transform hover:-translate-y-0.5 cursor-pointer sm:bottom-7 sm:right-7"
    >
      <FiArrowUp size={18} />
    </button>
  );
};

export default ScrollToTop;
