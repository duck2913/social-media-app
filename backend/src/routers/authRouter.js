const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const oauthController = require("../controllers/oauthController")
const oauthRouter = require("./oauthRouter")
const passport = require("passport")

// current path /auth
router.post("/login", authController.postLogin)

router.get("/signup/:token", authController.getSignup)

router.post("/signup", authController.postSignup)

router.use("/oauth", oauthRouter)

module.exports = router
