const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const transporter = require("../../utils/mailTransporter")

const postLogin = async (req, res) => {
	const name = req.body.name
	const password = req.body.password
	const valid = await User.checkPassword(name, password)
	if (!valid) {
		return res.status(400).json("Username or password is not correct")
	}
	// sign with token
	const token = jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
	return res.status(200).json({ message: "Login successfully", token: token })
}

const getSignup = async (req, res) => {
	const token = req.params.token
	const { fullname, username, email, hash } = jwt.verify(token, process.env.JWT_SECRET)
	console.log("🚀 -> file: authController.js -> line 22 -> hash", hash)
	await User.addUser(fullname, username, email, "", hash) // 4th argument is empty because it's the password. If we already have the hash -> put empty password and use the hash to store in db
	res.status(200).json("confirm email successfully")
}

const postSignup = async (req, res) => {
	const fullname = req.body.fullname
	const username = req.body.username
	const email = req.body.email
	const password = req.body.password
	// check if user already exist
	const queryResult = await User.findByEmailOrName(email, username)
	const user = queryResult[0]
	if (user) {
		return res.status(400).json("username or email already existed ")
	}

	const hash = await bcrypt.hash(password, 10)
	const token = jwt.sign(
		{
			message: `email confirmation for ${username}`,
			fullname,
			username,
			email,
			hash,
		},
		process.env.JWT_SECRET,
		{ expiresIn: 60 * 5 },
	)

	transporter.sendMail({
		from: "minhducdl1010@gmail.com",
		to: `${email}`,
		subject: "Confirm registration",
		html: `<p>Hello ${fullname}! This is your confirmation link: http://localhost:4000/auth/signup/${token}
         Please click on the link to finish the registration</p>`,
	})
	res.json("please confirm email to complete registration")
}

module.exports = {
	postLogin,
	postSignup,
	getSignup,
}
