import Web3 from "web3";
import ERC20 from './ABI/ERC20.json';
import AcceptERC20 from './ABI/AcceptERC20.json';

// WEB3 CONFIG
const RPC = "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161" //"https://data-seed-prebsc-1-s1.binance.org:8545/"; //"https://bsc-dataseed.binance.org/";
const ID =  5; // 97; // 56
const Contract = require('web3-eth-contract');
Contract.setProvider(RPC);

export const Addresses = {
    acceptERC20: "0xAB79A38eb344Aa6Fd4807F628B69651e9f09Db0B", //"0xC8c316f83bB17ad954c0725eB267B10cD27efCAD",
    erc20: "0x1027b66cb2Be166A6ABfB12b9cFBBE7a83911151", //"0x2E50a44F2C744E2BcDe025028622d6349115D7Bf",
    dev1: "0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5",
    dev2: "0x0b4e72a8f9920569cA880DA13B88B0210AB5Bf00"
};


// Funcs of Smart Contract
export const loadDappData = async () => {
    await loadWeb3();

    const ContractAcceptERC20 = new Contract(AcceptERC20.output.abi, Addresses.acceptERC20);
    const ContractERC20 = new Contract(ERC20.output.abi, Addresses.erc20);

    const wallet = await ethereum.request({ method: 'eth_coinbase' });

    const isActive = await ContractAcceptERC20.methods.isActive(wallet).call();
    
    const daysToEndPeriod = await getDaysToClosePeriod(ContractAcceptERC20, wallet);

    const rewardDev1_wei = await ContractAcceptERC20.methods.amountToReceive(Addresses.dev1).call();
    const rewardDev2_wei = await ContractAcceptERC20.methods.amountToReceive(Addresses.dev2).call();

    const rewardDev1 = Number(web3.utils.fromWei(rewardDev1_wei, 'ether')).toFixed(2);
    const rewardDev2 = Number(web3.utils.fromWei(rewardDev2_wei, 'ether')).toFixed(2);

    return { wallet, ContractAcceptERC20, 
        ContractERC20, isActive, 
        daysToEndPeriod, rewardDev1, rewardDev2 };
}

const getDaysToClosePeriod = async (ContractAcceptERC20, wallet) => {
    const timestampToClosePeriod = await ContractAcceptERC20.methods.timestampClosePeriod(wallet).call();
    const timestamp_now = await getActualTimestamp();

    if (timestamp_now > timestampToClosePeriod) return 0;

    const timestamp_to_end = timestampToClosePeriod - timestamp_now;
    const days = Math.trunc((timestamp_to_end / (24*60*60)));

    return days;
}

// WEB3 FUNCS

export const toWei = (amount, from) => {
    return web3.utils.toWei(amount, from);
};

export const getActualTimestamp = async () => {
    const currentBlock = await web3.eth.getBlockNumber();

    const block = await web3.eth.getBlock(currentBlock);

    return block.timestamp;
};

export const buildTransaciont = async (addressAccount, to, data) => {
    const nonce = await web3.eth.getTransactionCount(addressAccount);

    const estimateGas = await web3.eth.estimateGas({
        from: addressAccount,
        to: to,
        nonce: nonce,
        data: data
    });

    const gas_price = await web3.eth.getGasPrice();

    return {
        from: addressAccount,
        to: to,
        gas: web3.utils.toHex(estimateGas),
        gasPrice: web3.utils.toHex(gas_price),
        data: data
    };

}

export const loadWeb3 = async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            // await ethereum.enable();
            // Acccounts now exposed
            await ethereum.request({ method: 'eth_requestAccounts' })
        } catch (error) {
            // User denied account access...
            console.log('Error: requiring browser wallet: ', error);
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */ });
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

};

