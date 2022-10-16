import { Title } from "@mantine/core"
import React from "react"
import useGetFollowersAndFollowings from "../../../hooks/useGetFollowersAndFollowings"
import FollowingCard from "../FollowingCard"

const FollowingModal = () => {
	const follows = useGetFollowersAndFollowings()

	return (
		<>
			<Title order={4} className="mb-4">
				People that you follow
			</Title>
			<div className="flex flex-col gap-2">
				{follows?.followings.map((following) => (
					<FollowingCard following={following} key={following.user_id} />
				))}
			</div>
		</>
	)
}

export default FollowingModal
