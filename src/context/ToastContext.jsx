import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { FiCheckCircle, FiXCircle, FiInfo } from "react-icons/fi";

const ToastContext = createContext(null);

const ICONS = {
  success: <FiCheckCircle className="text-emerald-400 shrink-0" size={18} />,
  error: <FiXCircle className="text-rose-400 shrink-0" size={18} />,
  info: <FiInfo className="text-photos shrink-0" size={18} />,
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (message, type = "info", duration = 2600) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, message, type }]);
      window.setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div
        className="fixed bottom-4 left-1/2 z-100 flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:bottom-6"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            onClick={() => dismiss(t.id)}
            className="animate-slide-up flex cursor-pointer items-center gap-2 rounded-xl border border-(--color-border-dark) bg-surface-2/95 px-4 py-3 text-sm text-ink shadow-lg backdrop-blur-md"
          >
            {ICONS[t.type]}
            <span className="leading-snug">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
};
