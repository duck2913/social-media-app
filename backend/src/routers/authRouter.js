const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const oauthRouter = require("./oauthRouter")

// current path /auth
router.post("/login", authController.postLogin)

router.post("/signup", authController.postSignup)

router.use("/oauth", oauthRouter)

module.exports = router
