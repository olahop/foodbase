const mongoose = require('mongoose');

//Schema need to specify in mongodb for validation
const FoodSchema = new mongoose.Schema({
  Name: { type: String, unique: true },
  Rating: { type: Number, match: /[0-5]/, default: 0},
  NumOfRatings: { type: Number, default: 0 },
  Fat: Number,
  Protein: Number,
  Carbohydrates: Number,
  Category: String,
  KiloJoule: Number,
  KiloCalories: Number,
  },
  { collection : 'foods' })

//Export schema as mongoose model
module.exports = mongoose.model('foods', FoodSchema)
