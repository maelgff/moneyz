import React from 'react'
import {
	Button,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Text,
	useColorMode,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import pb from './lib/pocketbase'
import { useLogin } from 'src/hooks/useLogin'
import { Homepage } from './components/homepage/Homepage'
import ColorModeToggle from './components/settings/ColorModeToggle'

type FormValues = {
	email: string
	password: string
}

export const App: React.FC<{}> = () => {
	const isLoggedIn = pb.authStore.isValid
	const { colorMode } = useColorMode()
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
		<Flex
			justifyContent='center'
			flexDir='column'
			align='center'
			minH='100vh'
			w='full'
			bg={
				colorMode === 'light'
					? 'linear-gradient(249.91deg, rgb(255, 248, 244) 0%, rgb(222, 241, 255) 48.96%, rgb(255, 248, 244) 100%)'
					: 'inherit'
			}
		>
			<Heading as='h1' fontSize='5xl' mb={6} fontFamily='circular'>
				Moneyz
			</Heading>
			<ColorModeToggle position='absolute' right='20px' top='20px' />
			<Container maxW='md' w='full' bg='#fff' p={20} borderRadius='base'>
				<Heading
					as='h2'
					color='#000'
					textAlign='center'
					fontSize='22px'
					mb={10}
					fontFamily='circular'
				>
					Login
				</Heading>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl isInvalid={errors.email ? true : false} mt={2}>
						<FormLabel color='#000' fontFamily='circular'>
							Email
						</FormLabel>
						<Input
							type='text'
							borderColor='#e2e8f0'
							color='#000'
							placeholder='Email'
							{...register('email', { required: true })}
						/>
					</FormControl>
					<FormControl isInvalid={errors.password ? true : false} mt={2}>
						<FormLabel color='#000' fontFamily='circular'>
							Password
						</FormLabel>
						<Input
							type='password'
							borderColor='#e2e8f0'
							color='#000'
							placeholder='Password'
							{...register('password', { required: true })}
						/>
					</FormControl>
					{(errors?.email || errors?.password) && (
						<Text data-testid='error' textAlign='left' color='#E53E3E' mt={2}>
							This field is required
						</Text>
					)}
					{isError && (
						<Text data-testid='error' textAlign='left' color='#E53E3E' mt={2}>
							The credentials are wrong
						</Text>
					)}
					<Button type='submit' isDisabled={isLoading} colorScheme='blue' w='full' mt={3}>
						{isLoading ? 'Loading...' : 'Login'}
					</Button>
				</form>
			</Container>
		</Flex>
	)
}
