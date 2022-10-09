import React, { useRef } from "react"
import { Link } from "react-router-dom"

const Login = () => {
	const nameRef = useRef()
	const passwordRef = useRef()

	function handleLogin() {
		const name = nameRef.current.value
		const password = passwordRef.current.value

		console.log(name, password)
	}

	return (
		<div className="h-screen flex flex-col justify-center items-center">
			<form className="form bg-white p-5 rounded-xl px-20" onSubmit={handleLogin}>
				<h1 className="text-xl font-semibold text-blue-500 mb-10">Login</h1>
				<p className="mb-1">Name</p>
				<input
					type="text"
					ref={nameRef}
					className="border-blue-200 border-[2px] rounded-md px-4 mb-5 focus:outline-none focus:border-blue-500"
				/>
				<p className="mb-1">Password</p>
				<input
					type="password"
					ref={passwordRef}
					className="border-blue-200 border-[2px] rounded-md px-4 mb-8 focus:outline-none focus:border-blue-500"
				/>
				<button className="mx-auto block font-semibold bg-indigo-500 py-1 px-3 text-white rounded-md">
					Login
				</button>
				<p className="text-sm text-gray-500 mt-3">
					Don't have an account?{" "}
					<span className="text-blue-700 font-semibold">
						<Link to={"/signup"}>Sign up</Link>
					</span>
				</p>
			</form>
		</div>
	)
}

export default Login
