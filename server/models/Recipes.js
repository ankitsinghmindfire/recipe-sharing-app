const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],
  imageUrl: { type: String, required: true },
  cookingTime: {
    type: Number,
    required: true,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});
module.exports = mongoose.model("Recipes", RecipeSchema);
