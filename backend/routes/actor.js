const express =  require('express');
const { createActor, updateActor, removeActor, searchActor, getLatestActors, getSingletActor } = require('../controllers/actor');
const { validate, actorInfoValidator} = require("../middlewares/validator")
const { uploadImage } = require('../middlewares/multer');
const { isAuth, isAdmin } = require('../middlewares/auth');

const router = express.Router();
    router.post("/create", isAuth, isAdmin, uploadImage.single("avatar"),actorInfoValidator, validate ,createActor);

    router.post("/update/:actorId", isAuth, isAdmin, uploadImage.single("avatar"),actorInfoValidator, validate ,updateActor)

    router.delete("/:actorId", isAuth, isAdmin, removeActor)

    router.get("/search", isAuth, isAdmin, searchActor)
    
    router.get("/latest-uploads", isAuth, isAdmin, getLatestActors)

    router.get("/single/:id", getSingletActor)
module.exports = router;