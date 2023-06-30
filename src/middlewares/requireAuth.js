const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .send({ error: "The User has not access to this resource" });
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, "ABDELNABY_SE", async (err, payload) => {
    if (err) {
      return res
        .status(401)
        .send({ error: "The User has not access to this resource" });
    }
    const { userId } = payload;
    try {
      const user = await UserModel.findById(userId);
      req.user = user;
      next();
    } catch (error) {
      return res
        .status(401)
        .send({ error: "The User has not access to this resource" });
    }
  });
};
