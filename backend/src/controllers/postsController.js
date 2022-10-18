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

const postLikeAPost = async (req, res) => {
	const { userId, postId } = req.body
	await Post.likeAPost(userId, postId)
	res.json("test like")
}

const deleteUnlikeAPost = async (req, res) => {
	const { userId, postId } = req.body
	await Post.unlikeAPost(userId, postId)
	res.json("test unlike")
}

module.exports = {
	postAddNewPost,
	getAllPosts,
	postLikeAPost,
	deleteUnlikeAPost,
}
