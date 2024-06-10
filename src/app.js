const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'newtonSchool';

app.use(bodyParser.json());

// Mock user data (Replace with actual user authentication logic)
const users = [
  { id: 1, username: 'user1', password:'password1' },
  { id: 2, username: 'user2', password:'password2' },
];

// Mock product data (Replace with actual product retrieval logic)
const products = [
  { id: 1, name: 'Product A',price:10 },
  { id: 2, name: 'Product B',price:20 },
];

// Authentication endpoint
app.post('/login', (req,res) => {
  const { username, password } = req.body;

  // Find user by username and password
  const user = users.find(u => u.username ===username && u.password === password);

  if (!user) {
    return res.status(401).json({ message:'Authentication failed' });
  }

  // If authentication is successful, generate a JWT token and send it in the response
  const token = jwt.sign({ userId: user.id,username: user.username }, secretKey);
  res.status(201).json({ token });
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) =>{
  const token = req.headers.authorization;

  if (!token) {
    return res.status(201).json({message:'Authorization required' });
  }

  jwt.verify(token,secretKey,(err, decoded) => {
    if (err) {
      return res.status(201).json({ message:'Invalid token' });
    }
    req.user =decoded;
    next();
  });
};

// Product route
app.get('/product', verifyToken, (req, res) => {
  // Access product data only if the token is valid
  res.status(200).json({ message: 'Product data', products });
});

module.exports = app;
