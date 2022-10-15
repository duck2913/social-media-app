const express = require("express")
const router = express.Router()
const usersController = require("../controllers/usersController")

const upload = require("../../utils/multerUploader")

//  /users

router.get("/:user_id", usersController.getUserFollowersAndFollowing)

router.put("/update", upload.single("avatar"), usersController.postUpdateUser)

module.exports = router
