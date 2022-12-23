import React from "react";
import {
  Spacer,
  VStack,
  Box,
  Heading,
  Button,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import { Addresses, buildTransaciont } from "../web3/funcs";
import { AlertConnectWallet } from "../components/AlertConnectWallet";
import { useProvider } from "../context";
import { AlertAdmin } from "../components/AlertAdmin";

export const ClaimReward = () => {
  // Attributes
  const { wallet, rewardDev1, rewardDev2, ContractAcceptERC20 } = useProvider();
  const [loading, setLoading] = React.useState(false);
  // Methods
  const isAdmin = () =>
    String(wallet).toLowerCase() == Addresses.dev1.toLowerCase() ||
    String(wallet).toLowerCase() == Addresses.dev2.toLowerCase();
  const whichIs = () => {
    if (String(wallet).toLowerCase() == Addresses.dev1.toLowerCase()) return "Dev1";
    if (String(wallet).toLowerCase() == Addresses.dev2.toLowerCase()) return "Dev2";
    return "This wallet is not an Admin...";
  };

  const getReward = () => {
    if (String(wallet).toLowerCase() == Addresses.dev1.toLowerCase()) return rewardDev1;
    if (String(wallet).toLowerCase() == Addresses.dev2.toLowerCase()) return rewardDev2;
    return 0;
  };

  const handleClaimReward = async () => {
    const data = await ContractAcceptERC20.methods.claim().encodeABI();
    const params = await buildTransaciont(wallet, Addresses.acceptERC20, data);
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        console.log("Transaction Hash: ", res);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (rec) {
              clearInterval(interval);
              setLoading(false);
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              console.log("ERROR: ", err);
            }
          });
        }, 500);
      });
  };

  // Component
  return (
    <>
      {wallet == null ? (
        <AlertConnectWallet />
      ) : isAdmin() ? (
        <>
          <HStack w="full">
            <Spacer />
            {/* Mobile */}
            <VStack
              display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
              w="full"
              bg="blue.400"
              borderRadius={6}
            >
              <Heading>Reward ({whichIs()})</Heading>
              <Box w="full" h="5px" bg="gray.700" />
              <Heading>{getReward()} BUSD</Heading>
              {loading ? (
                <Spinner />
              ) : (
                <Button w="full" bg="yellow.400" onClick={handleClaimReward} borderRadius={6}>
                  CLAIM
                </Button>
              )}
            </VStack>

            {/* Desktop */}
            <VStack
              display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
              w="35%"
              bg="blue.400"
              borderRadius={6}
            >
              <Heading>Reward ({whichIs()})</Heading>
              <Box w="full" h="5px" bg="gray.200" />
              <Heading>{getReward()} BUSD</Heading>
              {loading ? (
                <Spinner />
              ) : (
                <Button w="full" bg="yellow.400" onClick={handleClaimReward} borderRadius={6}>
                  CLAIM
                </Button>
              )}
            </VStack>
            <Spacer />
          </HStack>
        </>
      ) : (
        <AlertAdmin />
      )}
    </>
  );
};
