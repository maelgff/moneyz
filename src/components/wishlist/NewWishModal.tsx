import {
	Box,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Heading,
	FormControl,
	FormLabel,
	Input,
	Button,
	Flex,
} from '@chakra-ui/react'
import pb from 'src/lib/pocketbase'
import { useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { Wish } from './Wishlist'

interface Props {
	isOpen: boolean
	onClose: () => void
	fetchWishes: () => void
}

export const NewWishModal: React.FC<Props> = ({ onClose, isOpen, fetchWishes }) => {
	const [newWish, setNewWish] = useState<Wish>({
		price: '',
		brand: '',
		image_width: 0,
		image_height: 0,
		product_link: '',
		image: null,
	})
	const toast = useToast()

	const addWish = async () => {
		await pb.collection('wishes').create(newWish)
		await fetchWishes()
		onClose()
		toast({
			title: 'Wish created',
			description: 'Wish has been created',
			status: 'success',
			duration: 9000,
			isClosable: true,
		})
	}

	return (
		<Modal onClose={onClose} isOpen={isOpen} isCentered size='sm'>
			<ModalOverlay />
			<ModalContent maxW='700px'>
				<ModalCloseButton />
				<ModalBody p='25px'>
					<Box bg='#fff' borderRadius='6px' display='flex' alignItems='center' flexDir='column'>
						<Heading fontFamily='fantasy'>Add wish</Heading>
						<Flex flexDir='column'>
							<FormControl>
								<FormLabel>Brand</FormLabel>
								<Input
									type='text'
									onChange={(e) => setNewWish({ ...newWish, brand: e.target.value })}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Price</FormLabel>
								<Input
									type='number'
									onChange={(e) => setNewWish({ ...newWish, price: e.target.value })}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Product link</FormLabel>
								<Input
									type='text'
									onChange={(e) => setNewWish({ ...newWish, product_link: e.target.value })}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Image</FormLabel>
								<Input
									type='file'
									onChange={(e) =>
										setNewWish({ ...newWish, image: (e.target.files && e.target.files[0]) ?? null })
									}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Image width</FormLabel>
								<Input
									type='number'
									onChange={(e) =>
										setNewWish({ ...newWish, image_width: parseInt(e.target.value) })
									}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Image height</FormLabel>
								<Input
									type='number'
									onChange={(e) =>
										setNewWish({ ...newWish, image_height: parseInt(e.target.value) })
									}
								/>
							</FormControl>
							<Button
								bg='#00be82'
								mt='15px'
								colorScheme='green'
								onClick={() => addWish()}
								isDisabled={newWish.brand === '' || newWish.image === null || newWish.price === '0'}
							>
								Submit
							</Button>
						</Flex>
					</Box>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
