import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import React from "react"
import Post from "./Post"
import MoonLoader from "react-spinners/MoonLoader"

const Posts = () => {
	const { data, isLoading } = useQuery(["posts"], async () => {
		const res = await axios.get("/posts")
		return res.data
	})

	return (
		<div className="flex gap-8 flex-col">
			{isLoading && <MoonLoader size={30} color={"#79ebff"} className="mx-auto" />}
			{data?.map((post) => (
				<Post key={post.post_id} post={post} />
			))}
		</div>
	)
}

export default Posts
