const express = require("express");
const { handleAllUser } = require("../controllers/user");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.get("/", verifyJWT, handleAllUser);

module.exports = router;
