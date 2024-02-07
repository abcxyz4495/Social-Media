const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const User = require("../models/user");
const TryCatch = require("../utils/features");
const ErrorHandler = require("../utils/utilityClasses");

config({ path: "./.env" });

const handleNewUser = TryCatch(async (req, res, next) => {
	const { username, email, password } = req.body;
	if (!username || !email || !password)
		return next(new ErrorHandler(400, "Missing fields"));

	const user = await User.findOne({ email: email });
	if (user) return next(new ErrorHandler(409, "Email already in use"));

	const hashPassword = await bcrypt.hash(password, 10);

	const result = await User.create({
		username,
		email,
		password: hashPassword,
	});

	console.log(result);

	res.status(201).json({ success: `New user ${username} created!` });
});

const handleLogin = TryCatch(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password)
		return next(new ErrorHandler(400, "Missing fields"));

	const user = await User.findOne({ email: email });
	if (!user) return next(new ErrorHandler(401, "Invalid credentials"));

	const match = bcrypt.compare(user.password, password);
	if (!match) return next(new ErrorHandler(400, "Invalid Password"));

	const accessToken = jwt.sign(
		{ email: user.email },
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: "10s" }
	);

	const refreshToken = jwt.sign(
		{ email: user.email },
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: "2m" }
	);

	user.refreshToken = refreshToken;
	const result = await user.save();
	console.log(result);

	res.cookie("jwt", refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: "none",
		maxAge: 2 * 60 * 1000,
	});

	res.json({ accessToken });
});

const handleLogout = TryCatch(async (req, res, next) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.status(204);

	const refreshToken = cookies.jwt;
	const user = await User.find({ refreshToken });
	if (!user) {
		res.clearCookies("jwt", {
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});
	}

	user.refreshToken = "";
	const result = await User.save();
	console.log(result);

	res.clearCookies("jwt", { httpOnly: true, sameSite: "none", secure: true });
	res.sendStatus(204);
});

const handleRefreshToken = TryCatch(async (req, res, next) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);
	const refreshToken = cookies.jwt;

	const user = await User.find({ refreshToken });
	if (!user) return res.sendStatus(403);

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err, decoded) => {
			if (user.email != decoded.email || err) return res.sendStatus(403);
			jwt.verify(
				{ email: user.email },
				process.env.REFRESH_TOKEN_SECRET,
				{ expiresIn: "10s" }
			);
			res.json({ accessToken });
		}
	);
});

module.exports = {
	handleNewUser,
	handleLogin,
	handleLogout,
	handleRefreshToken,
};
