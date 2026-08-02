import React from "react";

const HEIGHTS = ["h-56", "h-64", "h-72", "h-60", "h-80", "h-68"];

const SkeletonCard = ({ index = 0 }) => {
  const height = HEIGHTS[index % HEIGHTS.length];
  return (
    <div
      className={`skeleton ${height} w-full break-inside-avoid rounded-2xl border border-line mb-4`}
      aria-hidden="true"
    />
  );
};

export default SkeletonCard;
