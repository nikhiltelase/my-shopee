import React from "react";

export default function Loader({ color, width, height }) {
  return (
    <div className="flex items-center gap-3 justify-center">
      <span
        className={`w-${width ? width : "5"} h-${
          height ? height : "5"
        } border-4 border-t-transparent border-${
          color ? color : "blue"
        }-500 rounded-full animate-spin `}
      ></span>
    </div>
  );
}
