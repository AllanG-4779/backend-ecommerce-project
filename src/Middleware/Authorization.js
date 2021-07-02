const jwt = require("jsonwebtoken");
const Verify = (req, res, next) => {
  const headers = req.headers.authorization;
  if (headers) {
    const token = headers.split(" ")[1];
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      (err, success) => {
        if (err) {
          console.log(err);
          res.sendStatus(403);
          
        }
        if (success) {
          console.log(success);
          req.user = success;
          next();
        }
      }
    );
  } else {
    res.sendStatus(500);
  }
};

const adminAuthorization = (req, res, next) => {
  if (req.user.role !== "admin") {
    console.log(req.user)
    res
      .status(403)
      .json({ Message: "You are not allowed to access this resource" });
      
  }else{
    next()
  }
};
module.exports = { Verify, adminAuthorization };
