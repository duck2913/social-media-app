import React, { useState } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { AiOutlineMessage, AiFillCaretDown } from "react-icons/ai"
import { Card, TextInput } from "@mantine/core"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import axios from "axios"
import MoonLoader from "react-spinners/MoonLoader"
import { TbSend } from "react-icons/tb"
import { useRef } from "react"
import { formatDate } from "../../utils"

const Post = ({ post }) => {
	const queryClient = useQueryClient()
	const { user_id: userId } = JSON.parse(localStorage.getItem("user"))
	const [showAllComments, setShowAllComments] = useState(false)
	const commentsListRef = useRef()
	const postId = post.post_id
	const commentRef = useRef()

	const handleLike = () => {
		mutateLike({ postId, userId })
	}

	const handleUnlike = () => {
		mutateUnlike({ postId, userId })
	}

	const handleAddComment = (e) => {
		e.preventDefault()

		const content = commentRef.current.value
		mutateAddComment({ content, userId, postId })

		commentRef.current.value = ""
	}

	const { mutate: mutateLike, isLoading: isLoadingLike } = useMutation(
		(data) => axios.post(`${process.env.REACT_APP_URL}/posts/likes`, data),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("liked-list")
				queryClient.invalidateQueries("likesCount")
			},
		},
	)

	const { mutate: mutateUnlike, isLoading: isLoadingUnlike } = useMutation(
		(data) => axios.delete(`${process.env.REACT_APP_URL}/posts/unlikes`, { data: data }),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("liked-list")
				queryClient.invalidateQueries("likesCount")
			},
		},
	)

	const { data: likedList } = useQuery(["liked-list"], async () => {
		const res = await axios.get(`${process.env.REACT_APP_URL}/posts/likes/?userId=${userId}`)
		return res?.data?.map((post) => post.post_id)
	})

	const { data: likesCount } = useQuery(["likesCount", postId], async () => {
		const res = await axios.get(`${process.env.REACT_APP_URL}/posts/likes/count/${postId}`)
		return res.data
	})

	const { data: comments } = useQuery(["comments", postId], async () => {
		const res = await axios.get(`${process.env.REACT_APP_URL}/posts/comments/${postId}`)
		return res.data
	})

	const { mutate: mutateAddComment } = useMutation(
		(data) => axios.post(`${process.env.REACT_APP_URL}/posts/comments`, data),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("comments", postId)
			},
		},
	)

	return (
		<Card className="rounded-xl px-[1.5rem]">
			<div className="flex gap-2  mb-4 items-center">
				<img src={post.avatar_url} alt="user" className="w-[2rem] h-[2rem] rounded-full" />
				<div>
					<h1 className="font-bold text-gray-400">{post.fullname}</h1>
					<h1 className="font-semibold text-gray-500 text-sm">{post.tag}</h1>
				</div>
				<p className="ml-auto">{formatDate(new Date(post.created_at))}</p>
			</div>
			<p className="mb-4 text-lg">{post.content}</p>
			{post.post_img_url && <img src={post.post_img_url} alt="post" className="post rounded-xl mx-auto" />}
			<div className="buttons flex text-[1.5rem] mt-3 gap-3 ">
				{likedList?.findIndex((likedId) => likedId === post.post_id) !== -1 &&
					(isLoadingUnlike ? (
						<MoonLoader size={20} color={"#d34c4c"} />
					) : (
						<AiFillHeart className="text-red-400 cursor-pointer active:-translate-y-1" onClick={handleUnlike} />
					))}
				{likedList?.findIndex((likedId) => likedId === post.post_id) === -1 &&
					(isLoadingLike ? (
						<MoonLoader size={20} color={"#d34c4c"} />
					) : (
						<AiOutlineHeart className="cursor-pointer active:-translate-y-1" onClick={handleLike} />
					))}
				<button
					className="flex items-center gap-1 cursor-pointer active:-translate-y-1"
					onClick={() => {
						setShowAllComments((state) => !state)
					}}>
					<AiOutlineMessage />
				</button>
			</div>
			<div className="nums_likes text-sm text-gray-400 mt-2 font-semibold">{likesCount} likes</div>
			<div className={`p-3 ${!showAllComments && "max-h-[4rem] overflow-hidden"}`} ref={commentsListRef}>
				{comments?.map((comment) => (
					<div className="flex gap-2 items-end mb-2 " key={comment.user_name + Math.random()}>
						<div className="flex items-center gap-1">
							<img src={comment.avatar_url} alt="user" className="w-[1rem] h-[1rem] rounded-full" />
							<h3 className="font-semibold">{comment.user_name || comment.tag}:</h3>
						</div>
						<p className="text-xs pb-[2px]">{comment.content}</p>
					</div>
				))}
			</div>
			{commentsListRef?.current?.clientHeight > 65 && !showAllComments && (
				<div
					className="mt-2 opacity-80 px-3 flex items-center gap-1 text-xs cursor-pointer"
					onClick={() => {
						setShowAllComments((state) => !state)
					}}>
					<p>More</p>
					<AiFillCaretDown />
				</div>
			)}
			<hr className="my-2" />
			<form className="w-full relative" onSubmit={handleAddComment}>
				<TextInput placeholder="Add your comment" required ref={commentRef} />
				<button className="absolute top-[50%] right-[5px] -translate-y-1/2 text-gray-100 text-xl">
					<TbSend />
				</button>
			</form>
		</Card>
	)
}

export default Post
