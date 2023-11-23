import pb from "src/lib/pocketbase"

export const useLogout = () => {

	const logout = () => {
		pb.authStore.clear()
		window.location.reload()
	}
	return logout
}