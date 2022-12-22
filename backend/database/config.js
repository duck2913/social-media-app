const pgp = require("pg-promise")()

const url = "postgresql://postgres:otUCD4NIMH3JEjKCgmvx@containers-us-west-144.railway.app:7332/railway"
const db = pgp(url)

module.exports = db
