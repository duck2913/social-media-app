import React from "react"
import "../../App.css"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"

// const followers = [
// 	{
// 		name: "Andrew Thomas",
// 		addr: "@thomas",
// 		img: "https://images.unsplash.com/photo-1665153856965-79caf2747887?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
// 	},
// 	{
// 		name: "Xiu le",
// 		addr: "@xiule",
// 		img: "https://images.unsplash.com/photo-1665157296251-9ed707fe0cf5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
// 	},
// 	{
// 		name: "Xiu le",
// 		addr: "@xiule",
// 		img: "https://images.unsplash.com/photo-1665157296251-9ed707fe0cf5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
// 	},
// 	{
// 		name: "Xiu le",
// 		addr: "@xiule",
// 		img: "https://images.unsplash.com/photo-1665157296251-9ed707fe0cf5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
// 	},
// 	{
// 		name: "Xiu le",
// 		addr: "@xiule",
// 		img: "https://images.unsplash.com/photo-1665157296251-9ed707fe0cf5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
// 	},
// ]

const defaultAvatarUrl = "https://i.im.ge/2022/10/14/27va5c.xiu.jpg"

const Following = () => {
	const [followers, setFollower] = useState([])
	const [following, setFollowing] = useState([])
	console.log("🚀 -> file: Following.jsx -> line 38 -> followers", followers)
	console.log("🚀 -> file: Following.jsx -> line 41 -> following", following)

	function handleClick() {
		fetch("http://localhost:4000/test")
	}

	async function getFollowersAndFollowing(user_id) {
		const res = await axios.get(`http://localhost:4000/users/${user_id}`)
		const { followers, following } = res.data
		setFollower(followers)
		setFollowing(following)
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
					{followers.map((follower) => (
						<div
							className="w-full flex items-center justify-start gap-3"
							id={follower.user_id}
						>
							<img
								src={follower.avatar_url || defaultAvatarUrl}
								alt="avatar"
								className="w-[2.4rem] h-[2.4rem] rounded-full"
							/>
							<div className="flex flex-col">
								<h2 className="text-gray-100 font-semibold text-sm">
									{follower.fullname}
								</h2>
								<p className="text-sm">{follower.tag}</p>
							</div>
							{following.findIndex((item) => item.id === follower.user_id) === -1 ? (
								<button
									className="ml-auto font-bold bg-gradient-to-r from-purple-600  to-pink-500 text-white px-2 py-1 rounded-lg active:-translate-y-2 transition-all w-[5.5rem]"
									onClick={handleClick}
								>
									Follow
								</button>
							) : (
								<button
									className="ml-auto font-bold bg-purple-400 text-purple-600 px-2 py-1 rounded-lg active:-translate-y-2 transition-all"
									onClick={handleClick}
								>
									Unfollow
								</button>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Following
