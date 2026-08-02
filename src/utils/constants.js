import { FiImage, FiFilm, FiZap, FiBookmark } from "react-icons/fi";

// Single source of truth for each media tab: label, icon, and its signature accent color.
// The accent threads through the tab underline, card hover glow, and badges.
export const TABS = [
  { id: "photos", label: "Photos", icon: FiImage, color: "var(--color-photos)", colorClass: "photos" },
  { id: "videos", label: "Videos", icon: FiFilm, color: "var(--color-videos)", colorClass: "videos" },
  { id: "gif", label: "GIFs", icon: FiZap, color: "var(--color-gif)", colorClass: "gif" },
  { id: "saved", label: "Saved", icon: FiBookmark, color: "var(--color-saved)", colorClass: "saved" },
];

export const TAB_LOOKUP = TABS.reduce((acc, t) => ({ ...acc, [t.id]: t }), {});

export const SUGGESTED_SEARCHES = [
  "nature",
  "architecture",
  "food",
  "travel",
  "technology",
  "animals",
  "abstract",
  "space",
];
