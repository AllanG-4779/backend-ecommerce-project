const express = require("express");

const multer = require("multer");
const shortid = require("shortid");
const addProduct = require("../Controllers/Product");
const { Verify, adminAuthorization } = require("../Middleware/Authorization");
const path = require("path");
const router = express.Router();
//disk storage


//then intercept the request i.e use the uploads function as a middleware
router.post(
  "/create/product",
  Verify,
  adminAuthorization,

  addProduct
);

module.exports = { productRoute: router };
