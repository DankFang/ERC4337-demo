import { ethers } from 'hardhat';


const main = async function (){
  
  const SimpleAccount = await ethers.getContractFactory("SimpleAccount");
  const simpleAccount= await SimpleAccount.deploy("0xb92A5043479d575c8899b28Ccb5c704e2AF4e753");

  await simpleAccount.deployed();

  console.log(`===  simpleAccount addr: ${simpleAccount.address} ===`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});