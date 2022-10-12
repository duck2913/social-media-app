const jwt = require("jsonwebtoken")
const User = require("../models/User")

const googleSignIn = async (req, res) => {
	const name = req.body.name
	const picture = req.body.picture
	const email = req.body.email
	// check if user already exist
	const query = await User.findByEmail(email)
	const user = query[0]
	console.log("🚀 -> file: oauthController.js -> line 11 -> user", user)
	if (!user) {
		await User.addGoogleUser(name, picture, email)
	}
	const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" })
	console.log("🚀 -> file: oauthController.js -> line 16 -> token", token);
	res.json({
		message: "login with google successfully",
		token: token,
	})
}

module.exports = {
	googleSignIn,
}
