import { Title } from "@mantine/core"
import React from "react"
import { useUserStore } from "../../../store/userStore"
import FollowingCard from "../FollowingCard"

const FollowingModal = () => {
	const followings = useUserStore((state) => state.followings)

	return (
		<>
			<Title order={4} className="mb-4">
				People that you follow
			</Title>
			<div className="flex flex-col gap-2">
				{followings.map((following) => (
					<FollowingCard following={following} />
				))}
			</div>
		</>
	)
}

export default FollowingModal
