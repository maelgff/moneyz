import { Flex, Avatar, Box, Text } from '@chakra-ui/react'
import { Wish } from '../wishlist/Wishlist'

export const ItemBought: React.FC<{ item: Wish }> = ({ item }) => {
	return (
		<Box background='#fff' borderRadius='25px' padding='15px' mt='15px'>
			<Flex flexDir='row'>
				<Avatar
					h='50px'
					w='50px'
					borderRadius='50px'
					src={`${import.meta.env.VITE_PB_URL}/api/files/wishes/${item.id}/${item.image}`}
				/>
				<Flex flexDir='column' ml='20px' minW='60%'>
					<Text fontFamily='circular' fontWeight='600' color='#000'>
						{item?.brand}
					</Text>
					<Text fontWeight='200' color='#c0c0c0'>
						{item.updated ? new Date(item.updated).toLocaleDateString() : '-'}
					</Text>
				</Flex>
				<Text
					display='flex'
					alignItems='center'
					textAlign='right'
					fontWeight='500'
					justifyContent='flex-end'
					fontSize='20px'
					fontFamily='circular'
					width='max-content'
					color='#000'
				>
					- {item.price} €
				</Text>
			</Flex>
		</Box>
	)
}
