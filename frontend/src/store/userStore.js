import { devtools } from "zustand/middleware"
import create from "zustand"

const store = (set) => ({
	user: {},
	followers: [],
	followings: [],
	setUser: (user) => {
		set({ user: user })
	},
	setFollowers: (followers) => {
		set({ followers: followers })
	},
	setFollowings: (followings) => {
		set({ followings: followings })
	},
})

export const useUserStore = create(devtools(store))
