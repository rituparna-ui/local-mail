const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateToken } = require("./../utils/jwt");

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  await User.create({
    name,
    email,
    password: hash,
  });
  return res.status(201).json({
    message: "User created successfully",
  });
};

exports.login = async (req, res, next) => {
  const { user } = req;
  const token = generateToken({ user });
  return res.status(200).json({
    message: "Login successful",
    data: {
      token,
      user: user._id,
    },
  });
};
