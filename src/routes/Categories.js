const express = require("express");
const { CreateCategory } = require("../Controllers/admin/CreateCategory.ctrl");
const { fetchCategories } = require("../Controllers/FetchCat.ctrl");
const { Verify, adminAuthorization } = require("../Middleware/Authorization");

const router = express.Router();

router.post("/category/create", Verify,adminAuthorization, CreateCategory);
router.get("/categories/get", fetchCategories);

module.exports = router;
