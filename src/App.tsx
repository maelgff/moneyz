import React from 'react'
import { Box, Button, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import pb from './lib/pocketbase'
import { useLogin } from 'src/hooks/useLogin'
import { Homepage } from './components/Homepage'

type FormValues = {
	email: string
	password: string
}

export const App: React.FC<{}> = () => {
	const isLoggedIn = pb.authStore.isValid
	const { mutate: login, isLoading, isError } = useLogin()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>()

	const onSubmit = async (data: FormValues) => {
		login({ email: data.email, password: data.password })
		reset()
	}

	if (isLoggedIn) return <Homepage />

	return (
		<Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input type='text' placeholder='Email' {...register('email', { required: true })} />
				<Input
					type='password'
					placeholder='Password'
					{...register('password', { required: true })}
				/>
				<Button type='submit' isDisabled={isLoading}>
					{isLoading ? 'Loading...' : 'Login'}
				</Button>
				{(errors?.email || errors?.password) && <span>This field is required</span>}
				{isError && <span>The credentials are wrong</span>}
			</form>
		</Box>
	)
}
