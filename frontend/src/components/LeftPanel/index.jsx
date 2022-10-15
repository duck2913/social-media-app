import React from "react"
import Followers from "./Followers"
import Info from "./Info"
import SearchBar from "./SearchBar"

const LeftPanel = () => {
	return (
		<div className="p-4 h-[100vh] overflow-auto">
			<SearchBar />
			<Info />
			<Followers />
		</div>
	)
}

export default LeftPanel
