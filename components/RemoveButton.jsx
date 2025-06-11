import React from "react";
import { HiOutlineTrash } from "react-icons/hi";

const RemoveButton = () => {
  return (
    <div>
      <button className="text-red-500 text-semibold cursor-pointer">
        <HiOutlineTrash size={24} />
      </button>
    </div>
  );
};

export default RemoveButton;
