const jwt = require("jsonwebtoken")
const User = require("../models/User")

const postLogin = async (req, res) => {
	const username = req.body.username
	const password = req.body.password
	const valid = await User.checkPassword(username, password)
	if (!valid) {
		return res.status(400).json("Username or password is not correct")
	}

	const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
	const user = await User.findByEmailOrName("", username)
	return res.status(200).json({ message: "Login successfully", token: token, user })
}

const postSignup = async (req, res) => {
	const fullname = req.body.fullname
	const username = req.body.username
	const email = req.body.email
	const password = req.body.password

	// check if user already exist
	const user = await User.findByEmailOrName(email, username)
	if (user) {
		return res.status(400).json("username or email already existed ")
	}

	await User.addUser(fullname, username, email, password)
	res.json("register successfully")
}

module.exports = {
	postLogin,
	postSignup,
}
