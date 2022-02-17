const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Recipe extends Model {
	static upvote(body, model) {
		return model.Vote.create({
			user_id: body.user_id,
			recipe_id: body.recipe_id,
		}).then(() => {
			return Recipe.findOne({
				where: {
					id: body.recipe_id,
				},
				include: [
					{
						model: model.Comment,
						include: {
							model: model.User,
						},
					},
				],
			});
		});
	}
}

Recipe.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		recipe_text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: "user",
				key: "id",
			},
		},
		recipe_url: {
			type: DataTypes.STRING,
			allowNull: true,
		}
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		modelName: "recipe",
	}
);

module.exports = Recipe;
