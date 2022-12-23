import React from "react";
import { VStack } from '@chakra-ui/react';
import { ButtonUpgrade } from "./buttonUpgrade.jsx";
import { useProvider } from '../context';
import { Addresses, buildTransaciont, toWei } from "../web3/funcs";

export const UpgradeToPro = () => {
    // Attributes
    const { ContractAcceptERC20, wallet } = useProvider();

    // Methods

    const getPermanentParams = async () => {
        const amount_wei = toWei("50", "ether");
        const data = await ContractAcceptERC20.methods.singlePay(amount_wei).encodeABI();
        const params = await buildTransaciont(wallet, Addresses.acceptERC20, data);

        return params;
    };

    const getMonthlyParams = async () => {
        const amount_wei = toWei("1", "ether");
        const data = await ContractAcceptERC20.methods.monthlyPay(amount_wei).encodeABI();
        const params = await buildTransaciont(wallet, Addresses.acceptERC20, data);

        return params;
    };

    // Component
    return (
        <VStack w='full'>
            <ButtonUpgrade title="4LIFE" amount="50" func={getPermanentParams}/>
            <ButtonUpgrade title="MONTHLY" amount="1" func={getMonthlyParams} />
        </VStack>
    );
};