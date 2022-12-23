import React from "react";
import { VStack, Box, Image, Text } from "@chakra-ui/react";

export const AlertAdmin = () => {
  // Attributes
  // Methods
  // Component
  return (
    <>
      <VStack>
        <Box h="100px" />
        <Image
          src="https://i.ibb.co/df4jZnR/bored-white.png"
          alt="bored"
          boxSize="150px"
        />
        <Text>You are not an Admin.</Text>
      </VStack>
    </>
  );
};
