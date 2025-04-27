const hre = require("hardhat");

async function main() {
  console.log("Deploying GiftCard contract...");

  const GiftCard = await hre.ethers.getContractFactory("GiftCard");
  const giftCard = await GiftCard.deploy();

  await giftCard.waitForDeployment();

  console.log("GiftCard deployed to:", await giftCard.getAddress());
  console.log("Transaction hash:", giftCard.deploymentTransaction().hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 