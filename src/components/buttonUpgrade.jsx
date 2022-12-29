import React from "react";
import {
  useColorModeValue,
  Button,
  Spacer,
  Box,
  Text,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { Addresses, buildTransaciont, toWei } from "../web3/funcs";
import { useProvider } from "../context";

export const ButtonUpgrade = ({ title, amount, func }) => {
  // Attributes
  const { ContractERC20, wallet, setAllValues } = useProvider();
  const [isApprove, setIsApprove] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const bg = useColorModeValue('gray.300', 'gray.600');

  // Methods
  const handleApproveERC20 = async () => {
    setLoading(true);
    const amount_wei = toWei(amount, "ether");
    const data = await ContractERC20.methods
      .approve(Addresses.acceptERC20, amount_wei)
      .encodeABI();
    const params = await buildTransaciont(wallet, Addresses.erc20, data);
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
              setIsApprove(true);
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

  const handlePay = async () => {
    const params = await func();
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
      {loading ? (
        <Spinner />
      ) : (
        <HStack w="full" bg={bg} borderRadius={6}>
          <Box w="10px" />
          <Text>{title}</Text>
          <Spacer />
          <Button w="150px" onClick={isApprove ? handlePay : handleApproveERC20} bg="blue.400">
            {isApprove ? 'Pay' : 'Approve'} {amount} BUSD
          </Button>
        </HStack>
      )}
    </>
  );
};
