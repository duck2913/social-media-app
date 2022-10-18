const express = require("express")
const router = express.Router()
const postsController = require("../controllers/postsController")
const upload = require("../../utils/multerUploader")
// path: /posts

router.get("/", postsController.getAllPosts)

router.post("/new-post", upload.single("postImg"), postsController.postAddNewPost)

router.post("/likes", postsController.postLikeAPost)

router.get("/likes", postsController.getListOfLikedPosts)

router.get("/likes/count/:postId", postsController.getLikesCount)

router.delete("/unlikes", postsController.deleteUnlikeAPost)

module.exports = router
