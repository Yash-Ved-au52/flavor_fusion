const path = require('path');
const User = require('../models/user');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

exports.getdashboardPage = async (req, res) => {

  const userId = req.body.userId;
  console.log(userId);

  if (!userId) {
    // User is not logged in, redirect to login page or handle unauthorized access
    return res.send('Login to get data');
  }

  try {
    // Fetch user data based on the userId
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found');
      return res.send('Login first');
    }

    // Send user ID and name in the response
    res.json({ userId: user._id, name: user.name, collection : user.myCollection });

  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
