const db = require("../../database/config")

class Post {
	static async addNewPost(user_id, postMsg, postImgUrl) {
		try {
			const user = await db.any(
				"select avatar_url,tag from Users where user_id = $1",
				user_id,
			)
			const userImgUrl = user[0].avatar_url
			const userTag = user[0].tag
			await db.any(
				`insert into Posts(user_id, content, post_img_url, user_img_url, user_tag)
                values ($1,$2,$3,$4,$5)`,
				[user_id, postMsg, postImgUrl, userImgUrl, userTag],
			)
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	static async getAllPosts() {
		try {
			return await db.any("select * from Posts")
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}

module.exports = Post
