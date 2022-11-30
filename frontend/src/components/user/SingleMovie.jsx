/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleMovie } from "../../api/movie";
import { useNotification } from "../../hooks";
import Container from "../Container";
import RatingStar from "../RatingStar";

const convertReviewCount = (count) => {
  if (count < 999) return count
  return parseInt(count / 1000).toFixed(2) + 'k'
}

export default function SingleMovie() {
  const [ready, setReady] = useState(false);
  const [movie, setMovie] = useState({});

  const { movieId } = useParams();
  const { updateNotification } = useNotification();

  const fetchMovies = async () => {
    const { error, movie } = await getSingleMovie(movieId);
    if (error) return updateNotification("error", error);

    setReady(true);
    setMovie(movie);
  };

  useEffect(() => {
    if (movieId) fetchMovies();
  }, [movieId]);

  if (!ready)
    return (
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
        <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
          Please wait
        </p>
      </div>
    );

  const { id, trailer, poster, title, reviews = {} } = movie
  return <div className="dark:bg-primary bg-white">
    <Container>
      <video poster={poster} controls src={trailer}></video>
      <div className="flex justify-between">
        <h1 className="text-4xl text-highlight dark:text-highlight-dark font-semibold py-3">{title}</h1>
        <div className="flex flex-col items-end">
          <RatingStar rating={reviews.ratingAvg} />
          <Link className="text-highlight dark:text-highlight-dark" to={'/movie/reviews/' + id}>{convertReviewCount(reviews.reviewCount)}</Link>
        </div>
      </div>
    </Container>
  </div>;
}
