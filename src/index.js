const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middlewares/requireAuth");
const trackRoutes = require("./routes/trackRoutes");

const mongoUri = `mongodb+srv://abdelnaby:akfNTuFfxXNM1EL0@cluster0.idf4k.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.log("Falied to connected to mongo instance", err);
});

const app = express();
app.use(bodyParser.json());

app.use(authRoutes);
app.use(trackRoutes);
app.get("/", requireAuth, (req, res) => {
  res.send({ data: `Your email is: ${req.user.email}` });
});

app.listen(3000, () => {
  console.log(`Listening on 3000`);
});
