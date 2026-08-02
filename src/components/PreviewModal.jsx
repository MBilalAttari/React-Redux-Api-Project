import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX, FiDownload, FiBookmark } from "react-icons/fi";
import { toggleSaved, selectIsSaved } from "../redux/features/collectionSlice";
import { TAB_LOOKUP } from "../utils/constants";
import { useToast } from "../context/ToastContext";

const PreviewModal = ({ item, onClose }) => {
  const dispatch = useDispatch();
  const { notify } = useToast();
  const isSaved = useSelector(item ? selectIsSaved(item) : () => false);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!item) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [item, handleKeyDown]);

  if (!item) return null;

  const tabMeta = TAB_LOOKUP[item.type.toLowerCase()] || TAB_LOOKUP.photos;

  const handleSave = () => {
    dispatch(toggleSaved(item));
    notify(isSaved ? "Removed from saved" : "Saved", isSaved ? "info" : "success");
  };

  return (
    <div
      className="animate-fade-in fixed inset-0 z-1000 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={item.title || "Media preview"}
      onClick={onClose}
    >
      <div
        className="animate-scale-in relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="rounded-full px-2.5 py-1 text-xs font-mono uppercase tracking-wide text-white"
              style={{ backgroundColor: tabMeta.color }}
            >
              {item.type}
            </span>
            <h2 className="truncate text-sm font-medium text-ink">{item.title || "Untitled"}</h2>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleSave}
              aria-label={isSaved ? "Remove from saved" : "Save item"}
              className={`flex size-9 items-center justify-center rounded-full transition-colors cursor-pointer ${
                isSaved ? "bg-saved text-black" : "bg-surface-2 text-ink hover:text-saved"
              }`}
            >
              <FiBookmark size={16} className={isSaved ? "fill-black" : ""} />
            </button>
            <a
              href={item.src}
              download
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download"
              className="flex size-9 items-center justify-center rounded-full bg-surface-2 text-ink transition-colors hover:text-photos cursor-pointer"
            >
              <FiDownload size={16} />
            </a>
            <button
              onClick={onClose}
              aria-label="Close preview"
              className="flex size-9 items-center justify-center rounded-full bg-surface-2 text-ink transition-colors hover:text-videos cursor-pointer"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center overflow-auto bg-black/40 p-2">
          {item.type === "Videos" ? (
            <video
              src={item.src}
              controls
              autoPlay
              className="max-h-[75vh] w-full rounded-lg object-contain"
            />
          ) : (
            <img
              src={item.src}
              alt={item.title || item.type}
              className="max-h-[75vh] w-full rounded-lg object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
