const express = require("express");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.json({ success: true, message: "Hello World !" });
});

app.listen(PORT, console.log(`Server started at port ${PORT}`));
