const express = require('express')
const {requireSign} = require("../../Controllers/user/auth.ctrl");
const {visitPost} = require("../../Controllers/user/protected.ctrl");
const { signUp,signIn } = require('../../Controllers/user/auth.ctrl')

const router = express.Router()

router.post('/signup',signUp)

router.post('/signIn',signIn)

router.post('/profile',requireSign,visitPost)

module.exports = router