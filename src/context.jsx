import React from "react";
import { loadDappData } from "./web3/funcs";

const DappContext = React.createContext(null);

export const DappProvider = (props) => {
  const [wallet, setWallet] = React.useState(null);
  const [ContractAcceptERC20, setContractAcceptERC20] = React.useState(null);
  const [ContractERC20, setContractERC20] = React.useState(null);
  const [isActive, setIsActive] = React.useState(null);
  const [daysToEndPeriod, setDaysToEndPeriod] = React.useState(null);
  const [rewardDev1, setRewardDev1] = React.useState(null);
  const [rewardDev2, setRewardDev2] = React.useState(null);

  // Pop up
  const [isOpenPopUp, setIsOpenPopUp] = React.useState(false);
  const onClosePopUp = () => setIsOpenPopUp(false);
  const onOpenPopUp = () => setIsOpenPopUp(true);
  const cancelRef_PopUp = React.useRef(null);

  const setAllValues = async () => {
    const data = await loadDappData();
    setWallet(data.wallet);
    setContractAcceptERC20(data.ContractAcceptERC20);
    setContractERC20(data.ContractERC20);
    setIsActive(data.isActive);
    setDaysToEndPeriod(data.daysToEndPeriod);
    setRewardDev1(data.rewardDev1);
    setRewardDev2(data.rewardDev2);
  };

  const values = {
    wallet,
    setWallet,
    ContractAcceptERC20,
    setContractAcceptERC20,
    ContractERC20,
    setContractERC20,
    isActive,
    setIsActive,
    daysToEndPeriod,
    setDaysToEndPeriod,
    isOpenPopUp,
    onClosePopUp,
    onOpenPopUp,
    cancelRef_PopUp,
    setAllValues,
    rewardDev1,
    rewardDev2
  };

  return <DappContext.Provider value={values} {...props} />;
};

export const useProvider = () => {
  const context = React.useContext(DappContext);
  if (!context) throw new Error("useProvider has to be inside of the provider");
  return context;
};
