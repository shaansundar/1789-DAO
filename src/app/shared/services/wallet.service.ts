import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
declare const window: any;

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  public signer: any;
  public provider: any;
  public walletAddress: any;
  public balance: Number | undefined;
  public slicedBalance: Number | undefined;
  public isWalletConnected: boolean = false;


  constructor() {}
  public async connectWallet() {
    if (window.ethereum) {
      window.ethereum.enable();
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
      }
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();
      this.walletAddress = await this.signer.getAddress();
      this.balance = await this.signer.getBalance()
      this.slicedBalance = Number(String((await this.signer.getBalance())/10**18).slice(0,6));
      this.isWalletConnected = true;
    } else {
      alert('Please install Metamask!');
    }
  }
}