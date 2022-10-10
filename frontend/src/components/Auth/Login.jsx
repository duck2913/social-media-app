import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Loader } from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"

const Login = () => {
	const nameRef = useRef()
	const passwordRef = useRef()
	const [msg, setMsg] = useState("")
	const navigate = useNavigate()

	const [cookies, setCookie] = useCookies(["token"])

	const { mutate, isLoading, isError } = useMutation(
		(data) => {
			return axios.post("http://localhost:4000/auth/login", data)
		},
		{
			onSuccess: (data) => {
				const token = data.data.token
				console.log("🚀 -> file: Login.jsx -> line 21 -> token", token)
				setCookie("token", token)
				navigate("/")
			},
			onError: (error) => {
				setMsg(error.response.data)
			},
		},
	)

	function handleLogin(e) {
		e.preventDefault()
		const name = nameRef.current.value
		const password = passwordRef.current.value
		mutate({ name, password })
	}

	return (
		<div className="h-screen flex flex-col justify-center items-center bg-gray-100">
			<form className="form bg-white p-5 rounded-xl px-20" onSubmit={handleLogin}>
				{isLoading && <Loader />}
				<h1 className="text-xl font-semibold text-blue-500 mb-10">Login</h1>
				{isError && <p className="text-red-400">{msg}</p>}
				<p className="mb-1">Name</p>
				<input
					type="text"
					ref={nameRef}
					className="border-blue-200 border-[2px] rounded-md px-2 mb-5 focus:outline-none focus:border-blue-500 w-full"
				/>
				<p className="mb-1">Password</p>
				<input
					type="password"
					ref={passwordRef}
					className="border-blue-200 border-[2px] rounded-md px-4 mb-8 focus:outline-none focus:border-blue-500 w-full"
				/>
				<button className="mx-auto block font-semibold bg-indigo-500 py-1 px-3 text-white rounded-md">
					Login
				</button>
				<p className="text-sm text-gray-500 mt-3 text-center">
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
