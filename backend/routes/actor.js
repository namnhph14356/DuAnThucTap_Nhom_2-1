const express =  require('express');
const { createActor, updateActor, removeActor, searchActor, getLatestActors, getSingletActor } = require('../controllers/actor');
const { validate, actorInfoValidator} = require("../middlewares/validator")
const { uploadImage } = require('../middlewares/multer');

const router = express.Router();
    router.post("/create", uploadImage.single("avatar"),actorInfoValidator, validate ,createActor);

    router.post("/update/:actorId", uploadImage.single("avatar"),actorInfoValidator, validate ,updateActor)

    router.delete("/:actorId", removeActor)

    router.get("/search", searchActor)
    
    router.get("/latest-uploads", getLatestActors)

    router.get("/single/:id", getSingletActor)
module.exports = router;