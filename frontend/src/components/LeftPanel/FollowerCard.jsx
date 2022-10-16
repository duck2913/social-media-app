import React from "react"
import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import MoonLoader from "react-spinners/MoonLoader"

const FollowerCard = (props) => {
	const { follower, followings } = props
	const queryClient = useQueryClient()
	//
	function handleFollow() {
		const followId = follower.user_id
		mutateFollow(followId)
	}

	function postFollowRequest(followId) {
		const { user_id: myId } = JSON.parse(localStorage.getItem("user"))
		return axios.post(`/users/follows`, { myId, followId })
	}

	const { mutate: mutateFollow, isLoading: isLoadingFollow } = useMutation(postFollowRequest, {
		onSuccess: () => {
			queryClient.invalidateQueries("suggest")
			queryClient.invalidateQueries("followers and followings")
		},
	})
	//
	function handleUnfollow(unfollowId) {
		const { user_id: myId } = JSON.parse(localStorage.getItem("user"))
		mutateUnfollow({ myId, unfollowId })
	}

	const { mutate: mutateUnfollow, isLoading: isLoadingUnfollow } = useMutation(
		({ myId, unfollowId }) => {
			return axios.delete("/users/follows", { data: { myId, unfollowId } })
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("suggest")
				queryClient.invalidateQueries("followers and followings")
			},
		},
	)

	return (
		<div className="w-full flex items-center justify-start gap-3">
			<img
				src={follower.avatar_url || process.env.REACT_APP_DEFAULT_IMG_URL}
				alt="avatar"
				className="w-[2.4rem] h-[2.4rem] rounded-full"
			/>
			<div className="flex flex-col">
				<h2 className="text-gray-100 font-semibold text-sm">{follower.fullname}</h2>
				<p className="text-sm">{follower.tag}</p>
			</div>
			{followings?.findIndex((item) => item.user_id === follower.user_id) === -1 &&
				(isLoadingFollow ? (
					<MoonLoader size={30} color={"#79ebff"} className="ml-auto" />
				) : (
					<button
						className="ml-auto font-bold bg-gradient-to-r from-purple-600  to-pink-500 text-white px-2 py-1 rounded-lg active:-translate-y-2 transition-all hover:scale-105 w-[5rem]"
						onClick={() => handleFollow(follower.user_id)}
					>
						Follow
					</button>
				))}
			{followings?.findIndex((item) => item.user_id === follower.user_id) !== -1 &&
				(isLoadingUnfollow ? (
					<MoonLoader size={30} color={"#79ebff"} className="ml-auto" />
				) : (
					<button
						className="ml-auto font-bold bg-[#572a64] text-purple-300 px-2 py-1 rounded-lg active:-translate-y-2 transition-all hover:scale-105 w-[5rem] "
						onClick={() => handleUnfollow(follower.user_id)}
					>
						Unfollow
					</button>
				))}
		</div>
	)
}

export default FollowerCard
