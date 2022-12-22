import React from "react";
import { VStack, Button, Spacer, Box, Text, HStack } from '@chakra-ui/react';

export const ButtonUpgrade = ({title, buttonText, func}: {title: string, buttonText: string, func: () => void}) => {
    // Attributes
    // Methods
    // Component
    return (

        <HStack w='full' bg='gray.600' borderRadius={6}>
            <Box w='10px' />
            <Text>{title}</Text>
            <Spacer />
            <Button
            w='100px'
            onClick={func}
            bg='blue.400'
            >
                {buttonText}
            </Button>
        </HStack>
    );
};