async function main() {
  const [owner, randomUser] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy();
  await domainContract.deployed();
  console.log("contract deployed to:", domainContract.address);
  console.log("contract deployed by:", owner.address);
  const txn = await domainContract.register("hello");
  await txn.wait();
  const domainOwner = await domainContract.getAddress("hello");
  console.log("owner of domain:",domainOwner);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
