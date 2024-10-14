//  
//  Victor Ulloa
//  200597860
//  recipeRoutes.js
//  2024-9-27
//

const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Route to get all recipes
router.get('/', recipeController.getAllRecipes);

// Route to get a recipe by ID
router.get('/:id', recipeController.getRecipeById);

module.exports = router;
