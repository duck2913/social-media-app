import React from "react"
import "../../App.css"

const followers = [
	{
		name: "Andrew Thomas",
		addr: "@thomas",
		img: "https://images.unsplash.com/photo-1665153856965-79caf2747887?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
	},
	{
		name: "Xiu le",
		addr: "@xiule",
		img: "https://images.unsplash.com/photo-1665157296251-9ed707fe0cf5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
	},
	{
		name: "Xiu le",
		addr: "@xiule",
		img: "https://images.unsplash.com/photo-1665157296251-9ed707fe0cf5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
	},
	{
		name: "Xiu le",
		addr: "@xiule",
		img: "https://images.unsplash.com/photo-1665157296251-9ed707fe0cf5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
	},
	{
		name: "Xiu le",
		addr: "@xiule",
		img: "https://images.unsplash.com/photo-1665157296251-9ed707fe0cf5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
	},
]

const Following = () => {
	return (
		<div>
			<h2 className="text-black font-semibold mb-3">Who is following you?</h2>
			<div className="px-2">
				<div className="flex flex-col gap-3">
					{followers.map((follower) => (
						<div className="w-full flex items-center justify-start gap-3">
							<img
								src={follower.img}
								alt="avatar"
								className="w-[2.4rem] h-[2.4rem] rounded-full"
							/>
							<div className="flex flex-col">
								<h2 className="font-semibold text-sm">{follower.name}</h2>
								<p className="text-gray-500 text-sm">{follower.addr}</p>
							</div>
							<button className="ml-auto font-bold bg-gradient-to-r from-purple-600  to-pink-500 text-white px-2 py-1 rounded-lg">
								Follow
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Following
