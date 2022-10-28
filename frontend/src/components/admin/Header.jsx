import React, { useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { useTheme } from "../../hooks";

export default function Header() {
  const [showOptions, setShowOptions] = useState(false);
  const { toggleTheme } = useTheme();
  return (
    <div className="flex item-center justify-between relative">
      <input
        type="text"
        className="border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary
        dark:text-white transition bg-transparent rounded text-lg p-1 outline-none"
        placeholder="Search Movies....."
      />

      <div className="flex items-center space-x-3">
      <button onClick={toggleTheme} className="dark:text-white text-light-subtle">
                <BsFillSunFill size={24} />
        </button>
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="flex items-center space-x-2 dark:border-dark-subtle border-light-subtle dark:text-dark-subtle text-light-subtle hover:opacity-80
      transition font-semibold border-2 rounded text-lg px-3 py-1"
        >
          <span>Create</span>
          <AiOutlinePlus />
        </button>

        <CreateOptions
          visible={showOptions}
          onClose={() => setShowOptions(false)}
        />
      </div>
    </div>
  );
}

const CreateOptions = ({ visible, onClose }) => {
    // const container = useRef();
    // const containerID = "options-container";
  if (!visible) return null;
  return (
    <div className="absolute right-0 top-12 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded animate-scale">
      <Option>Add Movie</Option>
      <Option>Add Actor</Option>
    </div>
  );
};

const Option = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="dark:text-white text-secondary hover:opacity-80 transition"
    >
      {children}
    </button>
  );
};
