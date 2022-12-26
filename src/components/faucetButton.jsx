import React from "react";
import { HStack, Button, Spacer, Box, Text } from "@chakra-ui/react";
import { useProvider } from '../context';
import { AlertConnectWallet } from '../components/AlertConnectWallet';

export const FaucetButton = () => {
  // Attributes
  const { wallet } = useProvider();
  // Methods
  const handleFaucet = async () => {

  };

  // Component
  return (
    <>
        {
            wallet == null ? <AlertConnectWallet /> :
            <Button
            bg='blue.400'
            onClick={handleFaucet}
            >
                Receive 15 BUSD
            </Button>
        }
    </>
  );
};
