const User = require("../models/User")

const getUserFollowersAndFollowing = async (req, res) => {
	const { user_id } = req.params
	const [followers, following] = await User.getFollowersAndFollowing(user_id)
	console.log("🚀 -> file: usersController.js -> line 6 -> followers", followers)
	console.log("🚀 -> file: usersController.js -> line 6 -> following", following)
    res.status(200).json({
        followers, following
    })
}

module.exports = {
	getUserFollowersAndFollowing,
}
