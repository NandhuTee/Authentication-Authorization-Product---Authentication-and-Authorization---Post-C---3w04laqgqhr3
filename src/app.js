const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Secure password hashing

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

// Consider using environment variables for secret keys in production
require('dotenv').config();
const secretKey = process.env.JWT_SECRET_KEY || 'your-strong-secret-key';

app.use(bodyParser.json());

// Mock user data (Replace with actual user authentication logic)
const users = [
  { id: 1, username: 'user1', password: bcrypt.hashSync('password1', 10) }, // Use bcrypt for hashing
  { id: 2, username: 'user2', password: bcrypt.hashSync('password2', 10) },
];

// Function to retrieve user by username (replace with actual database access)
function findUserByUsername(username) {
  return users.find(user => user.username === username);
}

// JWT middleware to verify tokens
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Missing JWT token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Attach decoded user data to request object
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid JWT token' });
  }
}

// Authentication endpoint (Improved)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing username or password' });
  }

  const user = findUserByUsername(username);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const passwordMatches = bcrypt.compareSync(password, user.password); // Use bcrypt for comparison

  if (!passwordMatches) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '30m' }); // Set appropriate expiration time

  res.status(200).json({ token });
});

// Protected Product API (Improved)
app.get('/product', verifyJWT, (req, res) => {
  // Implement actual product retrieval logic here (replace with database access)
  const productData = [
    { id: 1, name: 'Product A', price: 10 },
    { id: 2, name: 'Product B', price: 20 },
  ];

  res.status(200).json({ message: 'Product data', products: productData });
});

// Error handling (Improved)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
