import React from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { AiOutlineMessage } from "react-icons/ai"
import { Card } from "@mantine/core"
import { formatDate, calcTimePass } from "../../utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const comments = [
	{
		from: "bi",
		message: "be xiu yeu thien than ",
	},
]

const Post = ({ post }) => {
	const queryClient = useQueryClient()

	const handleLike = () => {
		const postId = post.post_id
		const userId = JSON.parse(localStorage.getItem("user")).user_id
		mutateLike({ postId, userId })
	}

	const handleUnlike = () => {
		const postId = post.post_id
		const userId = JSON.parse(localStorage.getItem("user")).user_id
		mutateUnlike({ postId, userId })
	}

	const { mutate: mutateLike } = useMutation((data) => axios.post("/posts/likes", data))

	const { mutate: mutateUnlike } = useMutation((data) =>
		axios.delete("/posts/unlikes", { data: data }),
	)

	return (
		<Card className="rounded-xl px-[1.5rem]">
			<div className="flex gap-2  mb-4 items-center">
				<img
					src={post.user_img_url}
					alt="user"
					className="w-[2rem] h-[2rem] rounded-full"
				/>
				<div>
					<h1 className="font-bold text-gray-400">{post.user_name}</h1>
					<h1 className="font-semibold text-gray-500 text-sm">{post.user_tag}</h1>
				</div>
				<div className="ml-auto flex flex-col text-sm text-gray-500 items-end">
					<p>{formatDate(new Date(post.created_at))}</p>
					<p>{calcTimePass(new Date(post.created_at))} trước</p>
				</div>
			</div>
			<p className="mb-4 text-lg">{post.content}</p>
			{post.post_img_url && (
				<img src={post.post_img_url} alt="post" className="post rounded-xl mx-auto" />
			)}
			<div className="buttons flex text-[1.5rem] mt-3 gap-3 ">
				<AiFillHeart
					className="text-red-400 cursor-pointer active:-translate-y-1"
					onClick={handleUnlike}
				/>
				<AiOutlineHeart
					className="cursor-pointer active:-translate-y-1"
					onClick={handleLike}
				/>
				<AiOutlineMessage className="cursor-pointer active:-translate-y-1" />
			</div>
			<div className="nums_likes text-sm text-gray-400 mt-2 font-semibold">2300 likes</div>
			<div className="mt-5">
				{comments.map((comment) => (
					<div className="flex gap-2 items-center" key={comment.from}>
						<h3 className="font-semibold">{comment.from}</h3>
						<p className="text-sm">{comment.message}</p>
					</div>
				))}
			</div>
		</Card>
	)
}

export default Post
