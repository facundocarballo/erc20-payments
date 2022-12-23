import React from "react";
import { HStack, Box, Image, Text, Button, Spinner } from "@chakra-ui/react";
import { loadDappData } from "../web3/funcs";
import { useProvider } from "../context";

export const ConnectWallet = () => {
  // Attributes
  const { setAllValues } = useProvider();
  const [loading, setLoading] = React.useState(false);
  // Methods
  const handleConnect = async () => {
    setLoading(true);
    setAllValues();
    setLoading(false);
  };
  // Component
  return (
    <>
      {loading ? (
        <HStack>
          <Box w="10px" />
          <Spinner />
          <Box w="10px" />
        </HStack>
      ) : (
        <HStack>
          <Button bg="gray.600" onClick={handleConnect}>
            <HStack>
              <Box w="10px" h="10px" />
              <Image
                src="https://i.ibb.co/jgR5nn6/wallet.png"
                alt="user"
                boxSize="30px"
              />
              <Box w="10px" />
              <Text>Connect Wallet</Text>
              <Box w="10px" />
            </HStack>
          </Button>
          <Box w="10px" />
        </HStack>
      )}
    </>
  );
};
