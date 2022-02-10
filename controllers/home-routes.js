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
      .then(dbPostData => {
        // pass a single post object into the homepage template
        res.render('homepage', { Recipe });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;