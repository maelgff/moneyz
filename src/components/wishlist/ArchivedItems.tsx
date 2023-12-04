import { Heading, SimpleGrid } from '@chakra-ui/react'
import { RecordModel } from 'pocketbase'
import { CustomCard } from './Card'

interface Props {
	wishes: RecordModel[] | undefined
	setActiveCard: (card: RecordModel) => void
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
			<SimpleGrid columns={4} spacing={10}>
				{wishes
					?.filter((card: RecordModel) => card.is_purchased)
					.map((card: RecordModel) => {
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
