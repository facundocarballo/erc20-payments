import React from "react";
import { Box } from '@chakra-ui/react';
import { NavBar } from '../src/sub_pages/navbar';
import { ClaimReward } from "../src/sub_pages/claimReward";

const Admin = () => {
    // Attributes
    // Methods
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