import React from "react"
import NewPost from "./NewPost"
import Posts from "./Posts"

const Feeds = () => {
	return (
		<div className="h-[100vh] p-4 overflow-auto">
			<NewPost />
			<Posts />
		</div>
	)
}

export default Feeds
