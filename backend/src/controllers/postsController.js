const Post = require("../models/Post")

const postAddNewPost = async (req, res) => {
	const postImg = req.file
	const { postMsg, user_id } = req.body
	let postImgUrl
	postImg?.filename && (postImgUrl = `http://localhost:4000/${postImg.filename}`)
	await Post.addNewPost(user_id, postMsg, postImgUrl)
	res.status(200).json("add new post successfully")
}

const getAllPosts = async (_, res) => {
	const posts = await Post.getAllPosts()
	if (!posts) {
		return res.status(400).json("can't get all posts")
	}
	res.status(200).json(posts)
}

module.exports = {
	postAddNewPost,
	getAllPosts,
}
