import React, { useState } from "react";
import { BsTrash, BsPencilSquare } from "react-icons/bs";

export default function Actors() {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="grid grid-cols-4 gap-3 my-5">
      <div className="bg-white shadow dark:shadow dark:bg-secondary rounded h-20 overflow-hidden">
        <div className="flex cursor-pointer relative">
          <img
            src="https://images.unsplash.com/photo-1668770235702-44e39f4dfdb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt=""
            className="w-20 aspect-square object-cover"
          />

          <div className="px-2">
            <h1 className="text-xl text-primary dark:text-white font-semibold">
              John Doe
            </h1>
            <p className="text-primary dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              sint facere dolor, maiores fugit distinctio hic sed eius
              reiciendis aperiam, beatae praesentium ducimus sequi quo,
              voluptatum nemo ratione necessitatibus repellat?
            </p>
          </div>

          {showOptions ? (
            <div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm">
              <button type="button">
                <BsTrash />
              </button>
              <button type="button">
                <BsPencilSquare />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
