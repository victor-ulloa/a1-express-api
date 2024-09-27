const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config(); // Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to the database and ping it
async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Database connection error:', error);
  }
}


connectToDatabase();

// Route to fetch all recipes
app.get('/recipes', async (req, res) => {
  try {
    const database = client.db('recipes');
    const recipesCollection = database.collection('recipesList');
    const recipes = await recipesCollection.find({}).toArray();
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Failed to fetch recipes' });
  }
});

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
