const jwt = require("jsonwebtoken")
const User = require("../models/User")
const googleSignIn = async (req, res) => {
	const name = req.body.name
	const picture = req.body.picture
	// check if user already exist
	const query = await User.findByName(name)
	const user = query[0]
	console.log("🚀 -> file: OAuthController.js -> line 9 -> user", user)
	if (!user) {
		await User.addGoogleUser(name, picture)
	}
	const token = jwt.sign({ name, picture }, process.env.JWT_SECRET, { expiresIn: "1h" })
	res.json({
		message: "login with google successfully",
		token: token,
	})
}

module.exports = {
	googleSignIn,
}
