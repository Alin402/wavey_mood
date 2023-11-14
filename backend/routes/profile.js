const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth');
const { body } = require("express-validator");
const ArtistProfile = require("../models/artistProfile");
const {
    createArtistProfile,
    getArtistProfile,
    createNormalUserProfile,
    getNormalUserProfile
} = require("../controllers/profile");

router.post('/artist', [
    protect,
    body("username").notEmpty().withMessage("You must choose a username"),
  ], createArtistProfile)

router.get('/artist', protect, getArtistProfile);

router.post('/normalUser', [
  protect,
  body("username").notEmpty().withMessage("You must choose a username"),
], createNormalUserProfile)

router.get('/normalUser', protect, getNormalUserProfile);

module.exports = router;