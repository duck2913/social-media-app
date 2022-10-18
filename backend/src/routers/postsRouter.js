const express = require("express")
const router = express.Router()
const postsController = require("../controllers/postsController")
const upload = require("../../utils/multerUploader")
// path: /posts

router.get("/", postsController.getAllPosts)

router.post("/new-post", upload.single("postImg"), postsController.postAddNewPost)

module.exports = router
