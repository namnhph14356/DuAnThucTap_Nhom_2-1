const { isValidObjectId } = require("mongoose");
const { sendError } = require("../utils/helper");
const Movie = require("../models/movie")
const Review = require("../models/review")

exports.addReview = async ( req, res ) =>{
    const {movieId} = req.params;
    const {content, rating} = req.body;
    const userId = req.user._id;


    if(!isValidObjectId(movieId)) return sendError(res, "Invalid Movie!")

    const movie = await  Movie.findOne({_id: movieId, status: "public"})
    if(!movie) return sendError(res, "Movie not found!", 404)

    const isAlreadyReviewed =  await Review.findOne({owner: userId, parentMovie: movie._id })
    if(isAlreadyReviewed) return sendError(res, "Invalid request, review is already their!")

    // creat and update review.
    const newReview = new Review({
        owner : userId,
        parentMovie: movie._id,
        content,
        rating
    })


    // updating review for movie
    movie.reviews.push(newReview._id)
    await movie.save()


    // saving new reviews
    await newReview.save()

    res.json({message: "Your review has been added."})
}

exports.updateReview = async ( req, res ) =>{
    const {reviewId} = req.params;
    const {content, rating} = req.body;
    const userId = req.user._id;


    if(!isValidObjectId(reviewId)) return sendError(res, "Invalid Review ID!")

    const review = await Review.findOne({owner: userId, _id: reviewId})
    if(!review) return sendError(res, "Review not found!", 404)

    review.content = content;
    review.rating = rating

    await review.save()


    res.json({message: "Your review has been updated."})
}