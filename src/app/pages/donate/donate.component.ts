import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { ContractService } from 'src/app/shared/services/contract.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styles: [
  ]
})
export class DonateComponent implements OnInit {
  private value: Number;
  constructor(private contractAccess : ContractService) { 
    this.value=0;
  }

  ngOnInit(): void {
  }

  public updateValue(e: any){
    this.value = e.target.value;
  }

  async Donate(){
    let x = await this.contractAccess.getContract();
    let y = await x.donate({
      value: ethers.utils.parseEther(String(this.value))
    });
    await y.wait();
    alert("Thank you for the Donation!")
    window.location.reload();
  }

}
