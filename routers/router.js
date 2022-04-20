"use strict";

const express = require("express");
const Controller = require("../controllers/controller");

const router = express.Router();

router.get("/Chart", Controller.getChart);
router.get("/TopArtist", Controller.getTopArtist);
router.get("/Song/:name", Controller.searchSong);
router.get("/Song/:name/:title", Controller.getLyrics);

module.exports = router;
