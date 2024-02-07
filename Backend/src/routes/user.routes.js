const express = require("express");
const {
	handleLogin,
	handleNewUser,
	handleLogout,
	handleRefreshToken,
} = require("../controllers/user");

const router = express.Router();

router.post("/register", handleNewUser);
router.get("/login", handleLogin);
router.get("/logout", handleLogout);
router.get("/refresh", handleRefreshToken);

module.exports = router;
