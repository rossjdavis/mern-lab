const express = require("express")
const parser = require("body-parser")
const cors = require("cors")
const mongoose = require("./db/schema.js")
const FavoriteThing = mongoose.model("FavoriteThing")

const app = express()

app.set("port", process.envPORT || 3001)
app.use(parser.json())
app.use(cors())

app.get("/api/favorite-things", (req, res) => {
  FavoriteThing.find()
    .then(favoriteThings => {
      res.json(favoriteThings)
    })
    .catch(err => {
      console.log(err)
    })
})

app.post("/api/favorite-things", (req, res) => {
  console.log(req.body)
  FavoriteThing.count({})
    .then(count => {
      console.log(count)
      FavoriteThing.create({
        description: req.body.description,
        url: req.body.url,
        image_url: req.body.image_url,
        rank: count + 1
      }).then(favoriteThing => {
        res.status(200).json(favoriteThing)
      })
    })
    .catch(err => {
      console.log(err)
    })
})

app.put("/api/favorite-things/increase-rank/:id", (req, res) => {
  let currentRank = 0
  FavoriteThing.findById(req.params.id)
    .then(favoriteThing => {
      console.log(`old item: ${favoriteThing.description}`)
      currentRank = favoriteThing.rank
      higherRank = (currentRank - 1)
      console.log(`higher rank: ${higherRank}`)
      FavoriteThing.findOneAndUpdate(
        {rank: higherRank },
        {rank: currentRank},
        {new: true}
      )
    .then((updatedRecord) => {
      console.log(updatedRecord)
      FavoriteThing.findOneAndUpdate(
        { _id: req.params.id },
        { rank: higherRank },
        { new: true }
      )
    .then((updatedRecord) => {
      console.log(updatedRecord)}
    )})})
    .catch((err) => {
      console.log(err)
    })
})

app.put("/api/favorite-things/decrease-rank/:id", (req, res) => {
  let currentRank = 0
  FavoriteThing.findById(req.params.id)
    .then(favoriteThing => {
      console.log(`old item: ${favoriteThing.description}`)
      currentRank = favoriteThing.rank
      lowerRank = (currentRank + 1)
      console.log(`higher rank: ${higherRank}`)
      FavoriteThing.findOneAndUpdate(
        {rank: lowerRank },
        {rank: currentRank},
        {new: true}
      )
    .then((updatedRecord) => {
      console.log(updatedRecord)
      FavoriteThing.findOneAndUpdate(
        { _id: req.params.id },
        { rank: lowerRank },
        { new: true }
      )
    .then((updatedRecord) => {
      console.log(updatedRecord)}
    )})})
    .catch((err) => {
      console.log(err)
    })
})


// app.get("api/favorite-things/:id", (req, res) => {
//   FavoriteThing.findById(req.params.id)
//     .then(favoriteThing => {
//       res.json(favoriteThing)
//     })
//     .catch(err => {
//       console.log(err)
//     })
// })

app.listen(app.get("port"), () => {
  console.log("Lisening on port " + app.get("port"))
})
