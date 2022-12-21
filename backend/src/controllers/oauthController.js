const jwt = require("jsonwebtoken")
const User = require("../models/User")

const googleSignIn = async (req, res) => {
	const name = req.body.name
	const picture = req.body.picture
	const email = req.body.email
	// check if user already exist
	const user = await User.findByEmailOrName(email, "")
	if (!user) {
		await User.addGoogleUser(name, picture, email)
		return res.status(200).json("You have been registered with our system! Please log in with google again")
	}
	const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" })
	res.json({
		message: "login with google successfully",
		token: token,
		user,
	})
}

module.exports = {
	googleSignIn,
}
