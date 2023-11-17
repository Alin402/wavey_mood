const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth');
const { body } = require("express-validator");
const {
    createAlbum,
    getAllAlbums
} = require("../controllers/album");

router.post('/', [
    body("name").notEmpty().withMessage("You must choose a name for the album"),
  ], createAlbum)

//router.get('/:albumId', protect, getAlbum);

router.get('/all', protect, getAllAlbums);

module.exports = router;