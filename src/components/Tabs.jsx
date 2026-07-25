import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveTabs,
  clearResults,
  setPage,
} from "../redux/features/searchSlice";

const Tabs = () => {
  const tabs = ["photos", "videos", "gif"];

  const activeTabs = useSelector((state) => state.search.activeTabs);
  const handleClick = (tab) => {
    dispatch(setActiveTabs(tab));
    dispatch(clearResults());
    dispatch(setPage(1));
  };

  const dispatch = useDispatch();
  return (
    <div className="flex gap-5 my-5 mx-5">
      {tabs.map((tab, idx) => (
        <button
          key={idx}
          className={`${activeTabs == tab ? "bg-blue-600 " : "bg-gray-500"} uppercase py-2 px-5 rounded cursor-pointer active:scale-95 transition-all`}
          onClick={() => handleClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
