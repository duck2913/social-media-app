import React from "react"
import Trends from "./Trends"
import Suggest from "./Suggest"

const RightPanel = () => {
	return (
		<div className="h-[100vh] p-4">
			<Trends />
			<Suggest />
		</div>
	)
}

export default RightPanel
