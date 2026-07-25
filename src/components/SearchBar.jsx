import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery,clearResults,setPage,setHasMore } from "../redux/features/searchSlice";

const SearchBar = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(setQuery(text));
    dispatch(clearResults());
    dispatch(setPage(1));
    dispatch(setHasMore(true));
    setText("");
  };
  
  return (
    <div>
      <form onSubmit={formSubmit} className="bg-gray-900 flex px-5 py-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search anything..."
          className="outline-none m-4 text-white border-2 px-5 py-2 w-full rounded-md"
        />
        <button className="m-4 text-white border-2 px-5 py-2 rounded-md">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
