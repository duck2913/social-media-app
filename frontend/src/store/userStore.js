import { devtools } from "zustand/middleware"
import create from "zustand"

const store = (set) => ({
	user: {},
	setUser: (user) => {
		set({ user })
	},
})

export const useUserStore = create(devtools(store))
