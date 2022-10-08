import React from "react"
import Following from "./Following"
import Info from "./Info"
import SearchBar from "./SearchBar"

const LeftPanel = () => {
	return (
		<div className="p-4 h-[100vh] overflow-auto">
			<SearchBar />
			<Info />
			<Following />
		</div>
	)
}

export default LeftPanel
