import { Button, ButtonProps, Flex, useColorMode } from "@chakra-ui/react";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";

export default function ColorModeToggle(props: ButtonProps) {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Flex mt="20px" mr="20px" justifyContent="flex-end" alignItems="center">
			<Button
				aria-label="Toggle Color Mode"
				onClick={toggleColorMode}
				_focus={{ boxShadow: "none" }}
				w="fit-content"
				{...props}
			>
				{colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
			</Button>
		</Flex>
	);
}
