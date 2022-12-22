import React from "react";
import { VStack, HStack, Button, Box, Spacer, Text, Heading } from '@chakra-ui/react';
import { ButtonUpgrade } from "./buttonUpgrade";

export const UpgradeToPro = () => {
    // Attributes
    // Methods
    const handleBuyPermanent = () => {};
    const handleBuyMembership = () => {};
    // Component
    return (
        <VStack w='full'>
            <ButtonUpgrade title="4LIFE" buttonText="50 BUSD" func={handleBuyPermanent}/>
            <ButtonUpgrade title="MONTHLY" buttonText="1 BUSD" func={handleBuyMembership} />
        </VStack>
    );
};