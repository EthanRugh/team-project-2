const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Recipe, User, Comment, Vote } = require("../../model");
const withAuth = require("../../utils/auth");

// get all users
router.get("/", (req, res) => {
	console.log("======================");
	Recipe.findAll({
		attributes: [
			"id",
			"title",
			"recipe_text",
			"recipe_url",
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
		.then((dbRecipeData) => res.json(dbRecipeData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get("/:id", (req, res) => {
	Recipe.findOne({
		where: {
			id: req.params.id,
		},
		attributes: [
			"id",
			"title",
			"recipe_text",
			"recipe_url",
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
			res.json(dbRecipeData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post("/", (req, res) => {
	// expects {title: 'recipe title', recipe_text: 'insert recipe here', user_id: 1}
	console.log(req.params);
	Recipe.create({
		title: req.body.title,
		recipe_text: req.body.recipe_text,
		user_id: req.session.user_id,
		recipe_url: req.body.recipe_url,
	})
		.then((dbRecipeData) => res.json(dbRecipeData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.put("/upvote", (req, res) => {
	// custom static method created in models/Recipe.js
	Recipe.upvote(
		{ ...req.body, user_id: req.session.user_id },
		{ Vote, Comment, User }
	)
		.then((updatedVoteData) => res.json(updatedVoteData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.put("/:id", (req, res) => {
	Recipe.update(
		{
			title: req.body.title,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	)
		.then((dbRecipeData) => {
			if (!dbRecipeData) {
				res.status(404).json({ message: "No recipe found with this id" });
				return;
			}
			res.json(dbRecipeData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.delete("/:id", (req, res) => {
	console.log("id", req.params.id);
	Recipe.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbRecipeData) => {
			if (!dbRecipeData) {
				res.status(404).json({ message: "No recipe found with this id" });
				return;
			}
			res.json(dbRecipeData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
