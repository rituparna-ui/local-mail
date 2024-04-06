const jwt = require("jsonwebtoken");

const errorBuilder = require("../utils/errors/errorBuilder");
const User = require("../models/user");

module.exports = () => {
  return async (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      if (!token) {
        throw new Error("Invalid Authentication Token");
      }
      const payload = jwt.verify(token, "supersecretKey");
      req.user = await User.findById(payload.id);
      next();
    } catch (error) {
      return next(
        errorBuilder({
          message: "Invalid Authentication Token",
          status: 401,
          errors: ["Invalid Authentication Token"],
        })
      );
    }
  };
};
