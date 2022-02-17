const { Recipe } = require("../model");

const recipeData = [
	{
		title: "Stephenville Special",
		recipe_text:
			"Garden noodles, german sausage, ranch style beans. Put them bad boys in a bowl and enjoy",
		user_id: 1,
		recipe_url: "https://cdn.filestackcontent.com/ctQNheulTK2iQ5uPE4tc",
	},
	{
		title: "Single Dude Ramen",
		recipe_text:
			"Just boil some cheap ramen and crack an egg into the pot after you put the noodles in.",
		user_id: 2,
	},
	{
		title: "Special Fish Sticks",
		recipe_text:
			"Step 1: Buy jumbo bag of fish sticks. Step 2: Cook them all at once and serve with ketchup.",
		user_id: 3,
	},
	{
		title: "Baked Chikin Diner",
		recipe_text:
			"Toss some frozen chicken breasts in the oven covered in olive oil and L&R seasoning and bake till theyre done. Goes well with Rice-a-roni and broccoli.",
		user_id: 4,
	},
];

const seedRecipes = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipes;
