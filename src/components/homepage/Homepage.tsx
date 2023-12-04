import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { Menu } from 'src/components/menu/Menu'

export const Homepage: React.FC<{}> = () => {
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
					<Heading as='h3' size='sm'>
						Dashboard
					</Heading>
					<Text color='#afb4b2' mb='30px'>
						Payment updates
					</Text>
					<Flex gap={5}>
						<Box p='15px' bg='#c8d0be' borderRadius='20px' minH='120px'>
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
						<Box p='15px' bg='#ff96cf9c' borderRadius='20px' minH='120px'>
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
						<Box p='15px' bg='#696fc19c' borderRadius='20px' minH='120px'>
							<Flex pos='relative'>
								<Text bg='#5b63d3' p='0px 5px' color='#414ac7' borderRadius='6px' fontWeight='bold'>
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
				<GridItem colSpan={2} bg='#fff' />
				<GridItem colSpan={2} bg='#f1eee5' />
			</Grid>
		</Flex>
	)
}
