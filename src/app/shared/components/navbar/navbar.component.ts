import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(private contract: ContractService) { }
  
  ngOnInit(): void {
  }

  public async wipeBalance(){
    await this.contract.wipeBalance();
  }

}
