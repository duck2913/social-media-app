import "./App.css"

import FeedsPanel from "./components/FeedsPanel"
import RightPanel from "./components/RightPanel/RightPanel"
import LeftPanel from "./components/LeftPanel/LeftPanel"

function App() {
	return (
		<div className="App bg-gray-200">
			<div className="blur top-[3rem] right-[4rem] bg-sky-200"></div>
			<div className="blur bottom-0 bg-pink-200"></div>
			<LeftPanel />
			<FeedsPanel />
			<RightPanel />
		</div>
	)
}

export default App
