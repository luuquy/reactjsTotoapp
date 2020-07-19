require("dotenv").config();
const Sequelize = require("sequelize");

const MYSQL_PORT = process.env.MYSQL_PORT;
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
	host: MYSQL_HOST,
	dialect: "mysql",
});

sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established successfully");
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});

module.exports = {
	connection: sequelize
}