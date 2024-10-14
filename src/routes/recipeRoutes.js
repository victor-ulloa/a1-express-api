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

// Route to get recipe by ID
router.get('/:id', recipeController.getRecipeById);

// Route to add a new recipe
router.post('/', recipeController.addNewRecipe);

// Route to update an existing recipe
router.put('/:id', recipeController.updateRecipe);

module.exports = router;