const User = require("../models/User")

const getUserFollowersAndFollowing = async (req, res) => {
	const { user_id } = req.params
	const [followers, followings] = await User.getFollowersAndFollowing(user_id)
	res.status(200).json({
		followers,
		followings,
	})
}

const postUpdateUser = async (req, res) => {
	const { newFullName, newTitle, user_id } = req.body
	const filename = req.file?.filename
	let avatar_url = ""
	filename && (avatar_url = `http://localhost:4000/${filename}`)
	await User.updateUserInfo(newFullName, newTitle, avatar_url, user_id)
	res.status(200).json("test")
}

const getUserInfo = async (req, res) => {
	const { user_id } = req.params
	const user = await User.getUserInfo(user_id)
	if (!user) throw new Error("User not exist")
	res.status(200).json(user)
}

module.exports = {
	getUserFollowersAndFollowing,
	postUpdateUser,
	getUserInfo,
}
