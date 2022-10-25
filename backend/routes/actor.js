const express =  require('express');
const { createActor, updateActor, removeActor } = require('../controllers/actor');
const { validate, actorInfoValidator} = require("../middlewares/validator")
const { uploadImage } = require('../middlewares/multer');

const router = express.Router();
    router.post("/create", uploadImage.single("avatar"),actorInfoValidator, validate ,createActor);

    router.post("/update/:actorId", uploadImage.single("avatar"),actorInfoValidator, validate ,updateActor)

    router.delete("/:actorId", removeActor)

module.exports = router;