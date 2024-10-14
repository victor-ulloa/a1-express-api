//  
//  Victor Ulloa
//  200597860
//  recipeModel.js
//  2024-9-27
//

const { MongoClient, ObjectId } = require('mongodb');
const connectToDatabase = require('../config/database');

let client;
async function getRecipesCollection() {
  if (!client) {
    client = await connectToDatabase();
  }
  return client.db('recipes').collection('recipesList'); 
}

// Get all recipes
async function getAllRecipes() {
  const recipesCollection = await getRecipesCollection();
  return await recipesCollection.find({}).toArray();
}

// Get a recipe by ID
async function getRecipeById(id) {
  const recipesCollection = await getRecipesCollection();

  // Since _id is an integer, we query it directly as an integer
  const recipe = await recipesCollection.findOne({ _id: id });
  return recipe;
}

module.exports = {
  getAllRecipes,
  getRecipeById,
};