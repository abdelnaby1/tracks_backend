const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const TrackModel = require("../models/TrackModel");

const router = express.Router();

router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  const tracks = await TrackModel.find({ userId: req.user._id });
  res.status(200).json({ data: { tracks: tracks } });
});
router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;
  if (!name || !locations) {
    return res
      .status(422)
      .json({ error: { data: "You must provide a name and locations" } });
  }

  try {
    const track = new TrackModel({
      name: name,
      locations: locations,
      userId: req.user._id,
    });
    await track.save();
    res.status(201).json({ data: { track: track } });
  } catch (err) {
    res.status(422).json({ data: { error: err.message } });
  }
});
module.exports = router;
