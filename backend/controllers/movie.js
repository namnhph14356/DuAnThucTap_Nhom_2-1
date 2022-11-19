const { sendError } = require("../utils/helper");
const cloudinary = require("../cloud");
const Movie = require("../models/movie");
const { isValidObjectId } = require("mongoose");

exports.uploadTrailer = async (req, res) => {
  const { file } = req;
  if (!file) return sendError(res, "Video file is missing!");
  const { secure_url: url, public_id } = await cloudinary.uploader.upload(
    file.path,
    { resource_type: "video" }
  );
  res.status(201).json({ url, public_id });
};

exports.createMovie = async (req, res) => {
  const { file, body } = req;

  const {
    title,
    storyLine,
    director,
    releseDate,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    trailer,
    language,
  } = body;

  const newMovie = new Movie({
    title,
    storyLine,
    releseDate,
    status,
    type,
    genres,
    tags,
    cast,
    trailer,
    language,
  });

  if (director) {
    if (!isValidObjectId(director))
      return sendError(res, "Invalid director id!");
    newMovie.director = director;
  }

  if (writers) {
    for (let writerId of writers) {
      if (!isValidObjectId(writerId))
        return sendError(res, "Invalid writer id!");
    }
    newMovie.writers = writers;
  }
  // uploading poster
  if(file){
    const {
      secure_url: url,
      public_id,
      responsive_breakpoints,
    } = await cloudinary.uploader.upload(file.path, {
      transformation: {
        width: 1280,
        height: 720,
      },
      responsive_breakpoints: {
        create_derived: true,
        max_width: 640,
        max_image: 3,
      },
    });
  
    const finalPoster = { url, public_id, responsive: [] };
  
    const { breakpoints } = responsive_breakpoints[0];
    if (breakpoints.length) {
      for (let ingObj of breakpoints) {
        const { secure_url } = ingObj;
        finalPoster.responsive.push(secure_url);
      }
    }
  
    newMovie.poster = finalPoster;
  
    await newMovie.save();
  
    res.status(201).json({
      id: newMovie._id,
      title,
    });
  }
};

exports.updateMovieWithoutPoster = async (req, res) => {
  const { movieId } = req.params;

  if (!isValidObjectId(movieId)) return sendError(res, "Invalid Movie ID!");

  const movie = await Movie.findById(movieId);
  if (!movie) return sendError(res, "Movie Not Found!", 404);

  const {
    title,
    storyLine,
    director,
    releseDate,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    trailer,
    language,
  } = req.body;

  movie.title = title;
  movie.storyLine = storyLine;
  movie.tags = tags;
  movie.releseDate = releseDate;
  movie.status = status;
  movie.type = type;
  movie.genres = genres;
  movie.cast = cast;
  movie.trailer = trailer;
  movie.language = language;

  if (director) {
    if (!isValidObjectId(director))
      return sendError(res, "Invalid director id!");
    movie.director = director;
  }

  if (writers) {
    for (let writerId of writers) {
      if (!isValidObjectId(writerId))
        return sendError(res, "Invalid writer id!");
    }
    movie.writers = writers;
  }

  await movie.save();

  res.json({ message: "Movie is updated", movie });
};

exports.updateMovieWithPoster = async (req, res) => {
  const { movieId } = req.params;

  if (!isValidObjectId(movieId)) return sendError(res, "Invalid Movie ID!");

  if (!req.file) return sendError(res, "Movie poster is missing!");

  const movie = await Movie.findById(movieId);
  if (!movie) return sendError(res, "Movie Not Found!", 404);

  const {
    title,
    storyLine,
    director,
    releseDate,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    trailer,
    language,
  } = req.body;

  movie.title = title;
  movie.storyLine = storyLine;
  movie.tags = tags;
  movie.releseDate = releseDate;
  movie.status = status;
  movie.type = type;
  movie.genres = genres;
  movie.cast = cast;
  movie.trailer = trailer;
  movie.language = language;

  if (director) {
    if (!isValidObjectId(director))
      return sendError(res, "Invalid director id!");
    movie.director = director;
  }

  if (writers) {
    for (let writerId of writers) {
      if (!isValidObjectId(writerId))
        return sendError(res, "Invalid writer id!");
    }
    movie.writers = writers;
  }

  // update poster.
  //removing poster from cloud if there is any.
  const posterID = movie.poster?.public_id;
  if (posterID) {
    const { result } = await cloudinary.uploader.destroy(posterID);
    if (result !== "ok") {
      return sendError(res, "Could not update poster at the moment!");
    }
  }

  // uploading poster
  const {
    secure_url: url,
    public_id,
    responsive_breakpoints,
  } = await cloudinary.uploader.upload(req.file.path, {
    transformation: {
      width: 1280,
      height: 720,
    },
    responsive_breakpoints: {
      create_derived: true,
      max_width: 640,
      max_image: 3,
    },
  });

  const finalPoster = { url, public_id, responsive: [] };

  const { breakpoints } = responsive_breakpoints[0];
  if (breakpoints.length) {
    for (let ingObj of breakpoints) {
      const { secure_url } = ingObj;
      finalPoster.responsive.push(secure_url);
    }
  }

  movie.poster = finalPoster;

  await movie.save();

  res.json({ message: "Movie is updated", movie });
};

exports.removeMovie = async (req, res) => {
  const { movieId } = req.params;

  if (!isValidObjectId(movieId)) return sendError(res, "Invalid Movie ID!");



  const movie = await Movie.findById(movieId);
  if (!movie) return sendError(res, "Movie Not Found!", 404);

  // check if there is poster or not.
  // if yes then we need to remove that.

  const posterId = movie.poster?.public_id;
  if (posterId) {
    const { result } = await cloudinary.uploader.destroy(posterId);
    if  (result !== 'ok') return sendError(res, "Could not remove poster from cloud!");
  }

  // removing trailer
  const trailerId = movie.trailer?.public_id;
  if (!trailerId) return sendError(res, "Could not find trailer in the cloud!");

  const { result } = await cloudinary.uploader.destroy(trailerId, {resource_type: 'video'});
  if  (result !== 'ok') return sendError(res, "Could not remove trailer from cloud!");

  await Movie.findByIdAndDelete(movieId);

  res.json({ message: 'Movie removed successfully.'});
}

// 
// 
// 
// 
// 
// 
// 

exports.searchMovies = async (req, res) =>{
  const {title} = req.query
  const movies = await Movie.find({title: {$regex: title, $options: "i" }})
  res.json({results: movies.map(m =>{
    return {
      id: m._id,
      title: m.title,
      poster: m.poster?.url,
      genres: m.genres,
      status: m.status
    }
  })})
}

exports.getLatestUploads = async (req, res) =>{
  const {limit = 5} = req.query

  const results = await Movie.find({status: "public"}).sort("-createdAt").limit(parseInt(limit));
  const movies = results.map((m) => {
    return {
      id: m._id,
      title: m.title,
      storyLine: m.storyLine,
      poster: m.poster?.url,
      trailer: m.trailer?.url
    }
  })
  res.json({movies})
}

exports.getSingleMovie = async (req, res) =>{
  const {movieId} = req.params;


  if(!isValidObjectId(movieId)) return sendError(res, "Movie id is not valid!")


  const  movie = await Movie.findById(movieId).populate("director writers cast.actor")


  const {_id: id, 
    title, 
    storyLine, 
    cast, writers, 
    director, 
    releseDate, 
    genres, 
    tags, 
    language, 
    poster, 
    trailer, 
    type } = movie


  res.json({
     movie: {
    id, 
    title, 
    storyLine,
    releseDate, 
    genres, 
    tags, 
    language,
    poster: poster?.url, 
    trailer: trailer?. url, 
    type,  
    cast: cast.map(c => ({
      id: c._id,
      profile: { id:c.actor._id ,
                  name: c.actor.name, 
                  avatar: c.actor?.avatar?.url},
      leadActor: c.leadActor,
      roleAs: c.roleAs            
    })), 
    writers: writers.map(w =>({
      id: w._id,
      name: w.name
    })), 
    director: {
      id: director._id,
      name: director.name
    }, 
   }
 })
}