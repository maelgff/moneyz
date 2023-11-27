import React from 'react'
import { Box, Card, CardHeader, Heading, IconButton, Image } from '@chakra-ui/react'
import { MdModeEdit } from 'react-icons/md'
import { RecordModel } from 'pocketbase'

interface Props {
	card: RecordModel
	setActiveCard: (card: RecordModel) => void
	onEditOpen: () => void
	onDetailsOpen: () => void
}

export const CustomCard: React.FC<Props> = ({ card, setActiveCard, onEditOpen, onDetailsOpen }) => {
	return (
		<Card
			float='left'
			cursor='pointer'
			padding='10px'
			shadow='none'
			opacity={card?.is_purchased && 0.5}
			_hover={{ background: '#efefef' }}
			data-group
		>
			<Box
				borderRadius='10px'
				bg='#efefef'
				_groupHover={{
					background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%)',
				}}
				backgroundSize='cover'
				width='fit-content'
				display='flex'
				alignItems='center'
			>
				<IconButton
					bg='#fff'
					top='20px'
					right='20px'
					position='absolute'
					zIndex={10}
					icon={<MdModeEdit />}
					aria-label=''
					opacity={0}
					_groupHover={{ opacity: 0.9 }}
					onClick={() => {
						setActiveCard(card)
						onEditOpen()
					}}
				/>
				<Image
					src={`${import.meta.env.VITE_PB_URL}/api/files/wishes/${card.id}/${card.image}`}
					mixBlendMode='multiply'
					borderRadius='10px'
					cursor='pointer'
					w={card.image_width}
					h={card.image_height}
					onClick={() => {
						onDetailsOpen()
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
