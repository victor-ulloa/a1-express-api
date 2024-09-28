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

async function getAllRecipes() {
  const recipesCollection = await getRecipesCollection();
  return await recipesCollection.find({}).toArray();
}

module.exports = {
  getAllRecipes,
};
