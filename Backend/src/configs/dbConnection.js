const mongoose = require("mongoose");
const { config } = require("dotenv");

config({ path: "./.env" });

export const connectDB = (url) =>
  mongoose
    .connect(url, { dbName: process.env.DB_NAME })
    .then((e) => console.log(`Connected to DB`))
    .catch((err) => console.error(err.message));
