import React from "react";
import { FaBookmark } from "react-icons/fa";

const ResultCard = ({ item }) => {
  return (
    <div className="h-80 w-70 bg-white/50 text-black overflow-hidden rounded-xl relative">
      {item.type == "Photos" ? (
        <img
          className=" h-full w-full object-cover object-center "
          src={item.src}
          alt="Photos"
        />
      ) : (
        ""
      )}
      {item.type == "Videos" ? (
        <video
          className=" h-full w-full  object-fill object-center "
          autoPlay
          muted
          loop
          src={item.src}
        ></video>
      ) : (
        ""
      )}
      {item.type == "GIF" ? (
        <img
          className=" h-full w-full object-cover object-center "
          src={item.src}
          alt="GIf"
        />
      ) : (
        ""
      )}
      <div className="flex items-start gap-4 justify-between w-full h-15 absolute bottom-0 px-4 bg-linear-to-b from-transparent to-black">
        <h2 className="text-white text-lg ">{item.title}</h2>
        <button className="text-indigo-600">
          <FaBookmark />
          
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
