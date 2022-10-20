const Post = require("../models/Post")

const postAddNewPost = async (req, res) => {
	const postImg = req.file
	const { postMsg, user_id } = req.body
	let postImgUrl
	postImg?.filename && (postImgUrl = `https://app-backend-a7ig.onrender.com/${postImg.filename}`)
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

const getListOfLikedPosts = async (req, res) => {
	const { userId } = req.query
	const likedPostsId = await Post.getLikedPostsId(+userId)
	res.json(likedPostsId)
}

const getLikesCount = async (req, res) => {
	const { postId } = req.params
	const count = await Post.getLikesCount(postId)
	res.json(count)
}

const getAllComments = async (req, res) => {
	const { postId } = req.params
	const comments = await Post.getAllComments(postId)
	if (!comments) res.status(400).json("can't get all comments")
	res.status(200).json(comments)
}

const postAddComment = async (req, res) => {
	const { content, postId, userId } = req.body
	await Post.addComment(postId, content, userId)
	res.status(200).json("add comment successfully")
}

module.exports = {
	postAddNewPost,
	getAllPosts,
	postLikeAPost,
	deleteUnlikeAPost,
	getListOfLikedPosts,
	getLikesCount,
	getAllComments,
	postAddComment,
}
