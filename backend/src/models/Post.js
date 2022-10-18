const db = require("../../database/config")

class Post {
	static async addNewPost(user_id, postMsg, postImgUrl) {
		try {
			const user = await db.any(
				"select avatar_url,tag,fullname from Users where user_id = $1",
				user_id,
			)
			const userImgUrl = user[0].avatar_url
			const userTag = user[0].tag
			const userName = user[0].fullname
			await db.any(
				`insert into Posts(user_id, content, post_img_url, user_img_url, user_tag, user_name)
                values ($1,$2,$3,$4,$5,$6)`,
				[user_id, postMsg, postImgUrl, userImgUrl, userTag, userName],
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

	static async likeAPost(userId, postId) {
		try {
			await db.any("insert into Likes(user_id, post_id) values($1,$2)", [userId, postId])
		} catch (error) {
			throw error
		}
	}

	static async unlikeAPost(userId, postId) {
		try {
			await db.any("delete from Likes where user_id = $1 and post_id = $2", [userId, postId])
		} catch (error) {
			throw error
		}
	}
}

module.exports = Post
