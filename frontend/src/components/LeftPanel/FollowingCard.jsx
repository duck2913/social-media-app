import React from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import MoonLoader from "react-spinners/MoonLoader"
import axios from "axios"

const FollowingCard = ({ following }) => {
	function handleUnfollow(unfollowId) {
		const { user_id: myId } = JSON.parse(localStorage.getItem("user"))
		mutate({ myId, unfollowId })
	}

	const queryClient = useQueryClient()
	const { mutate, isLoading } = useMutation(
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
		<div className="w-full flex items-center justify-start gap-3" id={following.user_id}>
			<img
				src={following.avatar_url || process.env.REACT_APP_DEFAULT_IMG_URL}
				alt="avatar"
				className="w-[2.4rem] h-[2.4rem] rounded-full"
			/>
			<div className="flex flex-col">
				<h2 className="text-gray-100 font-semibold text-sm">{following.fullname}</h2>
				<p className="text-sm">{following.tag}</p>
			</div>
			{isLoading ? (
				<MoonLoader size={30} color={"#79ebff"} className="ml-auto" />
			) : (
				<button
					className="ml-auto font-bold  bg-[#2a4a64] text-blue-400 px-2 py-1 rounded-lg active:-translate-y-2 transition-all hover:scale-105"
					onClick={() => handleUnfollow(following.user_id)}
				>
					Unfollow
				</button>
			)}
		</div>
	)
}

export default FollowingCard
