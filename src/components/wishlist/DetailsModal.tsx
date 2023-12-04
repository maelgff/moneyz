import {
	Box,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	Image,
	ModalOverlay,
	Heading,
	Button,
	Flex,
	Text,
} from '@chakra-ui/react'
import { RecordModel } from 'pocketbase'
import { FaRegCircle, FaRegCheckCircle } from 'react-icons/fa'
import pb from 'src/lib/pocketbase'
import { useToast } from '@chakra-ui/react'

interface Props {
	card: RecordModel | undefined
	isOpen: boolean
	onClose: () => void
	fetchWishes: () => void
}

export const DetailsModal: React.FC<Props> = ({ card, onClose, isOpen, fetchWishes }) => {
	const toast = useToast()

	const archiveItem = async () => {
		if (card?.id) {
			await pb.collection('wishes').update(card?.id, { is_purchased: true })
			await fetchWishes()
			onClose()
			toast({
				title: 'Wish updated',
				description: 'Wish has been purchased',
				status: 'success',
				duration: 9000,
				isClosable: true,
			})
		}
	}

	const unarchiveItem = async () => {
		if (card?.id) {
			await pb.collection('wishes').update(card?.id, { is_purchased: false })
			await fetchWishes()
			onClose()
			toast({
				title: 'Wish updated',
				description: 'Wish has not been purchased',
				status: 'success',
				duration: 9000,
				isClosable: true,
			})
		}
	}

	return (
		<Modal onClose={onClose} isOpen={isOpen} isCentered size='sm'>
			<ModalOverlay />
			<ModalContent maxW='700px'>
				<ModalCloseButton />
				<ModalBody p={0}>
					<Box bg='#fff' borderRadius='6px' display='flex' alignItems='center'>
						<Image
							src={`${import.meta.env.VITE_PB_URL}/api/files/wishes/${card?.id}/${card?.image}`}
							mixBlendMode='multiply'
							borderLeftRadius='6px'
							cursor='pointer'
							w={card?.image_width * 1.5}
							h={card?.image_height * 1.5}
						/>
						<Flex flexDirection='column' padding='50px 30px' w='100%'>
							<Heading mb='5px' fontFamily='fantasy'>
								{card?.brand}
							</Heading>
							<Flex flexDir='row' mt='10px'>
								<Text fontFamily='circular' opacity={0.5}>
									{card?.price} €
								</Text>
								<Text opacity={0.5}>&nbsp;•&nbsp;</Text>
								<Text
									color='#00be82'
									fontWeight={600}
									cursor='pointer'
									onClick={() => window.open(card?.product_link, '_blank')}
								>
									{card?.product_link.slice(0, 25)}
								</Text>
							</Flex>
							<Button
								bg='#00be82'
								mt='15px'
								colorScheme='green'
								onClick={() => window.open(card?.product_link, '_blank')}
							>
								Buy online
							</Button>
							{!card?.is_purchased ? (
								<Button
									mt='15px'
									leftIcon={<FaRegCircle size='20px' />}
									colorScheme='gray'
									display='flex'
									alignItems='center'
									variant='outline'
									onClick={() => archiveItem()}
								>
									Mark as complete
								</Button>
							) : (
								<Button
									mt='15px'
									leftIcon={<FaRegCheckCircle size='20px' />}
									colorScheme='green'
									display='flex'
									alignItems='center'
									onClick={() => unarchiveItem()}
								>
									Unmark as purchased
								</Button>
							)}
						</Flex>
					</Box>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
