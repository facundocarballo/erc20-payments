import React from "react";
import { HStack, VStack, Box, Image, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { useProvider } from "../context";

export const UserCard = () => {
  // Attributes
  const { onOpenPopUp, isActive, daysToEndPeriod } = useProvider();
  const bg = useColorModeValue('gray.300', 'gray.600');
  
  // Methods
  // Component
  return (
    <HStack>
      <VStack>
        <HStack bg={bg} borderRadius={6} h="40px">
          <Box w="10px" h="10px" />
          <Image
            src="https://i.ibb.co/mBDyGt0/user.png"
            alt="user"
            boxSize="30px"
          />
          <Box
            display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
            w="10px"
          />
          <Text display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}>
            {isActive || daysToEndPeriod > 0 ? 'Premiun' : 'Free Version'}
          </Text>
          <Button bg={bg} onClick={onOpenPopUp}>
            <Image
              src="https://i.ibb.co/bLVdtB9/upgrade-yellow.png"
              alt="upgrade"
              boxSize="30px"
            />
          </Button>
        </HStack>
      </VStack>
      <Box w="10px" />
    </HStack>
  );
};
