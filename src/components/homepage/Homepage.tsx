import { Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { Menu } from 'src/components/menu/Menu'
import 'chart.js/auto'
import { useEffect, useState } from 'react'
import pb from 'src/lib/pocketbase'
import { ListResult } from 'pocketbase'
import { ItemBought } from './ItemBought'
import { Wish } from '../wishlist/Wishlist'
import { AmountBox } from './AmountBox'
import { Repartition } from './Repartition'
import { AccountsEvolution } from './AccountsEvolution'

export type Account = {
	id?: string
	account_name?: string
	amount?: number
	last_amount?: number
	bg?: string
	primary_color?: string
	second_color?: string
}

export const Homepage: React.FC<{}> = () => {
	const [itemsBought, setItemsBought] = useState<ListResult<Wish>>()
	const [bankAccounts, setBankAccounts] = useState<ListResult<Account>>()

	useEffect(() => {
		fetchBankAccounts()
		fetchItemsBought()
	}, [])

	const fetchItemsBought = async () => {
		let response = await pb.collection('wishes').getList(1, 50, { filter: 'is_purchased = true' })
		setItemsBought(response)
	}

	const fetchBankAccounts = async () => {
		let response = await pb.collection('accounts').getList(1, 50)
		setBankAccounts(response)
	}

	return (
		<Flex>
			<Menu />
			<Grid
				h='200px'
				templateRows='repeat(2, 1fr)'
				templateColumns='repeat(6, 1fr)'
				gap={0}
				w='100%'
				minH='100vh'
			>
				<GridItem rowSpan={2} colSpan={4} bg='#f8f7f2' p='30px'>
					<Heading as='h3' size='sm' color='#000'>
						Dashboard
					</Heading>
					<Text color='#afb4b2' mb='30px'>
						Payment updates
					</Text>
					<Flex gap={5}>
						{bankAccounts?.items.map((acc: Account) => {
							return <AmountBox key={`account-${acc.id}`} account={acc} />
						})}
					</Flex>
					<Heading color='#000' size='sm' mt='50px' mb='10px'>
						Accounts evolution
					</Heading>
					<Flex>
						<AccountsEvolution bankAccounts={bankAccounts?.items} />
					</Flex>
				</GridItem>
				<GridItem colSpan={2} bg='#fff' p='35px'>
					<Heading size='sm'>Distribution</Heading>
					<Flex p='30px'>
						<Repartition
							bnpAmount={
								bankAccounts?.items.find((acc: Account) => acc.account_name === 'BNP')?.amount ?? 0
							}
							boursoAmount={
								bankAccounts?.items.find((acc: Account) => acc.account_name === 'Bourso')?.amount ??
								0
							}
							naloAmount={
								bankAccounts?.items.find((acc: Account) => acc.account_name === 'Nalo')?.amount ?? 0
							}
						/>
					</Flex>
				</GridItem>
				<GridItem colSpan={2} bg='#f1eee5' p='25px'>
					<Heading size='sm' color='#000'>
						Recent movements
					</Heading>
					{itemsBought?.items.map((card: Wish) => {
						return <ItemBought key={`items-bought-${card.id}`} item={card} />
					})}
				</GridItem>
			</Grid>
		</Flex>
	)
}
