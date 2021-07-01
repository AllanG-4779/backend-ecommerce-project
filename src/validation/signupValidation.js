const { check, validationResult } = require("express-validator");
const validater = [
  check("firstName")
    .exists()
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Are you sure that's your real name?"),
  check("firstName")
    .matches("^[^&*#?><?^!:;/@~%).(]+$")
    .withMessage("Are you sure your name has special characters"),
  check("lastName")
    .exists()
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Something's not right with your last name"),
  check("lastName")
    .matches("^[^&*#?><?^!:;/@~%).(]+$")
    .withMessage("Are you sure your name has special characters"),
  check("email")
    .exists()
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("Our servers will not be able to process this email"),
  check("password")
    .exists()
    .notEmpty()
    .isLength({ min: 8, max: 20 })
    .withMessage("Password length too short"),
  check("password")
    .matches("[0-9]")
    .withMessage("password must include atleast a number"),
  check("password")
    .matches("[&*#$>:<?;/^!@~%).(]{2}")
    .withMessage("Password must contain atleast two special characters"),
  check("password")
    .matches("[A-Z]")
    .withMessage("password must contain at lease an uppercase"),
  check("password")
    .matches("[a-z]")
    .withMessage("password must contain at least a lowercase"),
  check("username").exists().notEmpty().withMessage("username is empty"),
  check("username").notEmpty().withMessage("Username is required"),
  check("username")
    .matches("^[^&*#?><?^!:;/@~%).(]+$")
    .withMessage("You can only use - in the username"),
  check("profileUrl")
    .exists()
    .notEmpty()
    .isLength({ min: 20, max: 1000 })
    .withMessage("Please enter a valid url"),
  check("contact")
    .exists()
    .notEmpty()
    .matches("([0-9]{4})[0-9]{8}")
    .withMessage("Number must be in the form 1234-567-89-100"),
];
//    firstName,
//             lastName,
//             email,
//             contact,
//             username,
//             password,
//
//             profileUrl,
const reqValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    res.status(400).json({ Errors: errors.array() });
  } else {
    next();
  }
};
module.exports = { validater, reqValidated };
