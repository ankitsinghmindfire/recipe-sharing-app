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

const searchRecipe = async (req, res) => {
  try {
    const searchKey = req.params.key.trim();

    const recipes = await RecipeModel.find({
      ingredients: {
        $regex: new RegExp(searchKey, "i"),
      },
    });
    if (recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const addRating = async (req, res) => {
  try {
    const { recipeId, rating, userId, userName } = req.body;

    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Check if the user has already rated the recipe
    const index = recipe.ratingsAndComments.findIndex(
      (entry) => entry.user.toString() === userId.toString()
    );

    if (index !== -1) {
      // If the user has already rated, update the existing rating
      recipe.ratingsAndComments[index].rating = rating;
    } else {
      // Otherwise, add a new rating
      recipe.ratingsAndComments.push({ user: userId, userName, rating });
    }

    await recipe.save();
    res.status(200).json({ message: "Rating added successfully" });
  } catch (error) {
    console.error("Error adding rating:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const addComment = async (req, res) => {
  try {
    const { recipeId, comment, userId, userName } = req.body;

    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Check if the user has already rated the recipe
    const index = recipe?.ratingsAndComments?.findIndex(
      (entry) => entry.user.toString() === userId.toString()
    );

    if (index !== -1) {
      // If the user has already rated, update the existing rating
      recipe.ratingsAndComments[index].comment = comment;
    } else {
      // Otherwise, add a new rating
      recipe.ratingsAndComments.push({ user: userId, comment, userName });
    }

    await recipe.save();
    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  searchRecipe,
  addRating,
  addComment,
};