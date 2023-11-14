const asyncHandler = require("express-async-handler");
const ArtistProfile = require("../models/artistProfile");
const User = require("../models/user");
const Album = require("../models/album");
const { validationResult } = require("express-validator");

const createAlbum = asyncHandler(async (req, res) => {
    const { name, profilePhotoUrl, coverPhotoUrl, songs } = req.body;

    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let profile = await ArtistProfile.findOne({ userId: req.user.id });
        if (!profile) {
            return res.status(404).json({ errors: [{ msg: "Profile not found" }] });
        }

        let album = { name, profileId: profile._id }

        if (coverPhotoUrl) {
            album = { ...album, coverPhotoUrl };
        }

        if (songs) {
            songs.forEach((song) => {
                if (!song.name || ! song.fileUrl) {
                    return res.status(400).json({ errors: [{ msg: "All songs must have a name and a valid path" }] })
                }
            })
            album = { ...album, songs }
        }

        let newAlbum = new Album(album);

        await newAlbum.save();

        return res.status(200).json({ album: newAlbum })

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

const getAlbum = asyncHandler(async (req, res) => {
    try {
        const abum = await Album.findOne({ _id: req.params.albumId })
        if (!album) {
            return res.status(404).json({ errors: [{ msg: "Album not found" }] });
        }
        return res.status(200).json({ album });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

module.exports = {
    createAlbum,
    getAlbum
}