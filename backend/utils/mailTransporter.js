const SibApiV3Sdk = require("sib-api-v3-sdk")
SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey = process.env.SIB_API_KEY
const transporter = new SibApiV3Sdk.TransactionalEmailsApi()

module.exports = transporter
