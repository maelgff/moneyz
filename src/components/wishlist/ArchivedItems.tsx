import { Heading, SimpleGrid } from '@chakra-ui/react'
import { CustomCard } from './Card'
import { Wish } from './Wishlist'

interface Props {
	wishes: Wish[] | undefined
	setActiveCard: (card: Wish) => void
	onEditOpen: () => void
	onDetailsOpen: () => void
}

export const ArchivedItems: React.FC<Props> = ({
	wishes,
	setActiveCard,
	onEditOpen,
	onDetailsOpen,
}) => {
	return (
		<>
			<Heading as='h4' size='md' mb='10px' mt='20px'>
				Archives
			</Heading>
			<SimpleGrid columns={4} spacing={10} marginBottom='15px'>
				{wishes
					?.filter((card: Wish) => card.is_purchased)
					.map((card: Wish) => {
						return (
							<CustomCard
								key={`card-${card.brand}-${card.price}`}
								card={card}
								setActiveCard={setActiveCard}
								onEditOpen={onEditOpen}
								onDetailsOpen={onDetailsOpen}
							/>
						)
					})}
			</SimpleGrid>
		</>
	)
}
