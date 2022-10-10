const db = require("../../database/config")

class User {
	static async find(name, password) {
		return db.any("select name from users where name = $1 and password = $2", [name, password])
	}

	static async addUser(username, password) {
		try {
			await db.any(`insert into users(name, password) values ($1, $2)`, [username, password])
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	static async getNameAndPassword(username) {
		return await db.any(`select name,password from users where name = $1 and password = $2`, [
			username,
			password,
		])
	}
}

module.exports = User
