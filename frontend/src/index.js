import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import Signup from "./components/Auth/Signup"
import Login from "./components/Auth/Login"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MantineProvider } from "@mantine/core"
import { CookiesProvider } from "react-cookie"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient()

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/signup",
		element: <Signup />,
	},
	{
		path: "/login",
		element: <Login />,
	},
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
		<CookiesProvider>
			<MantineProvider withGlobalStyles theme={{ colorScheme: "dark" }}>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</MantineProvider>
		</CookiesProvider>
	</GoogleOAuthProvider>,
)
