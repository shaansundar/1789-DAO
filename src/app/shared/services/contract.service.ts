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

  public async wipeBalance(){
    await this.DAOInterface.wipeBalance();
  }
}
