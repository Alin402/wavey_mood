const asyncHandler = require("express-async-handler");
const ArtistProfile = require("../models/artistProfile");
const UserProfile = require("../models/userProfile");
const Album = require("../models/album");

const searchAlbum = asyncHandler(async (req, res) => {
    try {
        const field = req.params.field;

        if (!field) {
            return res.status(400).json({ errors: [ { msg: "No search field found" } ] });
        }

        const albums = await Album.find();

        let filteredAlbums = albums.filter((album) => {
            return album.name.toLowerCase().includes(field.toLowerCase());
        })

        return res.status(200).json({ albums: filteredAlbums })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

const searchSong = asyncHandler(async (req, res) => {
    try {
        const field = req.params.field;

        if (!field) {
            return res.status(400).json({ errors: [ { msg: "No search field found" } ] });
        }

        const albums = await Album.find();

        let songs = [];

        albums.forEach((album) => {
            songs = [...songs, ...album.songs];
        })

        return res.status(200).json({ songs })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

module.exports = {
    searchAlbum,
    searchSong
}