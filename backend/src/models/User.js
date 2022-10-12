const db = require("../../database/config")
const bcrypt = require("bcrypt")
const saltRounds = 10

class User {
	static async addUser(fullname, username, email, password) {
		try {
			bcrypt.hash(password, saltRounds, async function (err, hash) {
				if (err) throw err
				await db.any(
					`insert into Users(fullname,username,email, password) values ($1, $2, $3, $4)`,
					[fullname, username, email, hash],
				)
			})
		} catch (error) {
			console.log(error)
			throw err
		}
	}

	static async addGoogleUser(name, picture, email) {
		try {
			return await db.any(
				`insert into Users(fullname,avatar_url,email,tag,password) values ($1, $2, $3, $4, $5)`,
				[name, picture, email, "@" + email.split("@")[0], "co cc chu ma mo"],
			)
		} catch (error) {
			console.log(error)
		}
	}

	static async findByEmail(email) {
		try {
			return await db.any("select * from Users where email = $1", email)
		} catch (error) {
			console.log(error)
		}
	}

	static async findByEmailOrName(email, username) {
		try {
			return await db.any("select * from Users where email = $1 or username = $2", [
				email,
				username,
			])
		} catch (error) {
			console.log(error)
		}
	}
}

module.exports = User
