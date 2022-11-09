const { addReview } = require("../controllers/review");
const { isAuth } = require("../middlewares/auth");
const { validateRatings, validate } = require("../middlewares/validator");

const router = require("express").Router()

router.post("/add/:movieId", isAuth, validateRatings, validate, addReview)


module.exports = router;