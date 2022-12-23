import React from "react";
import {
  VStack,
  Image,
  Text,
  Button,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import { useProvider } from "../context";
import { AlertConnectWallet } from "../components/AlertConnectWallet";

export const UserCondition = () => {
  // Attributes
  const { isActive, daysToEndPeriod, onOpenPopUp } = useProvider();
  const warnigImage = "https://i.ibb.co/NWJsMJC/warning-red.png";
  const checkImage = "https://i.ibb.co/0JT3GVz/check.png";
  // Methods

  // Componets
  return (
    <>
      {isActive == null ? (
        <AlertConnectWallet />
      ) : (
        <VStack>
          <Box h="10px" />
          <Image
            src={isActive ? checkImage : warnigImage}
            alt="qualified"
            boxSize="200px"
          />
          <Text>
            {isActive
              ? "Congrats!!! You are a PRO!!"
              : "Ups!! You are not a PRO. :("}
          </Text>
          {isActive && daysToEndPeriod > 0 ? (
            <Slider value={daysToEndPeriod*100/30} h="100px" w="250px">
              <SliderTrack bg="white" h="50px" borderRadius={8}>
                <SliderFilledTrack bg="blue.300" />
                <VStack w="full" h="full" position="absolute">
                  <Spacer />
                  <HStack w="full">
                    <Box w="25%" />
                    <Text color="black" fontWeight="bold">
                      Expires in {daysToEndPeriod} days
                    </Text>
                  </HStack>
                  <Spacer />
                </VStack>
              </SliderTrack>
            </Slider>
          ) : (
            isActive ? 
            <Text>
              You are a real PRO! Your PRO Membership is forever.
            </Text> :
            <Button onClick={onOpenPopUp} bg="yellow.400">
              UPGRADE TO PRO
            </Button>
          )}
        </VStack>
      )}
    </>
  );
};
