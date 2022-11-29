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

const convertDate = (date = "") => {
  return date.split("T")[0]
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

  const { id, trailer, poster, title, storyLine, director = {}, reviews = {}, writers = [], cast = [], language, releseDate } = movie
  return <div className="dark:bg-primary bg-white min-h-screen pb-10">
    <Container>
      <video poster={poster} controls src={trailer}></video>
      <div className="flex justify-between">
        <h1 className="text-4xl text-highlight dark:text-highlight-dark font-semibold py-3">{title}</h1>
        <div className="flex flex-col items-end">
          <RatingStar rating={reviews.ratingAvg} />
          <Link className="text-highlight dark:text-highlight-dark" to={'/movie/reviews/' + id}>{convertReviewCount(reviews.reviewCount)} Reviews</Link>
          <button className="text-highlight dark:text-highlight-dark hover:underline">Rate The Movie</button>
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-light-subtle dark:text-dark-subtle">{storyLine}</p>
        <div className="flex space-x-2">
          <p className="text-light-subtle dark:text-dark-subtle font-semibold">Director:</p>
          <p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">{director.name}</p>
        </div>
        <div className="flex">
          <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">Writer:</p>
          <div className="space-x-2">
            {writers.map((w) => {
              return (
                <p key={w.id} className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">{w.name}</p>
              )
            })}
          </div>
        </div>
        <div className="flex">
          <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">Cast:</p>
          <div className="flex space-x-2">
            {cast.map((c) => {
              return c.leadActor ? (
                <p key={c.profile.id} className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">{c.profile.name}</p>
              ):null
            })}
          </div>
        </div>
        <div className="flex space-x-2">
          <p className="text-light-subtle dark:text-dark-subtle font-semibold">Language:</p>
          <p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">{language}</p>
        </div>
        <div className="flex space-x-2">
          <p className="text-light-subtle dark:text-dark-subtle font-semibold">Relese Date:</p>
          <p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">{convertDate(releseDate)}</p>
        </div>
      </div>
    </Container>
  </div>;
}
