import React from "react";
import { HStack, Spacer, Box } from '@chakra-ui/react';
import { Title } from "../components/title";
import { Card } from "../components/card";

export const NavBar = () => {
    // Attributes
    // Methods
    // Component
    return(
        <>
        <Box h='10px' />
        <HStack w='full' >
            <Title />
            <Spacer />
            <Card />
        </HStack>
        </>
    );
};