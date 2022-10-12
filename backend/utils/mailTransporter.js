const nodemailer = require("nodemailer")
const nodemailerSendgrid = require("nodemailer-sendgrid")

const transport = nodemailer.createTransport(
	nodemailerSendgrid({
		apiKey: process.env.SENDGRID_API_KEY,
	}),
)

module.exports = transport
