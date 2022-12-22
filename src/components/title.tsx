import React from "react";
import { HStack, Image, Heading, Box, Spacer } from '@chakra-ui/react';


export const Title = () => {
    // Attributes
    // Methods
    // Component
    return (
        <HStack>
            <Box w='15px' />
            <Image
            src='https://i.ibb.co/3kmQ59f/memoji-guino.webp'
            alt='facundo-carballo-img'
            boxSize='50px'
            />
            <Spacer />
            <Heading>ERC20 Payments</Heading>
            <Box w='15px' />
        </HStack>
    );
}
