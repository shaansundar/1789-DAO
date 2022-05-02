import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../services/contract.service';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  public contractInterface:any;
  public balance:any;
  constructor(public walletService: WalletService, public contractService: ContractService) { 
  }
  async ngOnInit(){
    await this.getBalance();
  }
  public async getBalance(){
    this.balance = await this.contractService.GetBalance();
  }
}
