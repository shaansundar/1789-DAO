import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ethers } from 'ethers';
import { ContractService } from 'src/app/shared/services/contract.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styles: [
  ],
})
export class DonateComponent implements OnInit {
  private value: Number;
  private addressValue: String = "";
  constructor(private contractAccess: ContractService, private router: Router) {
    this.value = 0;
  }

  ngOnInit(): void {}

  public updateValue(e: any) {
    this.value = e.target.value;
  }
  public updateValueAddress(e: any) {
    this.addressValue = e.target.value;
  }

  async Donate() {
    let x = await this.contractAccess.getContract();
    let y = await x.donate({
      value: ethers.utils.parseEther(String(this.value)),
    });
    await y.wait();
    alert('Thank you for the Donation!');
    window.location.reload();
    this.router.navigate(['/']);
  }
  async Assign() {
    let x = await this.contractAccess.getContract();
    let y = await x.addGovOfficial(this.addressValue);
    await y.wait();
    alert('Address Added as Official!');
    window.location.reload();
  }
}
