import React from "react"
import "../../App.css"
import FollowerCard from "./FollowerCard"
import useGetFollowersAndFollowings from "../../hooks/useGetFollowersAndFollowings"

const Followers = () => {
	const data = useGetFollowersAndFollowings()

	return (
		<div>
			<h2 className="font-semibold mb-3">Who is following you?</h2>
			<div className="px-2">
				<div className="flex flex-col gap-3">
					{data?.followers?.map((item) => (
						<FollowerCard
							follower={item}
							followings={data?.followings}
							key={item.user_id}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Followers
