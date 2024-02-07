const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const { User } = require("../models/user");
const { TryCatch } = require("../utils/features");
const ErrorHandler = require("../utils/utilityClasses");

config({ path: "./.env" });

export const handleLogin = TryCatch(async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
        return next(new ErrorHandler(400, "Missing fields"));

    const user = User.findOne({ email: email });
    if (!user) return next(new ErrorHandler(401, "Invalid credentials"));

    const match = bcrypt.compare(user.password, password);
    if (!match) return next(new ErrorHandler(400, "Invalid Password"));

    jwt.sign(
        { username: user.username, email: user.email },
        process.env.ACCESS_TOKEN,
        { expiresIn: "10s" },
        (err, encode) => {
            if (err) return next(new ErrorHandler(500, err));
            else {
                
            }
        }
    );
});
