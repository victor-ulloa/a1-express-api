const recipeModel = require('../models/recipeModel');

async function getAllRecipes(req, res) {
  try {
    const recipes = await recipeModel.getAllRecipes();
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Failed to fetch recipes' });
  }
}

module.exports = {
  getAllRecipes,
};
