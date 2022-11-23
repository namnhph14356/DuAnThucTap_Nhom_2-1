/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getMovies } from "../api/movie";
import { useNotification } from "../hooks";
import MovieListItem from "./MovieListItem";

const pageNo = 0;
const limit = 5;

export default function LatestUploads() {
  const [movies, setMovies] = useState([]);
  const { updateNotification } = useNotification();

  const fetchLastestUploads = async () => {
    const { error, movies } = await getMovies(pageNo, limit);
    if (error) return updateNotification("error", error);

    setMovies([...movies]);
  };

  useEffect(() => {
    fetchLastestUploads();
  }, []);
  return (
    <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded col-span-2">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        Recent Uploads
      </h1>
      <div className="space-y-3">
        {movies.map((movie) => {
          return <MovieListItem movie={movie} key={movie.id} />;
        })}
      </div>
    </div>
  );
}
