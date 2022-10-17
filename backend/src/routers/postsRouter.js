const express = require("express")
const router = express.Router()
const postsController = require("../controllers/postsController")
// path: /posts

router.post("/new-post", postsController.postAddNewPost)

module.exports = router
