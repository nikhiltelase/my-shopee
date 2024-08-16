import React from "react";

export default function ButtonLoader({text}) {
  return (
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      <div className="flex items-center gap-3 justify-center">
        <span className="w-5 h-5 border-4 border-t-transparent border-white-800 rounded-full animate-spin"></span>
        <h1 className="text-white">{text}...</h1>
      </div>
    </button>
  );
}

