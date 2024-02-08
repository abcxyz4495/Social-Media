const express = require("express");
const {
	handleLogin,
	handleNewUser,
	handleLogout,
	handleRefreshToken,
	handleAllUser,
} = require("../controllers/user");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.get("/", verifyJWT, handleAllUser);

router.post("/register", handleNewUser);
router.post("/login", handleLogin);
router.get("/logout", handleLogout);
router.get("/refresh", handleRefreshToken);

module.exports = router;
