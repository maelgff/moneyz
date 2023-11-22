import {
  Box,
  SimpleGrid,
  Card,
  Image,
  Text,
  Avatar,
  Wrap,
  WrapItem,
  Heading,
} from "@chakra-ui/react";
import { CustomCard } from "./components/Card";
import { cards } from "./constants/cardsList";

export interface CardType {
  brand: string;
  price: string;
  width: string;
  height: string;
  linkToProduct: string;
  image: string;
  position: string;
}

export const CaptionCarousel = () => {
  return (
    <Box
      position={"relative"}
      maxWidth="1100px"
      p="0px 20px"
      margin="0px auto"
      pos="static"
    >
      <Wrap padding="10px">
        <WrapItem display="flex" alignItems="center">
          <Avatar
            h="100px"
            w="100px"
            borderRadius="50px"
            name="Mael Geoffroy"
            src="https://media.licdn.com/dms/image/C4E03AQGeCUI2mns8eg/profile-displayphoto-shrink_800_800/0/1610457590736?e=2147483647&v=beta&t=5F6zrL3r5KuFmftpE10sUWFXPRbJHGPQ43I774mrE18"
          />
          <Heading
            fontSize="30px"
            fontFamily="circular"
            fontWeight={"300"}
            marginLeft={20}
            color="#6b6b6b"
          >
            Mael's wishlist
          </Heading>
        </WrapItem>
      </Wrap>
      <SimpleGrid columns={4} spacing={10}>
        <Card float="left" cursor="pointer" padding="10px">
          <Box borderRadius="10px" bg="#efefef" height="220px" display="flex">
            <Image
              src="https://d18kyikiamq6s1.cloudfront.net/7b7a459f-02a0-4553-9262-c3f111e77a0e/images/plus.png"
              margin="0px auto"
              marginTop="87px"
              cursor="pointer"
              w="46px"
              h="46px"
            />
          </Box>
          <Text opacity={0.4} fontSize={18} fontFamily="circular">
            Add wish
          </Text>
        </Card>
        {cards.map((card: CardType) => {
          return (
            <CustomCard key={`card-${card.brand}-${card.price}`} card={card} />
          );
        })}
      </SimpleGrid>
    </Box>
  );
};
