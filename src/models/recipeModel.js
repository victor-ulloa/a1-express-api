//  
//  Victor Ulloa
//  200597860
//  recipeModel.js
//  2024-9-27
//

const { MongoClient } = require('mongodb');
const connectToDatabase = require('../config/database');

let client;
async function getRecipesCollection() {
  if (!client) {
    client = await connectToDatabase();
  }
  return client.db('recipes').collection('recipesList'); 
}

// Fetch all recipes
async function getAllRecipes() {
  const recipesCollection = await getRecipesCollection();
  return await recipesCollection.find({}).toArray();
}

// Fetch recipe by ID
async function getRecipeById(id) {
  const recipesCollection = await getRecipesCollection();
  return await recipesCollection.findOne({ _id: id });
}

// Add a new recipe
async function addRecipe(recipeData) {
  const recipesCollection = await getRecipesCollection();
  const result = await recipesCollection.insertOne(recipeData);
  return result.ops[0]; // Return the newly added recipe
}

// Update an existing recipe
async function updateRecipe(id, updatedData) {
  const recipesCollection = await getRecipesCollection();
  const result = await recipesCollection.findOneAndUpdate(
    { _id: id },
    { $set: updatedData },
    { returnDocument: 'after' } // Return the updated document
  );
  return result.value; // Return the updated recipe
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
};