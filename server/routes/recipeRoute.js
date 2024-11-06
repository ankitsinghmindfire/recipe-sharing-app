const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
} = require("../controllers/RecipeController");

// Setup Multer for handling file uploads
const storage = multer.memoryStorage(); // Store file in memory (as buffer)
const upload = multer({ storage: storage });

router.post("/recipe", upload.single("image"), createRecipe); // 'image' is the name of the form field
router.get("/recipe", getAllRecipes);
router.get("/recipe/details", getRecipeById);

module.exports = router;
