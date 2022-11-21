const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  category: String,
  title: String,
  description: String,
  img: String,
  date: String,
});

module.exports = mongoose.model("Place", placeSchema);
