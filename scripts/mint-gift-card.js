const hre = require("hardhat");

async function main() {
  const contractAddress = "0xd347B87e021D9597653B572715Fc9bD3901Db70f";
  const [signer] = await hre.ethers.getSigners();
  
  console.log("Minting gift card with account:", signer.address);
  
  // Get the contract instance
  const GiftCard = await hre.ethers.getContractFactory("GiftCard");
  const giftCard = GiftCard.attach(contractAddress);
  
  // Set gift card parameters
  const to = signer.address; // Recipient address (using the signer's address)
  const price = hre.ethers.parseEther("0.1"); // 0.1 ETH
  const expiryDate = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60; // 1 year from now
  
  console.log("Minting gift card with price:", hre.ethers.formatEther(price), "ETH");
  console.log("Expiry date:", new Date(expiryDate * 1000).toLocaleString());
  
  // Mint the gift card
  const tx = await giftCard.mint(to, price, expiryDate);
  console.log("Transaction hash:", tx.hash);
  
  // Wait for the transaction to be mined
  const receipt = await tx.wait();
  console.log("Transaction confirmed in block:", receipt.blockNumber);
  
  // Get the token ID from the event
  const event = receipt.logs.find(log => log.fragment && log.fragment.name === "GiftCardMinted");
  if (event) {
    const tokenId = event.args[1];
    console.log("Gift card minted with token ID:", tokenId.toString());
    
    // Get gift card details
    const details = await giftCard.getGiftCardDetails(tokenId);
    console.log("Gift card details:", {
      price: hre.ethers.formatEther(details[0]),
      expiryDate: new Date(Number(details[1]) * 1000).toLocaleString(),
      isUsed: details[2]
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 