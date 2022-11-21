/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getMovies } from "../../api/movie";
import MovieListItem from "../MovieListItem";
import { useNotification } from "../../hooks";

const limit = 10;
let currentPageNo = 0;

export default function Movies() {
  const [movies, setMovies] = useState([]);

  const { updateNotification } = useNotification();

  const fetchMovies = async (pageNo) => {
    const { error, movies } = await getMovies(pageNo, limit);
    if (error) updateNotification("error", error);
    setMovies([...movies]);
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div className="space-y-3 p-5">
      {movies.map((movie) => {
        return <MovieListItem movie={movie} />;
      })}
    </div>
  );
}
