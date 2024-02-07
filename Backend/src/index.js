const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const globalMiddleware = require("./middlewares/GlobalErrorHandler");
const connectDB = require("../src/configs/dbConnection");

const PORT = process.env.PORT || 4000;
const url = process.env.MONGODB_URL || "";
const app = express();

connectDB(url);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", require("../src/routes/user.routes"));

app.use(globalMiddleware);

app.listen(PORT, console.log(`Server started at port ${PORT}`));
