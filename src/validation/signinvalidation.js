const { check, validationResult } = require("express-validator");
const validLogin = [
  check("auth_param","Enter a valid Email")
    .exists()
    .notEmpty()
    .isEmail()
    .normalizeEmail(),
    
  check("password")
    .exists()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Password too short"),
];
//    firstName,
//             lastName,
//             email,
//             contact,
//             username,
//             password,
//
//             profileUrl,
const validValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    res.status(400).json({ Errors: errors.array() });
  } else {
    next();
  }
};
module.exports = { validLogin, validValidated };
