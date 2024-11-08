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
  filterRecipeUsingRating,
  filterRecipeUsinCookingTime,
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
router.get("/recipe/filter/rating/:rating", filterRecipeUsingRating);
router.get(
  "/recipe/filter/cookingTime/:cookingTime",
  filterRecipeUsinCookingTime
);

module.exports = router;
