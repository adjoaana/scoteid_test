const express = require('express');
const app = express();
const port = 3000;

const Joi = require('joi');

// Sample in-memory database
const database = {
  users: [],
};

app.use(express.json());

// Define a user schema using Joi
const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

// Define a route to create a user in the test environment
app.post('/api/test/users', (req, res) => {
  const user = req.body;

  // Validate the user data against the schema
  const { error } = userSchema.validate(user);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  database.users.push(user);
  res.json(user);
});

// Define a route to reset the database for testing
app.delete('/api/test/reset', (req, res) => {
  database.users.length = 0; // Clear the users array
  res.json({ message: 'Test database reset.' });
});

app.listen(port, () => {
  console.log(`Test API is running on http://localhost:${port}`);
});
