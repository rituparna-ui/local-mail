const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await User.create({
    name,
    email,
    password: hash,
  });
  res.status(201).json({
    message: "User created successfully",
  });
};
