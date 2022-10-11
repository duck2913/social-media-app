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
	const name = req.body.name
	const password = req.body.password
	await User.addUser(name, password)
	res.json("sign up successfully")
}

module.exports = {
	postLogin,
	postSignup,
}
