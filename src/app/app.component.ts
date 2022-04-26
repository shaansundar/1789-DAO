import { Component, OnInit } from '@angular/core';
import { WalletService } from './shared/services/wallet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['']
})
export class AppComponent implements OnInit {
  title = 'Angular-Ethers-Hardhat-Template';
  constructor(public walletService : WalletService){}
  async ngOnInit(): Promise<void> {
    await this.walletService.connectWallet();
    console.log(this.walletService.walletAddress)
    this.walletService.walletAddress ? this.walletService.isWalletConnected=true : this.walletService.isWalletConnected=false
  }
}
