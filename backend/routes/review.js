const { addReview, updateReview, removeReview } = require("../controllers/review");
const { isAuth } = require("../middlewares/auth");
const { validateRatings, validate } = require("../middlewares/validator");

const router = require("express").Router()

router.post("/add/:movieId", isAuth, validateRatings, validate, addReview)
router.patch("/:reviewId", isAuth, validateRatings, validate, updateReview)
router.delete("/:reviewId", isAuth, removeReview)



module.exports = router;