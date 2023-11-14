const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth');
const { body } = require("express-validator");
const {
    createAlbum,
    getAlbum
} = require("../controllers/album");

router.post('/album', [
    protect,
    body("name").notEmpty().withMessage("You must choose a name for the album"),
  ], createAlbum)

router.get('/album/:albumId', protect, getAlbum);

module.exports = router;