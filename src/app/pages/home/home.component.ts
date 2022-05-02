import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/shared/services/contract.service';
import { BigNumber, ethers } from 'ethers';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  public cards: any;
  public contractInterface: any;
  public forLength: any;
  public distanceMap = [];
  public distanceGovMap = [];
  constructor(public contractAccess: ContractService) {
    this.initContractInterface();
  }

  async initContractInterface() {
    this.contractInterface = await this.contractAccess.getContract();
  }

  getDate(i: any) {
    // console.log(i.toNumber())
    var s = new Date(i.toNumber() * 1000);
    return s;
  }

  async ngOnInit(): Promise<void> {
    await this.getProps();

  }

  async getProps() {
    this.cards = await this.contractInterface.getAllProposals();
    // console.log(this.cards);
    this.distanceMap = this.cards.map((item:any)=>{
      return(Number(item.forVotes)/(Number(item.forVotes)+Number(item.againstVotes)))
    })
    this.distanceGovMap = this.cards.map((item:any)=>{
      return(Number(item.forGovVotes)/(Number(item.forGovVotes)+Number(item.againstGovVotes)))
    })
    // console.log(this.distanceMap)
    // console.log(this.distanceGovMap)
  }

  async callFor(i: any) {
    this.contractInterface = await this.contractAccess.getContract();
    console.log('Calling For');
    let tx = await this.contractInterface.voteFor(i, {
      value: ethers.utils.parseEther('1'),
    });
    await tx.wait();
    alert('Vote Successful!');
  }
  async callAgainst(i: any) {
    this.contractInterface = await this.contractAccess.getContract();
    console.log('Calling Against');
    let tx = await this.contractInterface.voteAgainst(i, {
      value: ethers.utils.parseEther('1'),
    });
    await tx.wait();
    alert('Vote Successful!');
  }
}
