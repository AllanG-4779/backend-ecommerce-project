const { UserModel } = require("../../Models/Users");
const jwt = require("jsonwebtoken");

//Admin sign up
const adminSignUp = (req, res, next) => {
  UserModel.findOne({ email: req.body.email }).exec((err, admin) => {
    if (admin) {
      res.status(403).json({ Message: "Email address taken" });
    } else if (err) {
      res.status(500).json({ Message: "Internal Server Error" });
    } else {
      const {
        firstName,
        lastName,
        email,
        username,
        password,
        profileUrl,
        contact,
      } = req.body;

      const newAdmin = new UserModel({
        firstName,
        lastName,
        email,
        contact,
        username,
        password,
        role: "admin",
        profileUrl,
      });
      newAdmin.save((err, result) => {
        if (err) {
          res.status(500).json({ Message: "Internal Server Error" });
        }
        if (result) {
          res.status(201).json({ Message: "Admin sign up successful" });
        }
      });
    }
  });
};
//sign in involves both email or username hence both are checked if exist
const adminSignIn = (req, res) => {
  const logProcess = (user) => {
    if (user.authenticate(req.body.password) && user.role === "admin") {
      const token = jwt.sign({ _id: user._id, role:user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: "3600s",
      });
      const { _id, firstName, lastName, email, username, role } = user;
      res.status(202).json({
        token,
        authenticatedUser: { _id, firstName, lastName, email, username, role },
      });
    } else if (user.role === "regular") {
      res
        .status(403)
        .json({ Message: "The credentials you provided are not allowed here" });
    } else {
      res.status(404).json({ Message: "That isn't right password" });
    }
  };

  const auth_param = req.body.auth_param;

  if (auth_param) {
    UserModel.findOne({ email: auth_param })
      .then((success) => {
        if (success) {
          logProcess(success);
        } else {
          res.status(404).json({ Message: "No such registered email" });
        }
      })
      .catch((err) =>
        res.status(500).json({ Message: "Internal Server Error" })
      );
  }
};

//This will enable every access to protected route to be authorized before access is granted

module.exports = {
  adminSignUp,
  adminSignIn,
};
