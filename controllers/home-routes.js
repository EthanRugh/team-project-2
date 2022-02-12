const router = require('express').Router();
const sequelize = require('../config/connection');
const { Recipe, User, Comment } = require('../model');

router.get('/', (req, res) => {
  Recipe.findAll({
    attributes: [
      'id',
      'title',
      'recipe_text',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbRecipeData => {
      const recipes = dbRecipeData.map(recipe => recipe.get({ plain: true }))
      // pass a single recipe object into the homepage template
      res.render('homepage', { recipes });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;