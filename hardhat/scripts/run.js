async function main() {
  const [owner, randomUser] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("stacex");
  await domainContract.deployed();
  console.log("contract deployed to:", domainContract.address);
  // console.log("contract deployed by:", owner.address);
  // let txn = await domainContract.register("hello");
  // await txn.wait();
  // const domainOwner = await domainContract.getAddress("hello");
  // console.log("owner of domain:",domainOwner);
  // txn = await domainContract.connect(randomUser).setRecord("hello","contract address");
  // await txn.wait();
  let txn = await domainContract.register("immortal", {value: hre.ethers.utils.parseEther("0.1")});
  await txn.wait();
  const address = await domainContract.getAddress("immortal");
  console.log("owner of domain immortal:", address);
  let contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("contract balance:", hre.ethers.utils.formatEther(contractBalance));
  try {
    txn = await domainContract.connect(randomUser).withdraw();
    await txn.wait();
  } catch(error){
    console.log("Could not rob contract");
  }
  let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log("Balance of owner before withdrawal:", hre.ethers.utils.formatEther(ownerBalance));
  txn = await domainContract.connect(owner).withdraw();
  await txn.wait();
  contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
  ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log("Contract balance after withdrawal:", hre.ethers.utils.formatEther(contractBalance));
  console.log("Balance of owner after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
