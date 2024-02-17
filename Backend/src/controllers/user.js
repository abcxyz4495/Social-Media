const TryCatch = require("../utils/features");
const ErrorHandler = require("../utils/utilityClasses");
const User = require("../models/user");

const handleAllUser = TryCatch(async (req, res, next) => {
	console.log("Users");
	const users = await User.find({});
	console.log(users);
	if (!users) return next(new ErrorHandler(400, "Not Found"));
	return res.status(200).json(users);
});

module.exports = { handleAllUser };
