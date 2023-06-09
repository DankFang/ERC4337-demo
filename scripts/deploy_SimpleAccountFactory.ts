import { ethers } from 'hardhat';

const main = async function () {
  const provider = ethers.provider
  const from = await provider.getSigner().getAddress()

  console.log('==from  addr=', from )

  // 演示EntryPoint
  const EntryPoint = await ethers.getContractFactory("EntryPoint");
  const entryPoint = await EntryPoint.deploy();
  await entryPoint.deployed();

  const simpleAccountFactory = await ethers.getContractFactory("SimpleAccountFactory");
  // 自己动手制作并指定Entry Point合约时，这里
  const ret = await simpleAccountFactory.deploy(entryPoint.address);
  // 使用StackUp的Bundler时，指定StackUp准备的EntryPoint Contract比较稳定。
//   const ret = await simpleAccountFactory.deploy(
//     entryPoint.address,
//     {
//       from,
//       gasLimit: 6e6,
//     });

  console.log('==SimpleAccountFactory addr=', ret.address)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});