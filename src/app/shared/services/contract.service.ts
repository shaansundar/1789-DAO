import { Injectable } from '@angular/core';
import { WalletService } from './wallet.service';
import addresses from '../../../../env/contractAddress.json';
import DAO from '../../../../blockchain/artifacts/blockchain/contracts/Contract.sol/DAO.json';
import { ethers } from 'ethers';
@Injectable({
  providedIn: 'root'
})
export class ContractService {
  public DAOInterface: any;
  constructor(private walletService: WalletService) { 
  }
  
  async getContract(){
  this.DAOInterface = new ethers.Contract(addresses.Contract1, DAO.abi, this.walletService.signer);
  return(this.DAOInterface)
  }

  public async GetBalance(){
    let x = await this.getContract();
    let balance = await x.getBalance();
    balance = String(Number(balance)/10**18);
    return(balance);
  }

  public async wipeBalance(){
    await this.DAOInterface.wipeBalance();
    alert("Wipe Balance Successful");
    window.location.reload();
  }
}
