const { ethers } = require("ethers");
const fs = require("fs");


function exportAddresses(Contract1){ //Pass in interface after deploying the contractFactory
    
    let addresses = {
        "Contract1": Contract1,
    };
    let addressesJSON = JSON.stringify(addresses);
    fs.writeFileSync("env/contractAddress.json", addressesJSON);
}

async function main(){
    const DAOContract = await hre.ethers.getContractFactory("DAO");
    const DAOInterface = await DAOContract.deploy();
    await DAOInterface.deployed();
    exportAddresses(DAOInterface.address)
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });