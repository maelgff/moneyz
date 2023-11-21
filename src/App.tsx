import { Box, SimpleGrid } from "@chakra-ui/react";
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
      <SimpleGrid columns={4} spacing={10}>
        {cards.map((card: CardType) => {
          return (
            <CustomCard key={`card-${card.brand}-${card.price}`} card={card} />
          );
        })}
      </SimpleGrid>
    </Box>
  );
};
