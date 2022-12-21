import "./App.css"
import FeedsPanel from "./components/FeedsPanel"
import RightPanel from "./components/RightPanel/"
import LeftPanel from "./components/LeftPanel/"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { isExpired } from "react-jwt"

function App() {
	const [cookies] = useCookies(["token"])
	const navigate = useNavigate()

	useEffect(() => {
		if (!cookies.token) navigate("/login")
		const isMyTokenExpired = isExpired(cookies.token)
		isMyTokenExpired && navigate("/login")
	}, [cookies, navigate])

	return (
		<>
			<div className="App ">
				<div className="blur top-[3rem] right-[4rem] bg-sky-400"></div>
				<div className="blur bottom-0 bg-pink-700"></div>
				{/* main */}
				<LeftPanel />
				<FeedsPanel />
				<RightPanel />
			</div>
		</>
	)
}

export default App
