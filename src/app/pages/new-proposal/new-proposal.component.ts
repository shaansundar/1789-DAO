import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ethers } from 'ethers';
import { ContractService } from 'src/app/shared/services/contract.service';

@Component({
  selector: 'app-new-proposal',
  templateUrl: './new-proposal.component.html',
  styles: [],
})
export class NewProposalComponent implements OnInit {
  public newProposal: FormGroup;
  constructor(private contractAccess: ContractService) {
    this.newProposal = new FormGroup({
      Title: new FormControl(),
      Desc: new FormControl(),
      Amount: new FormControl(),
      Pledge: new FormControl(),
    });
  }

  ngOnInit(): void {}
  // async makeProps(){
  //   console.log("HELLOO MAKEPROPS");
  //   let x = await this.contractAccess.getContract();
  //   let y = await x.makeProposal("Hello2", "TestingHello2", {value: ethers.utils.parseEther("0.01")})
  //   await y.wait();
  // }

  async propose() {
    let x = await this.contractAccess.getContract();
    let y = await x.makeProposal(
      this.newProposal.value.Title,
      this.newProposal.value.Desc,
      ethers.utils.parseEther(this.newProposal.value.Amount),
      {
        value: ethers.utils.parseEther(this.newProposal.value.Pledge),
      }
    );
    await y.wait();
    alert("Proposal Submitted Successfully!")
    this.newProposal.reset();
    window.location.reload();
  }
}
