import { Flex } from '@chakra-ui/react'
import ColorModeToggle from './ColorModeToggle'
import { Menu } from '../menu/Menu'

export const Settings: React.FC<{}> = () => {
	return (
		<Flex>
			<Menu />
			<Flex position='absolute' top='15px' right='15px'>
				<ColorModeToggle />
			</Flex>
		</Flex>
	)
}
