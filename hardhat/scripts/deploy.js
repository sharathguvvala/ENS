async function main() {
    const domainContractFactory = await hre.ethers.getContractFactory("Domains");
    const domainContract = await domainContractFactory.deploy("stacex");
    await domainContract.deployed();
    console.log("contract deployed to:", domainContract.address);
    let txn = await domainContract.register("sharath", {value: hre.ethers.utils.parseEther("0.1")});
    await txn.wait();
    const address = await domainContract.getAddress("sharath");
    console.log("owner of domain sharath:", address);
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("contract balance:", hre.ethers.utils.formatEther(balance));
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
});
  
// smart contract address 0xe0242726aBAE75D4E9755Bd1D90E6b2969cFF5c6