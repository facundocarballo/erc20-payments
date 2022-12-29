import React from "react";
import {
  HStack,
  Button,
  Spacer,
  Box,
  Text,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { useProvider } from "../context";
import { AlertConnectWallet } from "../components/AlertConnectWallet";
import { Addresses, buildTransaciont } from "../web3/funcs";

export const FaucetButton = () => {
  // Attributes
  const { wallet, ContractFaucet, canClaimFaucet, setAllValues } = useProvider();
  const [loading, setLoading] = React.useState(false);
  // Methods
  const handleFaucet = async () => {
    const data = await ContractFaucet.methods.claim().encodeABI();
    const params = await buildTransaciont(wallet, Addresses.faucet, data);
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        console.log("Transaction Hash: ", res);
        setLoading(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (rec) {
              clearInterval(interval);
              setAllValues().then(() => {
                setLoading(false);
              });
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
      ) : loading ? (
        <Spinner />
      ) : (
        <Button
          bg="blue.400"
          onClick={handleFaucet}
          isDisabled={!canClaimFaucet}
        >
          Receive 15 BUSD
        </Button>
      )}
      {canClaimFaucet != null && !canClaimFaucet ? (
        <Text>
          You already claim your 15 BUSD daily, try it later or with other
          wallet
        </Text>
      ) : null}
      <Link isExternal href="https://goerlifaucet.com/">
        <Text color="blue.300">
          {"Don't have enought ETH, go to the Goerli Faucet."}
        </Text>
      </Link>
    </>
  );
};
