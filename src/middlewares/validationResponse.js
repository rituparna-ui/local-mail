const { validationResult } = require("express-validator");
const errorBuilder = require("../utils/errors/errorBuilder");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      errorBuilder({
        message: "Validation Error",
        status: 422,
        errors: errors
          .array()
          .filter((x) => {
            return x.msg != "Invalid value";
          })
          .map((x) => {
            return x.msg;
          }),
      })
    );
  }
  next();
};
