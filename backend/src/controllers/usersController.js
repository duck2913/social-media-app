const User = require("../models/User")

const getUserFollowersAndFollowing = async (req, res) => {
	const { user_id } = req.params
	const [followers, followings] = await User.getFollowersAndFollowing(user_id)
	res.status(200).json({
		followers,
		followings,
	})
}

module.exports = {
	getUserFollowersAndFollowing,
}
