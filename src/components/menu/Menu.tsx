import { Flex, Box, Heading, Text, Avatar } from '@chakra-ui/react'
import { GiMoneyStack } from 'react-icons/gi'
import { FaChartPie } from 'react-icons/fa'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { SlSettings } from 'react-icons/sl'
import { IoMdLogOut } from 'react-icons/io'
import { useLogout } from 'src/hooks/useLogout'
import { Link } from 'react-router-dom'

export const Menu: React.FC<{}> = () => {
	const logout = useLogout()
	return (
		<Box>
			<Flex
				minW='300px'
				p='30px 25px'
				bg='#2c2c2C'
				flexDirection='column'
				position='static'
				minH='100vh'
				alignItems='center'
			>
				<Flex alignItems='center'>
					<GiMoneyStack color='#fff' size='30px' />
					<Heading as='h3' size='md' color='#fff' ml='6px'>
						Moneyz
					</Heading>
				</Flex>
				<Flex mt='30px' mb='30px'>
					<Avatar
						h='100px'
						w='100px'
						borderRadius='50px'
						name='Mael Geoffroy'
						src='https://media.licdn.com/dms/image/C4E03AQGeCUI2mns8eg/profile-displayphoto-shrink_800_800/0/1610457590736?e=2147483647&v=beta&t=5F6zrL3r5KuFmftpE10sUWFXPRbJHGPQ43I774mrE18'
					/>
				</Flex>
				<Flex mb='15px' flexDir='column' textAlign='center'>
					<Text fontSize='14px' color='#fff' fontFamily='circular' mb='15px'>
						Welcome back,
					</Text>
					<Text fontSize='20px' color='#fff' fontFamily='circular'>
						Mael Geoffroy
					</Text>
				</Flex>
				<Flex mt='40px' flexDir='column'>
					<Link to='/'>
						<Flex alignItems='center' padding='20px'>
							<FaChartPie
								color={window.location.pathname === '/' ? '#7b80e9' : '#fff'}
								size='20px'
							/>
							<Text
								fontSize='18px'
								color={window.location.pathname === '/' ? '#84795b' : '#fff'}
								fontFamily='circular'
								ml='15px'
								fontWeight='600'
							>
								Dashboard
							</Text>
						</Flex>
					</Link>
					<Link to='/wishlist'>
						<Flex alignItems='center' padding='20px'>
							<AiOutlineShoppingCart
								color={window.location.pathname === '/wishlist' ? '#7b80e9' : '#fff'}
								size='22px'
							/>
							<Text
								fontSize='18px'
								color={window.location.pathname === '/wishlist' ? '#84795b' : '#fff'}
								fontFamily='circular'
								ml='15px'
								fontWeight='600'
							>
								Products
							</Text>
						</Flex>
					</Link>
					<Flex alignItems='center' padding='20px'>
						<SlSettings color='#fff' size='22px' />
						<Text fontSize='18px' color='#fff' fontFamily='circular' ml='15px' fontWeight='600'>
							Settings
						</Text>
					</Flex>
					<Flex
						alignItems='center'
						padding='20px'
						onClick={() => logout()}
						bottom='50px'
						position='absolute'
						cursor='pointer'
					>
						<IoMdLogOut color='#fff' size='22px' />
						<Text fontSize='18px' color='#fff' fontFamily='circular' ml='15px' fontWeight='600'>
							Logout
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Box>
	)
}
