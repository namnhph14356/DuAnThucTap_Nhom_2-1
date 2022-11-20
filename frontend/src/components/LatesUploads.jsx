import React from "react";
import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";
export default function LatesUploads() {
  return (
    <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded col-span-2">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        Recent Uploads
      </h1>

      <MovieListItem />
    </div>
  );
}

const MovieListItem = () => {
  return (
    <table className="w-full border-b">
      <tbody>
        <tr>
          <td>
            <div className="w-24">
              <img
                className="w-full aspect-video"
                src="https://images.unsplash.com/photo-1473830394358-91588751b241?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
                alt=""
              />
            </div>
          </td>
          <td className="w-full pl-5">
            <div>
              <h1 className="text-lg font-semibold text-primary dark:text-white">
                Lorem ipsum dolor sit amet.
              </h1>
              <div className="space-x-1">
                <span className="text-primary dark:text-white text-xs">
                  Action
                </span>
                <span className="text-primary dark:text-white text-xs">
                  Drama
                </span>
              </div>
            </div>
          </td>

          <td>
            <p className="px-5 text-primary dark:text-white">public</p>
          </td>

          <td>
            <div className="flex items-center space-x-3 text-primary dark:text-white text-lg">
              <button type="button">
                <BsTrash />
              </button>
              <button type="button">
                <BsPencilSquare />
              </button>
              <button type="button">
                <BsBoxArrowUpRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
