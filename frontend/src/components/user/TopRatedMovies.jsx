import React, { useState, useEffect } from "react";
import { getTopRatedMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import GridContainer from "../GridContainer";

export default function TopRateMovies() {
  const [movies, setMovies] = useState([]);
  const { updateNotification } = useNotification();

  const fetchMovies = async () => {
    const { error, movies } = await getTopRatedMovies();
    if (error) return updateNotification("error", error);

    setMovies([...movies]);
  };

  const trimTitle = (text = "") => {
    if (text.length <= 20) return text;
    return text.substring(0, 20) + "...";
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <GridContainer>
      {movies.map((movie) => {
        return (
          <div key={movie.id}>
            <img
              className="aspect-video object-cover"
              src={movie.poster}
              alt={movie.title}
            />
            <h1 title={movie.title}>{trimTitle(movie.title)}</h1>
          </div>
        );
      })}
    </GridContainer>
  );
}
