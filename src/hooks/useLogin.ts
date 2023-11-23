import {useMutation} from "react-query"
import pb from "src/lib/pocketbase"

export const useLogin = () => {
	const login = async ({ email, password}: { email: string; password: string }) => {
		try {
			await pb.collection('users').authWithPassword(email, password)
		} catch (error) {
			console.log(error)
		}
	}
	return useMutation(login)
}