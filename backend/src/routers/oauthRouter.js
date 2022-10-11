const express = require("express")
const router = express.Router()

const oauthController = require("../controllers/oauthController")

// current path: /auth/oauth

router.post("/", oauthController.googleSignIn)

module.exports = router
