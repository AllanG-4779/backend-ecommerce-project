const { UserModel } = require("../../Models/Users");
const jwt = require("jsonwebtoken");

//user sign up
const signUp = (req, res, next) => {
  UserModel.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      res.status(403).json({ Message: "Email address taken" });
    } else if (err) {
      res.status(500).json({ Message: "Internal Server Error" });
    } else {
      UserModel.findOne({ username: req.body.username }).exec((err, user) => {
        if (err) {
          res.status(500).json({ Message: "Internal Server Eror" });
        } else if (user) {
          res.status(403).json({ Message: "Username already taken" });
        } else {
          const {
            firstName,
            lastName,
            email,
            username,
            password,
            role,
            profileUrl,
            contact,
          } = req.body;

          const newUser = new UserModel({
            firstName,
            lastName,
            email,
            contact,
            username,
            password,
            role,
            profileUrl,
          });
          newUser.save((err, result) => {
            if (err) {
              res.status(500).json({ Message: "Internal Server Error" });
            }
            if (result) {
              res.status(201).json({ Message: "User successfully inserted" });
            }
          });
        }
      });
    }
  });
};
//sign in involves both email or username hence both are checked if exist
const signIn = (req, res) => {
  //param can either be email or password
  const logProcess = (user) => {
    if (user.authenticate(req.body.password) && user.role === "regular") {
      const token = jwt.sign({ _id: user._id ,role:user.role}, process.env.JWT_SECRET_KEY, {
        expiresIn: "3600s",
      });
      const { _id, firstName, lastName, email, username, role } = user;
      res.status(202).json({
        token,
        user: { _id, firstName, lastName, email, username, role },
      });
    } else if (user.role === "admin") {
      res.status(403).json({
        Message: "Admins are not allowed to use regular users portal",
      });
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
          res.status(404).json({ Message: "Thats not the right email" });
        }
      })
      .catch((err) => console.log(err));
  }
  
};

//This will enable every access to protected route to be authrorized before access is granted
const requireSign = (req, res, next) => {
  //get the jwt token from the client
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, success) {
    if (err) res.status(401).json({ Message: "You might need to sign in" });
    if (success) {
      req.user = success;
      next();
    }
  });
};

module.exports = {
  signUp,
  signIn,
  requireSign,
};
