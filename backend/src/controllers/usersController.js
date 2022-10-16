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

const getSuggestedPeople = async (req, res) => {
	const { user_id: myId } = req.params
	const allUsers = await User.getAllUsers()
	if (!allUsers) return res.status(400).json("can't get all users")
	const [, followings] = await User.getFollowersAndFollowing(myId)
	if (!followings) return res.status(400).json("can't get list of followings")
	const listOfFollowingsId = followings.map((person) => person.user_id)
	const suggestedPeople = allUsers
		.filter((user) => user.user_id != myId)
		.filter((user) => !listOfFollowingsId.includes(user.user_id))
	res.status(200).json(suggestedPeople)
}

const postFollowSomeone = async (req, res) => {
	const { myId, followId } = req.body
	await User.follow(myId, followId)
	res.status(200).json("follow successfully")
}

const deleteUnfollowSomeone = async (req, res) => {
	const { myId, unfollowId } = req.body
	await User.unfollow(myId, unfollowId)
	res.status(200).json("unfollow successfully")
}

module.exports = {
	getUserFollowersAndFollowing,
	postUpdateUser,
	getUserInfo,
	getSuggestedPeople,
	postFollowSomeone,
	deleteUnfollowSomeone,
}
