import React from "react"
import "../../App.css"
import FollowerCard from "./FollowerCard"
import useFollowersAndFollowings from "../../hooks/useFollowersAndFollowings"

const Followers = () => {
	const data = useFollowersAndFollowings()

	return (
		<div>
			<h2 className="font-semibold mb-3">Who is following you?</h2>
			<div className="px-2">
				<div className="flex flex-col gap-3">
					{data?.followers?.map((item) => (
						<FollowerCard
							follower={item}
							followings={data?.followings}
							id={item.user_id}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Followers
