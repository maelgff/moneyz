import { Box, Flex, Text } from '@chakra-ui/react'
import { Account } from './Homepage'

interface Props {
	account: Account
}

export const AmountBox: React.FC<Props> = ({ account }) => {
	return (
		<Box p='15px' bg={account.bg} borderRadius='20px' minH='120px' minW='200px'>
			<Flex pos='relative'>
				<Text
					bg={account.second_color}
					p='0px 5px'
					color={account.primary_color}
					borderRadius='6px'
					fontWeight='bold'
				>
					€
				</Text>
				<Text ml='8px' fontFamily='circular' fontWeight='600'>
					{account.account_name}
				</Text>
				<Text
					bg={account.primary_color}
					color='#fff'
					ml='15px'
					borderRadius='6px'
					p='0px 5px'
					right={0}
					position='absolute'
				>
					{account.last_amount && account.amount
						? Math.round((account.amount * 100) / account.last_amount) - 100
						: 0}{' '}
					%
				</Text>
			</Flex>
			<Flex justifyContent='center'>
				<Text fontSize='36px' fontWeight='bold' fontFamily='circular'>
					{account.amount} €
				</Text>
			</Flex>
		</Box>
	)
}
