import "./App.css"

import Feeds from "./components/Feeds/Feeds"
import RightPanel from "./components/RightPanel/RightPanel"
import LeftPanel from "./components/LeftPanel/LeftPanel"

function App() {
	return (
		<div className="App h-screen overflow-hidden bg-gray-200">
			<div className="blur top-[3rem] right-[4rem] bg-sky-200"></div>
			<div className="blur bottom-0 bg-pink-200"></div>
			<LeftPanel />
			<Feeds />
			<RightPanel />
		</div>
	)
}

export default App
