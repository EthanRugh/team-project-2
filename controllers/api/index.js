const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const commentRoutes = require("./comment-routes");
const recipeRoutes = require("./recipe-routes");

router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use("/recipes", recipeRoutes);

module.exports = router;
