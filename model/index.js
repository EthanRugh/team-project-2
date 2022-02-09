const User = require('./User');
const Comment = require('./Comment');
const Recipe = require('./Recipe');
const Vote = require('./Vote');

Recipe.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

User.belongsToMany(Recipe, {
    through: Vote,
    as: 'voted_recipes',
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Recipe.belongsToMany(User, {
    through: Vote,
    as: 'voted_recipes',
    foreignKey: 'recipe_id',
    onDelete: 'SET NULL'
});

Vote.belongsTo(Recipe, {
    foreignKey: 'recipe_id',
    onDelete: 'SET NULL'
});

User.hasMany(Recipe, {
    foreignKey: 'user_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Recipe.hasMany(Vote, {
    foreignKey: 'recipe_id'
});

Recipe.hasMany(Comment, {
    foreignKey: 'recipe_id'
});

Comment.belongsTo(Recipe, {
    foreignKey: 'recipe_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});


module.exports = { User, Recipe, Vote, Comment };