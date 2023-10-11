// const path = require('path');
const Recipe = require('../models/recipeSchema');
const User = require('../models/user');

exports.displayRecipes = async(req, res) => {
    try {
        // const recipes = await Recipe.find();
        const recipes = await Recipe.find({}, 'id title ingredients instructions note prepTime author');
        
        res.json(recipes);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
  };
  
exports.addRecipe =  async (req,res) => {
    try {
        const { title, ingredients, instructions, note, prepTime, author } = req.body;
        const recipe = new Recipe({title, ingredients, instructions, note, prepTime, author,});

        await recipe.save();

        res.status(200).json({message : "recipe added successfuly"});
        // res.status(201).json(recipe);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
  };
  
// add recipe in user's collection
exports.addToCollection = async (req, res) => {
    try {
  //     const { cookies } = req;
  const userId = req.query.userId;
      const recipeId  = req.query.recipeId;

  console.log(userId);
  // console.log(recipeId);
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the recipe by ID
      const recipe = await Recipe.findById(recipeId);
  
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
      // Add the recipe to the user's collection
      user.myCollection.push(recipe);
  
      // Save the updated user
      await user.save();
  
      res.status(200).json({ message: 'Recipe added to user collection' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };