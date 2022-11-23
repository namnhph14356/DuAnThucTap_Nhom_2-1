/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getMovieForUpdate, getMovies } from "../../api/movie";
import MovieListItem from "../MovieListItem";
import { useNotification } from "../../hooks";
import NextAndPrevButton from "../NextAndPrevButton";
import UpdateMovie from "../modals/UpdateMovie";
import ConfirmModal from "../modals/ConfirmModal"
const limit = 10;
let currentPageNo = 0;

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfimModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);
    currentPageNo -= 1;
    fetchMovies(currentPageNo);
  };

  const handleOnEditClick = async ({ id }) => {
    const { movie, error } = await getMovieForUpdate(id);
    if (error) return updateNotification("error", error);
    setSelectedMovie(movie);
    setShowUpdateModal(true);
  };
  const handleOnDeleteClick = async (movie) => {
    setShowUpdateModal(movie);
    setShowConfimModal(true)
  }
  const handleOnDeleteConfirm = () => {

  }

  const handleOnUpdate = (movie) => {
    const updateMovie = movie.map((m) => {
      if(m.id === movie.id) return movie;
      return m
    });

    setMovies([...updateMovie])
  };

  const hideUpdateForm = () => setShowUpdateModal(false);
  const hideConfirmModal = () => setShowConfimModal(false);

  useEffect(() => {
    fetchMovies(currentPageNo);
  }, []);
  return (
    <>
      <div className="space-y-3 p-5">
        {movies.map((movie) => {
          return (
            <MovieListItem
              key={movie.id}
              movie={movie}
              onEditClick={() => handleOnEditClick(movie)}
              onDeleteClick={() => handleOnDeleteClick(movie)}
            />
          );
        })}
        <NextAndPrevButton
          className="mt-5"
          onNextClick={handleOnNextClick}
          onPrevClick={handleOnPrevClick}
        />
      </div>
      <ConfirmModal visible={showConfirmModal} onConfirm={handleOnDeleteConfirm} onCancel={hideConfirmModal} title='Are you sure' subtitle='This action will remove this movie permanently!' />
      <UpdateMovie visible={showUpdateModal} initialState={selectedMovie} onSucces={handleOnUpdate} onClose={hideUpdateForm} />
    </>
  );
}
