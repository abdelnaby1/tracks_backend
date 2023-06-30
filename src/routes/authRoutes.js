const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const bodyParser = require("body-parser");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = new UserModel({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, "ABDELNABY_SE");
    res.status(201).send({ data: { token } });
  } catch (error) {
    return res.status(422).json({ data: { error: error.message } });
  }
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ data: { error: "Must provide email and password" } });
  }
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    return res
      .status(422)
      .json({ data: { error: "Invalid password or email" } });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "ABDELNABY_SE");
    res.status(200).send({ data: { token } });
  } catch (error) {
    return res
      .status(422)
      .json({ data: { error: "Invalid password or email" } });
  }
});

module.exports = router;
