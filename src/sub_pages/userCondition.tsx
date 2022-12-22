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

export const UserCondition = () => {
  // Attributes
  const [condition, setCondition] = React.useState(null);
  const warnigImage = "https://i.ibb.co/NWJsMJC/warning-red.png";
  const checkImage = "https://i.ibb.co/0JT3GVz/check.png";
  // Methods

  // Componets
  return (
    <>
      {condition == null ? (
        <VStack>
          <Box h="100px" />
          <Image
            src="https://i.ibb.co/df4jZnR/bored-white.png"
            alt="bored"
            boxSize="150px"
          />
          <Text>Please, connect your wallet.</Text>
        </VStack>
      ) : (
        <VStack>
          <Box h="10px" />
          <Image
            src={condition ? checkImage : warnigImage}
            alt="qualified"
            boxSize="200px"
          />
          <Text>
            {condition
              ? "Congrats!!! You are a PRO!!"
              : "Ups!! You are not a PRO. :("}
          </Text>
          {condition ? (
            <Slider value={30} h="100px" w="250px">
              <SliderTrack bg="white" h="50px" borderRadius={8}>
                <SliderFilledTrack bg="blue.300" />
                <VStack w="full" h="full" position="absolute">
                  <Spacer />
                  <HStack w="full">
                    <Box w="25%" />
                    <Text color="black" fontWeight="bold">
                      Expires in 7 days
                    </Text>
                  </HStack>
                  <Spacer />
                </VStack>
              </SliderTrack>
            </Slider>
          ) : (
            <Button onClick={() => {}} bg="yellow.400">
              UPGRADE TO PRO
            </Button>
          )}
        </VStack>
      )}
    </>
  );
};
