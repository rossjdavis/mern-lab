const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/mern-lab", { useMongoClient: true })

module.exports = mongoose
