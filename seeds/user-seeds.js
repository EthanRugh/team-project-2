const sequelize = require("../config/connection");
const { User, Post } = require("../model");

const userdata = [
	{
		username: "jordan",
		email: "test@email.com",
		password: "password123",
	},
	{
		username: "chris",
		email: "chris@email.com",
		password: "password123",
	},
	{
		username: "ethan",
		email: "ethan@email.com",
		password: "password123",
	},
	{
		username: "john",
		email: "john@email.com",
		password: "password123",
	},
	{
		username: "steve",
		email: "steve@email.com",
		password: "password123",
	},
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;
