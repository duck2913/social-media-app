import "./App.css"
import FeedsPanel from "./components/FeedsPanel"
import RightPanel from "./components/RightPanel/RightPanel"
import LeftPanel from "./components/LeftPanel/LeftPanel"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

function App() {
	const [cookies, setCookie] = useCookies(["token"])
	const navigate = useNavigate()

	useEffect(() => {
		if (!cookies.token) navigate("/login")
	}, [cookies, navigate])

	return (
		<div className="bg-gray-100">
			<div className="App ">
				<div className="blur top-[3rem] right-[4rem] bg-sky-200"></div>
				<div className="blur bottom-0 bg-pink-200"></div>
				{/* main */}
				<LeftPanel />
				<FeedsPanel />
				<RightPanel />
			</div>
		</div>
	)
}

export default App
