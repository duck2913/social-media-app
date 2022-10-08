import React from "react"
import Following from "./Following"
import Info from "./Info"
import SearchBar from "./SearchBar"

const LeftPanel = () => {
	return (
		<div className="flex flex-col gap-5 p-4">
			<SearchBar />
			<Info />
			<Following />
		</div>
	)
}

export default LeftPanel
