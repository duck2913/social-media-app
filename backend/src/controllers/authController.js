const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const transporter = require("../../utils/mailTransporter")

const postLogin = async (req, res) => {
	const username = req.body.name
	const password = req.body.password
	const valid = await User.checkPassword(username, password)
	if (!valid) {
		return res.status(400).json("Username or password is not correct")
	}
	// sign with token
	const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
	const user = await User.findByEmailOrName("", username)
	return res.status(200).json({ message: "Login successfully", token: token, user })
}

const getSignup = async (req, res) => {
	const token = req.params.token
	const { fullname, username, email, hash } = jwt.verify(token, process.env.JWT_SECRET)
	await User.addUser(fullname, username, email, "", hash) // 4th argument is empty because it's the password. If we already have the hash -> put empty password and use the hash to store in db
	res.status(200).json("confirm email successfully")
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

	transporter
		.sendTransacEmail({
			subject: "Email confirmation",
			sender: { email: "api@sendinblue.com", name: "AppCuaBi" },
			replyTo: { email: "api@sendinblue.com", name: "Sendinblue" },
			to: [{ name: fullname, email: email }],
			htmlContent: `<p>Chào bé xiu! Click vào <a href="http://localhost:4000/auth/signup/${token}">link</a> để hoàn thành đăng nhập </p>`,
			params: { bodyMessage: "Made just for you!" },
		})
		.then(
			function (data) {
				console.log(data)
			},
			function (error) {
				console.error(error)
			},
		)
	// just for testing
	await User.addUser(fullname, username, email, "", hash)
	res.json("please confirm email to complete registration")
}

module.exports = {
	postLogin,
	postSignup,
	getSignup,
}
