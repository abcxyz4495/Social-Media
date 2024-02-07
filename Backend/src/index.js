const express = require("express");
const cors = require(cors);
const morgan = require("morgan");
const { globalErrorHandler } = require("./middlewares/GlobalErrorHandler");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(globalErrorHandler());

app.listen(PORT, console.log(`Server started at port ${PORT}`));
