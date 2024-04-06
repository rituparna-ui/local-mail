const jwt = require("jsonwebtoken");

exports.generateToken = ({ user }) => {
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
    },
    "supersecretKey",
    { expiresIn: "2h" }
  );
  return token;
};
