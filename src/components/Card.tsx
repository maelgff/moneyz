import React from 'react'
import { Box, Card, CardHeader, Heading, Image } from '@chakra-ui/react'
import { RecordModel } from 'pocketbase'

interface Props {
	card: RecordModel
	setActiveCard: (card: RecordModel) => void
	onOpen: () => void
}

export const CustomCard: React.FC<Props> = ({ card, setActiveCard, onOpen }) => {
	return (
		<Card float='left' cursor='pointer' padding='10px' shadow='none'>
			<Box
				borderRadius='10px'
				bg='#efefef'
				backgroundSize='cover'
				width='fit-content'
				display='flex'
				alignItems='center'
			>
				<Image
					src={`${import.meta.env.VITE_PB_URL}/api/files/wishes/${card.id}/${card.image}`}
					mixBlendMode='multiply'
					borderRadius='10px'
					cursor='pointer'
					w={card.image_width}
					h={card.image_height}
					onClick={() => {
						onOpen()
						setActiveCard(card)
					}}
				/>
			</Box>
			<Box>
				<CardHeader
					color='#000'
					fontSize='14px'
					fontFamily='circular'
					lineHeight='16px'
					margin={0}
					marginTop='10px'
					marginLeft='5px'
					fontWeight={500}
					padding={0}
				>
					{card.brand}
				</CardHeader>
				<Heading
					opacity={0.5}
					marginLeft='5px'
					marginTop='-2px'
					fontSize='14px'
					fontFamily='circular'
				>
					{card.price} €
				</Heading>
			</Box>
		</Card>
	)
}
