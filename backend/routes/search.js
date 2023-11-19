const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth');
const {
    searchAlbum,
    searchSong
} = require("../controllers/search");

router.get("/album/:field", protect, searchAlbum);
router.get("/song/:field", protect, searchSong);

module.exports = router;