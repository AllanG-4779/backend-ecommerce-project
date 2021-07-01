const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

//user router
const usersRoute = require("./src/routes/user/auth");

//admin routes
const adminRoutes = require("./src/routes/admin/admin_auth");
//categories routes
const categories = require("./src/routes/Categories");
const { productRoute } = require("./src/routes/Product");
//product routes

//connect to db

mongoose
  .connect("mongodb://localhost:27017/Members", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    console.log("Database conection achieved");

    app.listen(PORT, () => {
      console.log("Hello Server is working now on port", PORT);
    });
  })
  .catch((error) => {
    console.log("Something went wrong somewhere", error);
  });

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/api", usersRoute);
app.use("/api", categories);
app.use("/admin", adminRoutes);
app.use("/api/", productRoute);

const PORT = process.env.PORT || 3003;
