const crypto = require('crypto');
const cloudinary =require("../cloud");
const actor = require('../models/actor');
exports.sendError = (res, error, statusCode = 401) => {
    res.status(statusCode).json({ error });
  };

exports.generateRandomByte = () => {
  return new  Promise((resolve, reject) => {
      crypto.randomBytes(30, (err, buff) => {
          if(err) return console.log(err);
          const buffString = buff.toString('hex')

          console.log(buffString);
          resolve(buffString)
      });
  })
}

exports.handleNotFound = (req, res) => {
  this.sendError(res, "Not found", 404);
}
  
exports.uploadImageToCloud = async (file) => {
  const { secure_url: url, public_id } =  await cloudinary.uploader.upload(file, {gravity: "face", height: 500, width: 500, crop: "thumb"});
    return {url, public_id}
}

exports.formatActor = actor =>{
  const {name, gender, about, _id, avatar} = actor
  return {id:_id, name, about, gender, avatar: avatar?.url,}
}

exports.averageRatingPipeline = (movieId) => {
  return [
    {
      $lookup:{
        from: "Review",
        localField: "rating",
        foreignField: "_id",
        as: "avgRat"
      }
    },
    {
      $match: {parentMovie: movieId}
    },
    {
      $group: {
        _id: null,
        ratingAvg:{
          $avg: "$rating"
        },
        reviewCount: {
          $sum: 1
        }  
      }
    }
  ]
}