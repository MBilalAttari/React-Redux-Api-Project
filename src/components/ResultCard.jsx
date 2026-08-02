import React, { memo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiBookmark } from "react-icons/fi";
import { toggleSaved, selectIsSaved } from "../redux/features/collectionSlice";
import { TAB_LOOKUP } from "../utils/constants";
import { useToast } from "../context/ToastContext";

const ResultCard = ({ item, onOpen }) => {
  const dispatch = useDispatch();
  const { notify } = useToast();
  const isSaved = useSelector(selectIsSaved(item));
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef(null);
  const tabMeta = TAB_LOOKUP[item.type.toLowerCase()] || TAB_LOOKUP.photos;

  const handleSave = (e) => {
    e.stopPropagation();
    dispatch(toggleSaved(item));
    notify(isSaved ? "Removed from saved" : "Saved to your collection", isSaved ? "info" : "success");
  };

  const playPreview = () => videoRef.current?.play().catch(() => {});
  const pausePreview = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(item)}
      onKeyDown={(e) => (e.key === "Enter" ? onOpen(item) : null)}
      onMouseEnter={item.type === "Videos" ? playPreview : undefined}
      onMouseLeave={item.type === "Videos" ? pausePreview : undefined}
      style={{
        "--accent": tabMeta.color,
        aspectRatio: item.width && item.height ? `${item.width} / ${item.height}` : undefined,
      }}
      className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-line bg-surface-2 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-8px_var(--accent)]"
    >
      {!loaded && <div className="skeleton absolute inset-0" aria-hidden="true" />}

      {item.type === "Photos" && (
        <img
          src={item.src}
          alt={item.title || "Photo"}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`block w-full h-auto transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {item.type === "Videos" && (
        <video
          ref={videoRef}
          src={item.src}
          poster={item.thumbnel}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setLoaded(true)}
          className={`block w-full h-auto transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {item.type === "GIF" && (
        <img
          src={item.src}
          alt={item.title || "GIF"}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`block w-full h-auto transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}

      <span
        className="absolute left-3 top-3 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-white shadow"
        style={{ backgroundColor: tabMeta.color }}
      >
        {item.type}
      </span>

      <button
        onClick={handleSave}
        aria-label={isSaved ? "Remove from saved" : "Save item"}
        className={`absolute right-3 top-3 flex size-8 items-center justify-center rounded-full backdrop-blur-md transition-all cursor-pointer ${
          isSaved
            ? "bg-saved text-black opacity-100"
            : "bg-black/40 text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 hover:bg-black/60"
        }`}
      >
        <FiBookmark size={14} className={isSaved ? "fill-black" : ""} />
      </button>

      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/30 to-transparent px-3 pb-2.5 pt-8">
        <h2 className="truncate text-sm font-medium text-white">{item.title || "Untitled"}</h2>
      </div>
    </div>
  );
};

export default memo(ResultCard);
