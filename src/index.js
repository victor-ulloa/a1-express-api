//  
//  Victor Ulloa
//  200597860
//  index.js
//  2024-9-27
//

const express = require('express');
const recipeRoutes = require('./routes/recipeRoutes');
const connectToDatabase = require('./config/database'); // Optional if you handle DB connection in a separate file
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to the database
connectToDatabase();

// Use routes
app.use('/recipes', recipeRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
