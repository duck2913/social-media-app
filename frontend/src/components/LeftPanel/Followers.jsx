import React from "react"
import "../../App.css"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import axios from "axios"
import shallow from "zustand/shallow"
import { useUserStore } from "../../store/userStore"
import FollowerCard from "./FollowerCard"

const Followers = () => {
	const [followers, followings, setFollowers, setFollowings] = useUserStore(
		(state) => [state.followers, state.followings, state.setFollowers, state.setFollowings],
		shallow,
	)

	async function getFollowersAndFollowing(user_id) {
		const res = await axios.get(`http://localhost:4000/users/${user_id}`)
		const { followers, followings } = res.data
		setFollowers(followers)
		setFollowings(followings)
	}

	const { mutate } = useMutation(getFollowersAndFollowing)

	useEffect(() => {
		const { user_id } = JSON.parse(localStorage.getItem("user"))
		mutate(user_id)
	}, [mutate])

	return (
		<div>
			<h2 className="font-semibold mb-3">Who is following you?</h2>
			<div className="px-2">
				<div className="flex flex-col gap-3">
					{followers.map((item) => (
						<FollowerCard follower={item} followings={followings} id={item.user_id} />
					))}
				</div>
			</div>
		</div>
	)
}

export default Followers
