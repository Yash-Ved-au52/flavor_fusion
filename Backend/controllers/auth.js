const cors = require('cors');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { generateToken } = require('../helpers/jwt');

exports.signUp = async (req, res) =>{
  const { name, email, password } = req.body;
  try{
    const existingUser = await User.findOne({ email });
    if(existingUser) 
    {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    const token = generateToken(newUser);
    newUser.token = token;

    await newUser.save();
    res.cookie('userId', newUser._id);
    res.cookie('token', token);
    res.status(200).json({ message: 'Sign up successful' , userId: newUser._id});
  } catch (error){
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};


exports.login = async (req,res) =>{
  const { email, password } =req.body;

  try{
    const user = await User.findOne({ email });
    if(user)
    {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if(passwordMatch)
      {
        const token = generateToken(user);
        user.token = token;
        await user.save();

        res.cookie('userId', newUser._id, { httpOnly: true, secure: true });
res.cookie('token', token, { httpOnly: true, secure: true });

        res.status(200).json({ message: 'Login successful', userId: user._id });
      }
      else
      {
        res.status(400).json({ message: 'Invalid email or password' });
      }
    }
    else
    {
      res.status(400).json({ message: 'Invalid email' });
    }
  } catch (error){
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};


exports.logout = async (req, res) => {
  // Clear the user ID and token cookies on the server-side
  res.clearCookie('userId');
  res.clearCookie('token');

  // Send a JSON response indicating successful logout
  res.json({ message: 'Logout successful' });
};