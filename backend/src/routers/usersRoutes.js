const express = require("express")
const router = express.Router()
const usersController = require("../controllers/usersController")

//  /users

router.get("/:user_id", usersController.getUserFollowersAndFollowing)

module.exports = router
