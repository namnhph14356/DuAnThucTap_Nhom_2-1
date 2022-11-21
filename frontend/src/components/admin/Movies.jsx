/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getMovies } from "../../api/movie";
import MovieListItem from "../MovieListItem";
import { useNotification } from "../../hooks";
import NextAndPrevButton from "../NextAndPrevButton";

const limit = 10;
let currentPageNo = 0;

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);

  const { updateNotification } = useNotification();

  const fetchMovies = async (pageNo) => {
    const { error, movies } = await getMovies(pageNo, limit);
    if (error) updateNotification("error", error);

    if (!movies.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }
    setMovies([...movies]);
  };

  const handleOnNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchMovies(currentPageNo);
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div className="space-y-3 p-5">
      {movies.map((movie) => {
        return <MovieListItem movie={movie} />;
      })}
      <NextAndPrevButton
        className="mt-5"
        onNextClick={handleOnNextClick}
        // onPrevClick={handleOnPrevClick}
      />
    </div>
  );
}
