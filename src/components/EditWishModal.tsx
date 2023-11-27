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
import { CardType } from './Homepage'
import { RecordModel } from 'pocketbase'

interface Props {
	wish: RecordModel | undefined
	isOpen: boolean
	onClose: () => void
	fetchWishes: () => void
}

export const EditWishModal: React.FC<Props> = ({ wish, onClose, isOpen, fetchWishes }) => {
	const [wishUpdated, setWishUpdated] = useState<CardType>({
		price: wish?.price,
		brand: wish?.brand,
		image_width: wish?.image_width,
		image_height: wish?.image_height,
		product_link: wish?.product_link,
	})
	const toast = useToast()

	const updateWish = async () => {
		if (!wish) return
		await pb.collection('wishes').update(wish?.id, wishUpdated)
		await fetchWishes()
		onClose()
		toast({
			title: 'Wish updated',
			description: 'Wish has been updated',
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
						<Heading fontFamily='fantasy'>Update wish</Heading>
						<Flex flexDir='column'>
							<FormControl>
								<FormLabel>Brand</FormLabel>
								<Input
									type='text'
									defaultValue={wish?.brand}
									onChange={(e) => setWishUpdated({ ...wishUpdated, brand: e.target.value })}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Price</FormLabel>
								<Input
									type='number'
									defaultValue={wish?.price}
									onChange={(e) => setWishUpdated({ ...wishUpdated, price: e.target.value })}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Product link</FormLabel>
								<Input
									type='text'
									defaultValue={wish?.product_link}
									onChange={(e) => setWishUpdated({ ...wishUpdated, product_link: e.target.value })}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Image</FormLabel>
								<Input
									type='file'
									onChange={(e) =>
										setWishUpdated({
											...wishUpdated,
											image: (e.target.files && e.target.files[0]) ?? null,
										})
									}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Image width</FormLabel>
								<Input
									type='number'
									defaultValue={wish?.image_width}
									onChange={(e) => setWishUpdated({ ...wishUpdated, image_width: e.target.value })}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Image height</FormLabel>
								<Input
									type='number'
									defaultValue={wish?.image_height}
									onChange={(e) => setWishUpdated({ ...wishUpdated, image_height: e.target.value })}
								/>
							</FormControl>
							<Button
								bg='#00be82'
								mt='15px'
								colorScheme='green'
								onClick={() => updateWish()}
								isDisabled={
									wishUpdated.brand === '' ||
									wishUpdated.image === null ||
									wishUpdated.price === '0'
								}
							>
								Update
							</Button>
						</Flex>
					</Box>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
