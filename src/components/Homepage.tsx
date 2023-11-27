import {
	Box,
	SimpleGrid,
	Card,
	Image,
	Text,
	Avatar,
	Wrap,
	WrapItem,
	Heading,
	useDisclosure,
} from '@chakra-ui/react'
import { CustomCard } from 'src/components/Card'
import { ListResult, RecordModel } from 'pocketbase'
import { useEffect, useState } from 'react'
import pb from 'src/lib/pocketbase'
import { useLogout } from 'src/hooks/useLogout'
import { IoMdLogOut } from 'react-icons/io'
import { DetailsModal } from './DetailsModal'
import { ArchivedItems } from './ArchivedItems'
import { NewWishModal } from './NewWishModal'

export interface CardType {
	brand: string
	price: string
	image_width: string
	image_height: string
	product_link: string
	image: File | null
}

export const Homepage: React.FC<{}> = () => {
	const logout = useLogout()
	const [wishes, setWishes] = useState<ListResult<RecordModel>>()
	const [activeCard, setActiveCard] = useState<RecordModel>()
	const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
	const { isOpen: isNewOpen, onOpen: onNewOpen, onClose: onNewClose } = useDisclosure()

	useEffect(() => {
		fetchWishes()
	}, [])

	const fetchWishes = async () => {
		let response = await pb.collection('wishes').getList(1, 50)
		response = await response
		setWishes(response)
	}

	return (
		<Box position={'relative'} maxWidth='1100px' p='0px 20px' margin='0px auto' pos='static'>
			<Box pos='absolute' right={'20px'} top={'20px'} cursor='pointer'>
				<IoMdLogOut size='25px' onClick={() => logout()} color='red'>
					Logout
				</IoMdLogOut>
			</Box>
			<Wrap padding='10px'>
				<WrapItem display='flex' alignItems='center'>
					<Avatar
						h='100px'
						w='100px'
						borderRadius='50px'
						name='Mael Geoffroy'
						src='https://media.licdn.com/dms/image/C4E03AQGeCUI2mns8eg/profile-displayphoto-shrink_800_800/0/1610457590736?e=2147483647&v=beta&t=5F6zrL3r5KuFmftpE10sUWFXPRbJHGPQ43I774mrE18'
					/>
					<Heading
						fontSize='30px'
						fontFamily='circular'
						fontWeight={'300'}
						marginLeft={'20px'}
						color='#6b6b6b'
					>
						Mael's wishlist
					</Heading>
				</WrapItem>
			</Wrap>
			<SimpleGrid columns={4} spacing={10}>
				<Card
					float='left'
					cursor='pointer'
					padding='10px'
					shadow='none'
					_hover={{ background: '#efefef' }}
					onClick={onNewOpen}
					data-group
				>
					<Box
						borderRadius='10px'
						bg='#efefef'
						height='220px'
						display='flex'
						_groupHover={{
							background:
								'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%)',
						}}
					>
						<Image
							src='https://d18kyikiamq6s1.cloudfront.net/7b7a459f-02a0-4553-9262-c3f111e77a0e/images/plus.png'
							margin='0px auto'
							marginTop='87px'
							cursor='pointer'
							w='46px'
							h='46px'
						/>
					</Box>
					<Text opacity={0.4} fontSize={18} fontFamily='circular'>
						Add wish
					</Text>
				</Card>
				{wishes?.items
					.filter((card: RecordModel) => !card.is_purchased)
					.map((card: RecordModel) => {
						return (
							<CustomCard
								key={`card-${card.brand}-${card.price}`}
								card={card}
								setActiveCard={setActiveCard}
								onOpen={onEditOpen}
							/>
						)
					})}
			</SimpleGrid>
			<ArchivedItems wishes={wishes?.items} onOpen={onEditOpen} setActiveCard={setActiveCard} />
			<DetailsModal
				card={activeCard}
				isOpen={isEditOpen}
				onClose={onEditClose}
				fetchWishes={fetchWishes}
			/>
			<NewWishModal isOpen={isNewOpen} onClose={onNewClose} fetchWishes={fetchWishes} />
		</Box>
	)
}
