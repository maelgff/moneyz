import React from "react";
import { Box, Card, CardHeader, Heading, Image } from "@chakra-ui/react";
import { CardType } from "../App";

interface Props {
  card: CardType;
}

export const CustomCard: React.FC<Props> = ({ card }) => {
  return (
    <Card float="left" w="24%" cursor="pointer" padding="10px">
      <Box
        borderRadius="10px"
        bg="#efefef"
        backgroundSize="cover"
        width="fit-content"
        display="flex"
        alignItems="center"
      >
        <Image
          src={card.image}
          mixBlendMode="multiply"
          borderRadius="10px"
          cursor="pointer"
          w={card.width}
          h={card.height}
          onClick={() => window.open(card.linkToProduct, "_blank")?.focus()}
        />
      </Box>
      <Box>
        <CardHeader
          color="#000"
          fontSize="14px"
          fontFamily="circular"
          lineHeight="16px"
          margin={0}
          marginTop="10px"
          marginLeft="5px"
          fontWeight={500}
        >
          {card.brand}
        </CardHeader>
        <Heading
          opacity={0.5}
          marginLeft="5px"
          marginTop="-2px"
          fontSize="14px"
          fontFamily="circular"
        >
          {card.price}
        </Heading>
      </Box>
    </Card>
  );
};
