const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errorMiddleware");
const connectDB = require("../src/configs/dbConnection");
const credentials = require("./middlewares/credentials");
const corsOptions = require("./configs/corsOptions");

const PORT = process.env.PORT || 4000;
const url = process.env.MONGODB_URL || "";
const app = express();

connectDB(url);

app.use(credentials);
app.use(morgan("dev"));
app.use(cors(corsOptions));
// app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/user", require("../src/routes/user.routes"));

app.use(errorMiddleware);

app.listen(PORT, console.log(`Server started at port ${PORT}`));
