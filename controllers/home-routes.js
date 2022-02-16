const router = require("express").Router();
const sequelize = require("../config/connection");
const { Recipe, User, Comment } = require("../model");

router.get("/", (req, res) => {
	Recipe.findAll({
		attributes: ["id", "title", "recipe_text"],
		include: [
			{
				model: Comment,
				attributes: ["id", "comment_text", "user_id"],
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
			const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));
			// pass a single recipe object into the homepage template
			res.render("homepage", { recipes, loggedIn: req.session.loggedIn });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get("/login", (req, res) => {
	if (req.session.loggedIn) {
		res.redirect("/");
		return;
	}
	res.render("login");
});

router.get("/recipes/:id", (req, res) => {
	Recipe.findOne({
		where: {
			id: req.params.id,
		},
		attributes: [
			"id",
			"title",
			"recipe_text",
			[
				sequelize.literal(
					"(SELECT COUNT(*) FROM vote WHERE recipe.id = vote.recipe_id)"
				),
				"vote_count",
			],
		],
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
			if (!dbRecipeData) {
				res.status(404).json({ message: "No recipe found with this id" });
				return;
			}

			// serialize the data
			const recipe = dbRecipeData.get({ plain: true });

			// pass data to template
			res.render("recipe-page", {
				recipe,
				loggedIn: req.session.loggedIn,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
