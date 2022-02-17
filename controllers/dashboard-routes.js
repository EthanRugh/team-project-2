const router = require("express").Router();
const sequelize = require("../config/connection");
const { Recipe, User, Comment } = require("../model");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
	Recipe.findAll({
		where: {
			// use the ID from the session
			user_id: req.session.user_id,
		},
		attributes: ["id", "recipe_text", "title", "recipe_url"],
		include: [
			{
				model: Comment,
				attributes: ["id", "comment_text", "recipe_id", "user_id"],
				include: {
					model: User,
					attributes: ["username"],
				},
			},
			{
				model: User,
				attributes: ["username"],
			},
		],
	})
		.then((dbDashboardData) => {
			// serialize data before passing to template
			const recipes = dbDashboardData.map((recipe) =>
				recipe.get({ plain: true })
			);
			res.render("dashboard", { recipes, loggedIn: true });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get("/edit/:id", withAuth, (req, res) => {
	Recipe.findByPk(req.params.id, {
		attributes: ["id", "recipe_text", "title", "recipe_url"],
		include: [
			{
				model: Comment,
				attributes: ["id", "comment_text", "recipe_id", "user_id"],
				include: {
					model: User,
					attributes: ["username"],
				},
			},
			{
				model: User,
				attributes: ["username"],
			},
		],
	})
		.then((dbRecipeData) => {
			if (dbRecipeData) {
				const recipe = dbRecipeData.get({ plain: true });

				res.render("edit-recipe", {
					recipe,
					loggedIn: true,
				});
			} else {
				res.status(404).end();
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = router;
