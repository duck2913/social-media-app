const db = require("../../database/config")

class User {
	static async addUser(username, password) {
		return await db.any(`insert into users(username, password) values ($1, $2)`, [
			username,
			password,
		])
	}

	static async getNameAndPassword(username) {
		return await db.any(`select name,password from users where name = $1 and password = $2`, [
			username,
			password,
		])
	}
}

module.exports = User
