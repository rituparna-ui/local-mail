const { body } = require("express-validator");
const bcrypt = require("bcryptjs");

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

exports.loginValidation = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail()
      .custom((val, { req }) => {
        return User.findOne({ email: val }).then((user) => {
          if (!user) {
            return Promise.reject("Invalid Email or Password");
          }
          req.user = user;
        });
      }),
    body("password")
      .isString()
      .withMessage("Please enter a valid password")
      .custom((val, { req }) => {
        return User.findOne({ email: req.body.email })
          .select("+password")
          .then((user) => {
            if (!user) {
              return Promise.reject("Invalid Email or Password");
            }
            return bcrypt.compare(req.body.password, user.password);
          })
          .then((isPasswordCorrect) => {
            if (!isPasswordCorrect) {
              return Promise.reject("Invalid Email or Password");
            }
          });
      }),
    validationResponse,
  ];
};
