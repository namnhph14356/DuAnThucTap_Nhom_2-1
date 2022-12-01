/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getMostReatedMovies } from "../api/admin";
import { useNotification } from "../hooks";

export default function MostRatedMovies() {
  const [movies, setMovies] = useState([]);

  const { updateNotification } = useNotification();

  const fetchMostRatedMovies = async () => {
    const { error, movies } = await getMostReatedMovies();
    if (error) return updateNotification("error", error);

    setMovies([...movies]);
  };

  useEffect(() => {
    fetchMostRatedMovies();
  }, []);
  return (
    <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded">
      {movies.map((movie) => {
        return <p>{movie.title}</p>;
      })}
    </div>
  );
}
