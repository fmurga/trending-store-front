import React from "react";

export const ButtonContainer = ({ disable, onClick, children }) => {
  return (
    <button
      type="button"
      className="px-3 py-2 w-max  text-white flex justify-center items-center cursor-pointer bg-purple-600 rounded-full hover:bg-purple-400 disabled:bg-purple-400 "
      disabled={disable}
      onClick={() => onClick()}>
      {children}
    </button>
  );
};
