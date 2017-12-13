const mongoose = require("./connection.js")

const FavoriteThingSchema = new mongoose.Schema({
  description: String,
  url: String,
  image_url: String
})

const FavoriteThing = mongoose.model("FavoriteThing", FavoriteThingSchema)

module.exports = mongoose
