const hre = require("hardhat");

async function main() {
  const evault = await hre.ethers.deployContract("Evault");

  await evault.waitForDeployment();

  console.log("Deployed contract address : ", evault.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
