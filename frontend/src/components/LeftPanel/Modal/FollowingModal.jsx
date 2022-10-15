import { Title } from "@mantine/core"
import React from "react"
import useFollowersAndFollowings from "../../../hooks/useFollowersAndFollowings"
import FollowingCard from "../FollowingCard"

const FollowingModal = () => {
	const follows = useFollowersAndFollowings()

	return (
		<>
			<Title order={4} className="mb-4">
				People that you follow
			</Title>
			<div className="flex flex-col gap-2">
				{follows?.followings.map((following) => (
					<FollowingCard following={following} />
				))}
			</div>
		</>
	)
}

export default FollowingModal
