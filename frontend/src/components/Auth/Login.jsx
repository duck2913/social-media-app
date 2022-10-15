import React, { useRef, useState } from "react"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { useNavigate, Link } from "react-router-dom"
import { Loader } from "@mantine/core"
import { useCookies } from "react-cookie"
import { FcGoogle } from "react-icons/fc"
import { Card, TextInput, Button } from "@mantine/core"
import { useGoogleLogin } from "@react-oauth/google"

const Login = () => {
	const nameRef = useRef()
	const passwordRef = useRef()
	const [msg, setMsg] = useState("")
	const navigate = useNavigate()
	const [, setCookie] = useCookies(["token"])

	function handleLogin(e) {
		e.preventDefault()
		const name = nameRef.current.value
		const password = passwordRef.current.value
		mutate({ name, password })
	}

	const googleLogin = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			const info = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
				headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
			})
			const { email, name, picture } = info.data
			const result = await axios.post(`http://localhost:4000/auth/oauth`, {
				name,
				picture,
				email,
			})
			const { token, user } = result.data
			if (!token) {
				setMsg("please try google login! you have not registered or there is a problem")
				return
			}
			setCookie("token", token)
			localStorage.setItem("user", JSON.stringify(user))
			navigate("/")
		},
	})

	// login for username and password
	const { mutate, isLoading, isError } = useMutation(
		(data) => {
			return axios.post("http://localhost:4000/auth/login", data)
		},
		{
			onSuccess: (data) => {
				const { token, user } = data.data
				setCookie("token", token)
				localStorage.setItem("user", JSON.stringify(user))
				navigate("/")
			},
			onError: (error) => {
				setMsg(error.response.data)
			},
		},
	)

	return (
		<div className="h-screen flex flex-col justify-center items-center">
			<form onSubmit={handleLogin}>
				<Card className="p-5 rounded-xl px-20">
					{isLoading && <Loader />}
					<h1 className="text-xl font-semibold text-blue-500 mb-10">Login</h1>
					{isError && <p className="text-red-400">{msg}</p>}
					<p className="mb-1">Name</p>
					<TextInput
						type="text"
						ref={nameRef}
						className="rounded-md px-2 mb-5 focus:outline-none w-full"
					/>
					<p className="mb-1">Password</p>
					<TextInput
						type="password"
						ref={passwordRef}
						className="rounded-md px-2 mb-8 focus:outline-none w-full"
					/>
					<button className="mx-auto block font-semibold bg-indigo-500 py-1 px-3 text-white rounded-md">
						Login
					</button>
					{/* oauth */}
					<div className="my-4">
						<Button
							variant="light"
							className="mt-3 w-full bg-[#426bb7b4] flex text-center"
							onClick={() => googleLogin()}
						>
							<FcGoogle className="text-[1.2rem]" />
							<p className="ml-3">Sign in with Google</p>
						</Button>
					</div>
					{/*  */}
					<p className="text-sm text-gray-500 mt-3 text-center">
						Don't have an account?{" "}
						<span className="text-blue-400 font-semibold">
							<Link to={"/signup"}>Sign up</Link>
						</span>
					</p>
				</Card>
			</form>
		</div>
	)
}

export default Login
