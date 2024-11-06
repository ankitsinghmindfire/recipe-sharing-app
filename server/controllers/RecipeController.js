const RecipeModel = require("../models/Recipes");

const createRecipe = async (req, res) => {
  const { title, ingredients, steps, cookingTime, userOwner } = req.body;

  if (!title || !ingredients || !steps || !cookingTime) {
    return res.json({ error: "Missing recipe details" });
  }

  const recipe = new RecipeModel({
    title,
    ingredients,
    steps,
    image: {
      data: req.file.buffer, // Store the file buffer (binary data)
      contentType: req.file.mimetype, // Store the MIME type of the file
    },
    cookingTime,
    userOwner,
  });
  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await RecipeModel.find();
    res.status(200).json(allRecipes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const id = req.query.recipeId.trim();
    const recipe = await RecipeModel.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Invalid recipeId" });
  }
};

module.exports = { createRecipe, getAllRecipes, getRecipeById };
