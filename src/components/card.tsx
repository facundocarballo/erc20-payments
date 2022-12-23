import React from "react";
import { ConnectWallet } from "./connectWallet";
import { useProvider } from "../context";
import { UserCard } from "./userCard";

export const Card = () => {
  // Attributes
  const { wallet } = useProvider();

  // Methods

  // Component
  return wallet == null ? <ConnectWallet /> : <UserCard />;
};
