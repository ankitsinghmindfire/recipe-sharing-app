const express = require("express");
const router = express.Router();
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
} = require("../controllers/RecipeController");

router.post("/recipe", createRecipe);
router.get("/recipe", getAllRecipes);
router.get("/recipe/details", getRecipeById);

module.exports = router;
