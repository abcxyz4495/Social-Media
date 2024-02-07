const mongoose = require("mongoose");
const { config } = require("dotenv");

config({ path: "./.env" });

const connectDB = (url) =>
	mongoose
		.connect(url, { dbName: process.env.DB_NAME })
		.then((res) => console.log(`Connected to DB at ${res.connection.host}`))
		.catch((err) => console.error(err.message));

module.exports = connectDB;
