const { body } = require("express-validator");

const validationResponse = require("./validationResponse");
const User = require("./../models/user");

exports.signupValidation = () => {
  return [
    body("name")
      .isString()
      .isLength({ min: 1 })
      .withMessage("Please enter a valid name"),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail()
      .custom((val, { req }) => {
        return User.findOne({ email: val }).then((user) => {
          if (user) {
            return Promise.reject("Email already in use");
          }
        });
      }),
    body("password")
      .isString()
      .withMessage("Please enter a valid password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    validationResponse,
  ];
};
