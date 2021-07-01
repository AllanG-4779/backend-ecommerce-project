const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      required: true,
      type: String,
      min: 5,
      max: 20,
      trim: true,
    },
    lastName: {
      required: true,
      type: String,
      min: 5,
      max: 20,
      trim: true,
    },
    email: {
      required: true,
      type: String,
      unique: true,
      trim: true,
    },
    contact: {
      required: true,
      type: String,
    },
    username: {
      required: true,
      type: String,
      max: 20,
      trim: true,
      unique: true,
    },
    hashed_password: {
      required: true,
      type: String,

      trim: true,
    },
    role: {
      type: String,

      enum: ["regular", "admin"],
      default: "regular",
    },
    profileUrl: { type: String },
  },
  { timestamps: true }
);

//this is used to compute the hash of the password sent
UserSchema.virtual("password").set(function (Password) {
  if (Password) {
    this.hashed_password = bcrypt.hashSync(Password, 10);
  }
});
UserSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hashed_password);
  },
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };
