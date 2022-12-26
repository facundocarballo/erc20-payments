import React from "react";
import {
  VStack,
  HStack,
  Button,
  Heading,
  Text,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { NavBar } from "../src/sub_pages/navbar";
import { FaucetButton } from "../src/components/faucetButton";

const Faucet = () => {
  // Attributes
  // Methods
  // Component
  return (
    <VStack>
      <NavBar />
      <Box h="20px" />
      <Heading>BUSD Faucet</Heading>
      <Box h="20px" />
      <FaucetButton />
    </VStack>
  );
};

export default Faucet;
