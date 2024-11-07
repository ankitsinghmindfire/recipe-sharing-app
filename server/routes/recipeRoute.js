const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  searchRecipe,
  addRating,
  addComment,
} = require("../controllers/RecipeController");
const verifyToken = require("../middleware/middleware");

// Setup Multer for handling file uploads
const storage = multer.memoryStorage(); // Store file in memory (as buffer)
const upload = multer({ storage: storage });

router.post("/recipe", upload.single("image"), createRecipe); // 'image' is the name of the form field
router.get("/recipe", getAllRecipes);
router.get("/recipe/details", getRecipeById);
router.get("/searchRecipes/:key", searchRecipe);
router.post("/recipe/rate", verifyToken, addRating);
router.post("/recipe/comment", verifyToken, addComment);

module.exports = router;
