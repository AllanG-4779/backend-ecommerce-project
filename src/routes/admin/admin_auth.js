const express = require('express')
const {adminAuth} = require("../../Controllers/admin/admin_auth_ctrl");
const {adminSignUp} = require("../../Controllers/admin/admin_auth_ctrl");
const {adminSignIn} = require("../../Controllers/admin/admin_auth_ctrl");

const { reqValidated, validater } = require('../../validation/signupValidation');
const {validLogin,validValidated}= require("../../validation/signinvalidation");
const { Verify } = require('../../Middleware/Authorization');
const router = express.Router()

router.post('/signup', validater,reqValidated,adminSignUp)

router.post('/signin',validLogin,validValidated, adminSignIn)

router.get("/done",Verify,(req,res)=>{
       res.status(200).send("OK")
})

module.exports = router