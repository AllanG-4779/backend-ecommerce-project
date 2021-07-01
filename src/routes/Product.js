const express = require("express")
const { addProduct } = require("../Controllers/Product")
const { Verify, adminAuthorization } = require("../Middleware/Authorization")

const router = express.Router()


router.post("/create/product",Verify,adminAuthorization,addProduct)

module.exports = {productRoute:router}