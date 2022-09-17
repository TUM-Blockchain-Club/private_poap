import { ethers } from 'ethers';

export function InitWallet() {
    let masterWallet = ethers.Wallet.createRandom();

    localStorage.setItem('masterWallet', JSON.stringify(masterWallet));
}