import { Avatar, Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { Menu } from 'src/components/menu/Menu'
import { Doughnut } from 'react-chartjs-2'
import 'chart.js/auto'
import { useEffect, useState } from 'react'
import { ChartData, ScriptableContext } from 'chart.js/auto'
import pb from 'src/lib/pocketbase'
import { ListResult } from 'pocketbase'
import { ItemBought } from './ItemBought'
import { Wish } from '../wishlist/Wishlist'

export const Homepage: React.FC<{}> = () => {
	const [itemsBought, setItemsBought] = useState<ListResult<Wish>>()
	const [chartData] = useState<ChartData<'doughnut', number[], string>>({
		labels: ['BNP', 'Bourso', 'Nalo'],
		datasets: [
			{
				label: 'Users Gained ',
				data: [1086, 6623, 6105],
				backgroundColor: (context: ScriptableContext<'doughnut'>) => {
					const ctx = context.chart.ctx
					const gradient = ctx.createLinearGradient(0, 0, 0, 200)
					gradient.addColorStop(0, '#c8d0be')
					gradient.addColorStop(1, '#a8eb12')
					if (context.dataIndex === 0) return gradient
					const gradient2 = ctx.createLinearGradient(0, 0, 0, 200)
					gradient2.addColorStop(0, '#ff96cf')
					gradient2.addColorStop(0.25, '#ff919e')
					gradient2.addColorStop(0.5, '#ffa45e')
					gradient2.addColorStop(0.75, '#fec812')
					if (context.dataIndex === 1) return gradient2
					const gradient3 = ctx.createLinearGradient(0, 0, 0, 200)
					gradient3.addColorStop(0, '#051937')
					gradient3.addColorStop(0.5, '#004d7a')
					gradient3.addColorStop(1, '#008793')
					return gradient3
				},
				borderColor: 'black',
				borderWidth: 0,
			},
		],
	})

	useEffect(() => {
		fetchItemsBought()
	}, [])

	const fetchItemsBought = async () => {
		let response = await pb.collection('wishes').getList(1, 50, { filter: 'is_purchased = true' })
		setItemsBought(response)
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
						<Box
							p='15px'
							bg='linear-gradient(to right top, #c8d0be, #c0d89f, #b8df7d, #b0e556, #a8eb12)'
							borderRadius='20px'
							minH='120px'
						>
							<Flex pos='relative'>
								<Text bg='#b8c3a9' p='0px 5px' color='#73875a' borderRadius='6px' fontWeight='bold'>
									€
								</Text>
								<Text ml='8px' fontFamily='circular' fontWeight='600'>
									BNP
								</Text>
								<Text
									bg='#73875a'
									color='#fff'
									ml='15px'
									borderRadius='6px'
									p='0px 5px'
									right={0}
									position='absolute'
								>
									+ 0%
								</Text>
							</Flex>
							<Flex justifyContent='center'>
								<Text fontSize='36px' fontWeight='bold' fontFamily='circular'>
									1 086,82 €
								</Text>
							</Flex>
						</Box>
						<Box
							p='15px'
							bg='linear-gradient(to right top, #ff96cf, #ff919e, #ffa45e, #fec812, #a8eb12)'
							borderRadius='20px'
							minH='120px'
						>
							<Flex pos='relative'>
								<Text bg='#fa83c4' p='0px 5px' color='#e8489f' borderRadius='6px' fontWeight='bold'>
									€
								</Text>
								<Text ml='8px' fontFamily='circular' fontWeight='600'>
									Bourso
								</Text>
								<Text
									bg='#e8489f'
									color='#fff'
									ml='15px'
									borderRadius='6px'
									p='0px 5px'
									right={0}
									position='absolute'
								>
									+ 0%
								</Text>
							</Flex>
							<Flex justifyContent='center'>
								<Text fontSize='36px' fontWeight='bold' fontFamily='circular'>
									6 623,29 €
								</Text>
							</Flex>
						</Box>
						<Box
							p='15px'
							bg='linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)'
							borderRadius='20px'
							minH='120px'
						>
							<Flex pos='relative'>
								<Text bg='#5863ff' p='0px 5px' color='#414ac7' borderRadius='6px' fontWeight='bold'>
									€
								</Text>
								<Text ml='8px' fontFamily='circular' fontWeight='600'>
									Nalo
								</Text>
								<Text
									bg='#414ac7'
									color='#fff'
									ml='15px'
									borderRadius='6px'
									p='0px 5px'
									right={0}
									position='absolute'
								>
									+ 0%
								</Text>
							</Flex>
							<Flex justifyContent='center'>
								<Text fontSize='36px' fontWeight='bold' fontFamily='circular'>
									6 105,29 €
								</Text>
							</Flex>
						</Box>
					</Flex>
				</GridItem>
				<GridItem colSpan={2} bg='#fff' p='35px'>
					<Heading size='sm'>Distribution</Heading>
					<Flex p='30px'>
						<Doughnut
							data={chartData}
							options={{
								responsive: true,
								cutout: 90,
								plugins: {
									title: {
										display: false,
									},
									tooltip: {
										callbacks: {
											label: (context) => `Amount available : ${context.parsed} €`,
										},
									},
									legend: {
										position: 'bottom',
									},
								},
							}}
						/>
					</Flex>
				</GridItem>
				<GridItem colSpan={2} bg='#f1eee5' p='25px'>
					<Heading size='sm' color='#000'>
						Recent movements
					</Heading>
					<Box background='#fff' borderRadius='25px' padding='15px' mt='15px'>
						<Flex flexDir='row'>
							<Avatar
								h='50px'
								w='50px'
								borderRadius='50px'
								src={`https://www.jacquemus.com/dw/image/v2/BJFJ_PRD/on/demandware.static/-/Sites-master-jacquemus/default/dwaddbf626/23H213AC002-5001-990_13.jpg?q=100`}
							/>
							<Flex flexDir='column' ml='20px' minW='60%'>
								<Text fontFamily='circular' fontWeight='600' color='#000'>
									Bob Jacquemus
								</Text>
								<Text fontWeight='300' color='#c0c0c0'>
									05/12/2023
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
								- 110 €
							</Text>
						</Flex>
					</Box>
					{itemsBought?.items.map((card: Wish) => {
						return <ItemBought item={card} />
					})}
				</GridItem>
			</Grid>
		</Flex>
	)
}
