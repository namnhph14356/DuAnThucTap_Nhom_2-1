const express = require("express");
const {
  uploadTrailer,
  createMovie,
  updateMovieWithoutPoster,
  updateMovieWithPoster,
  removeMovie,
  searchMovies,
  getLatestUploads,
  getSingleMovie,
} = require("../controllers/movie");
const { isAdmin, isAuth } = require("../middlewares/auth");
const { uploadVideo, uploadImage } = require("../middlewares/multer");
const { parseData } = require("../middlewares/helper");
const { validate, validateMovie } = require("../middlewares/validator");
const router = express.Router();

router.post(
  "/upload-trailer",
  isAuth,
  isAdmin,
  uploadVideo.single("video"),
  uploadTrailer
);

router.post(
  "/create",
  isAuth,
  isAdmin,
  uploadImage.single("poster"),
  parseData,
  validateMovie,
  validate,
  createMovie
);

router.patch(
  "/update-movie-without-poster/:movieId",
  isAuth,
  isAdmin,
  // parseData,
  validateMovie,
  validate,
  updateMovieWithoutPoster
);

router.patch(
  "/update-movie-with-poster/:movieId",
  isAuth,
  isAdmin,
  uploadImage.single("poster"),
  parseData,
  validateMovie,
  validate,
  updateMovieWithPoster
);

router.delete('/:movieId', isAuth, isAdmin, removeMovie);
// 
// 
router.get("/search", isAuth, isAdmin, searchMovies)

// for nomal user
router.get("/latest-uploads", getLatestUploads)
router.get("/single/:movieId", getSingleMovie)



module.exports = router;
