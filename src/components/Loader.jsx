import React from "react";
import { HashLoader } from "react-spinners";

const Loader = ({ size = 32 }) => {
  return (
    <div className="flex items-center justify-center py-10" role="status" aria-label="Loading">
      <HashLoader color="var(--color-photos)" size={size} />
    </div>
  );
};

export default Loader;
