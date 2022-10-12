const User = require("../models/User")
const jwt = require("jsonwebtoken")

const postLogin = async (req, res) => {
	const name = req.body.name
	const password = req.body.password
	const result = await User.find(name, password)
	const user = result[0]
	if (!user) {
		return res.status(400).json("Username and password is not correct")
	}
	// sign with token
	const token = jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: "1h" })
	return res.status(200).json({ message: "Login successfully", token: token })
}

const postSignup = async (req, res) => {
	const fullname = req.body.fullname
	const username = req.body.username
	const email = req.body.email
	const password = req.body.password
	// check if user already exist
	const queryResult = await User.findByEmailOrName(email, username)
	const user = queryResult[0]
	console.log("🚀 -> file: authController.js -> line 24 -> user", user)
	if (user) {
		return res.status(400).json("username or email already existed ")
	}
	await User.addUser(fullname, username, email, password)
	res.status(200).json("sign up successfully")
}

module.exports = {
	postLogin,
	postSignup,
}
