const mongoose = require("./schema.js")
const FavoriteThing = mongoose.model("FavoriteThing")
const seedData = require("./seeds.json")

FavoriteThing.remove({})
  .then(() => {
    FavoriteThing.collection.insert(seedData).then(favoriteThings => {
      console.log(favoriteThings)
      process.exit()
    })
  })
  .catch(err => {
    console.log(err)
  })
