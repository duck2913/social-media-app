const pgp = require("pg-promise")()

const url =
	"postgresql://postgres:kUCc0Uiid1lvsFIppDUK@containers-us-west-62.railway.app:6026/railway"
const db = pgp(url)

module.exports = db
