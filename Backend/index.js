const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const authentication = require('./controllers/auth.js');
const recipes = require('./controllers/recipes.js');
const managedashboard = require('./controllers/managedashboard.js')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));


// app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas', err);
  });
const db = mongoose.connection;


// Route: Sign Up
// app.get('/signUp', authentication.getSignUpPage);
app.post('/signUp', authentication.signUp);

// Route: Login
// app.get('/login', authentication.getLoginPage);
app.post('/login', authentication.login);

//Route: logout
app.get('/logout',authentication.logout);


// Route: Recipe
app.get('/displayRecipe', recipes.displayRecipes);
app.post('/addRecipe', recipes.addRecipe);



// Route: dashboard
app.get('/api/dashboard/', managedashboard.getdashboardPage);


// Route : add recipe in user's collection 
app.post('/api/collection', recipes.addToCollection);


// // Start the server
app.listen(8001, () => {
  console.log('Server started successfully');
});
