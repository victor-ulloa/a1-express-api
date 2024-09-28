//  
//  Victor Ulloa
//  200597860
//  database.js
//  2024-9-27
//

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
console.log('MongoDB URI:', uri);
let client;

async function connectToDatabase() {
  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    return client
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

module.exports = connectToDatabase;
