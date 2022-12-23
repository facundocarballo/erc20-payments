import React from "react";
import { Box } from '@chakra-ui/react';
import { NavBar } from '../src/sub_pages/navbar';
import { useProvider } from '../src/context';
import { ClaimReward } from "../src/sub_pages/claimReward";

const Admin = () => {
    // Attributes
    const dev1 = "0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5";
    const dev2 = "0x0b4e72a8f9920569cA880DA13B88B0210AB5Bf00";
    
    const { wallet } = useProvider();
    // Methods
    const isAdmin = () => wallet == dev1 || wallet == dev2;

    // Component
    return(
        <>
            <NavBar />
            <Box h='30px' />
            <ClaimReward />
        </>
    )
};

export default Admin;