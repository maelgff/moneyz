import {
	Box,
	SimpleGrid,
	Card,
	Image,
	Text,
	Avatar,
	Flex,
	Wrap,
	WrapItem,
	Heading,
	useDisclosure,
} from '@chakra-ui/react'
import { CustomCard } from 'src/components/wishlist/Card'
import { ListResult, RecordModel } from 'pocketbase'
import { useEffect, useState } from 'react'
import pb from 'src/lib/pocketbase'
import { DetailsModal } from './DetailsModal'
import { ArchivedItems } from './ArchivedItems'
import { NewWishModal } from './NewWishModal'
import { EditWishModal } from './EditWishModal'
import { Menu } from '../menu/Menu'

export interface CardType {
	brand: string
	price: string
	image_width: string
	image_height: string
	product_link: string
	image?: File | null
}

export const Wishlist: React.FC<{}> = () => {
	const [wishes, setWishes] = useState<ListResult<RecordModel>>()
	const [activeCard, setActiveCard] = useState<RecordModel>()
	const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
	const { isOpen: isNewOpen, onOpen: onNewOpen, onClose: onNewClose } = useDisclosure()
	const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure()

	useEffect(() => {
		fetchWishes()
	}, [])

	const fetchWishes = async () => {
		let response = await pb.collection('wishes').getList(1, 50)
		response = await response
		setWishes(response)
	}

	return (
		<Flex>
			<Menu />
			<Box
				position={'relative'}
				w='100%'
				p='0px 20px'
				pos='static'
				maxH='100vh'
				overflow={'scroll'}
			>
				<Wrap padding='10px'>
					<WrapItem display='flex' alignItems='center'>
						<Avatar
							h='100px'
							w='100px'
							borderRadius='50px'
							name={pb.authStore?.model?.username}
							src={`${import.meta.env.VITE_PB_URL}/api/files/users/${pb.authStore?.model?.id}/${pb
								.authStore?.model?.avatar}`}
						/>
						<Heading
							fontSize='30px'
							fontFamily='circular'
							fontWeight={'300'}
							marginLeft={'20px'}
							color='#6b6b6b'
						>
							{pb.authStore?.model?.username}'s wishlist
						</Heading>
					</WrapItem>
				</Wrap>
				<SimpleGrid columns={4} spacing={10}>
					<Card
						float='left'
						maxW='265px'
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
									onDetailsOpen={onDetailsOpen}
									onEditOpen={onEditOpen}
								/>
							)
						})}
				</SimpleGrid>
				<ArchivedItems
					wishes={wishes?.items}
					onDetailsOpen={onDetailsOpen}
					onEditOpen={onEditOpen}
					setActiveCard={setActiveCard}
				/>
				<DetailsModal
					card={activeCard}
					isOpen={isDetailsOpen}
					onClose={onDetailsClose}
					fetchWishes={fetchWishes}
				/>
				<NewWishModal isOpen={isNewOpen} onClose={onNewClose} fetchWishes={fetchWishes} />
				<EditWishModal
					wish={activeCard}
					isOpen={isEditOpen}
					onClose={onEditClose}
					fetchWishes={fetchWishes}
				/>
			</Box>
		</Flex>
	)
}
