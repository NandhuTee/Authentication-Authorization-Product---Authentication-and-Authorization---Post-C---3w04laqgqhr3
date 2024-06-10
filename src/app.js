const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'newtonSchool';

app.use(bodyParser.json());

// Mock user data (Replace with actual user authentication logic)
const users = [
  // Define user objects here
];

// Mock product data (Replace with actual product retrieval logic)
const products = [
  // Define product objects here
];

// Authentication endpoint (Students should implement this)
app.post('/login', (req, res) => {
  // Implement user authentication logic here
  // If authentication is successful, generate a JWT token and send it in the response
  // Example token generation:
  // const token = jwt.sign({ userId: user.id, username: user.username }, secretKey);
  // res.status(201).json({ token });
});

// Product route (Students should implement this)
app.get('/product', (req, res) => {
  // Middleware to check for a valid JWT token
  // Implement JWT token verification logic here
  // If the token is valid, students can access product data and send it in the response
  // Example response:
  // res.status(200).json({ message: 'Product data', products: productData });
});

module.exports = app;
