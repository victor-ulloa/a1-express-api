//  
//  Victor Ulloa
//  200597860
//  recipeController.js
//  2024-9-27
//

const recipeModel = require('../models/recipeModel');

// Controller to get all recipes
async function getAllRecipes(req, res) {
  try {
    const recipes = await recipeModel.getAllRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error: error.message });
  }
}

// Controller to get a recipe by ID
async function getRecipeById(req, res) {
  try {
    const recipeId = parseInt(req.params.id); // Convert the ID from string to integer
    const recipe = await recipeModel.getRecipeById(recipeId);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ message: 'Error fetching recipe' });
  }
}

module.exports = {
  getAllRecipes,
  getRecipeById,
};