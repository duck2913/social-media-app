const pgp = require("pg-promise")()

const url = "postgres://zluysmhz:fO1MmHv9dq0pLkztx72ioJqH_ECNj8xb@tiny.db.elephantsql.com/zluysmhz"
const db = pgp(url)

module.exports = db
