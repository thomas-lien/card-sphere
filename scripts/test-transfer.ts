const { createPublicClient, createWalletClient, http } = require('viem');
const { sepolia } = require('viem/chains');
const { privateKeyToAccount } = require('viem/accounts');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

// Contract address from environment variables
const contractAddress = process.env.NEXT_PUBLIC_GIFT_CARD_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";

// ABI for the gift card contract
const GIFT_CARD_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "tokenOfOwnerByIndex",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "index", type: "uint256" }
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "transferFrom",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" }
    ],
    outputs: [],
  },
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" }
    ],
    outputs: [],
  },
  {
    name: "ownerOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "address" }],
  }
];

async function main() {
  // Replace these with your actual private keys (for testing only)
  const senderPrivateKey = process.env.SENDER_PRIVATE_KEY;
  const recipientPrivateKey = process.env.RECIPIENT_PRIVATE_KEY;
  
  if (!senderPrivateKey || !recipientPrivateKey) {
    console.error("Please set SENDER_PRIVATE_KEY and RECIPIENT_PRIVATE_KEY in your .env.local file");
    process.exit(1);
  }
  
  // Create accounts from private keys
  const senderAccount = privateKeyToAccount(senderPrivateKey);
  const recipientAccount = privateKeyToAccount(recipientPrivateKey);
  
  console.log(`Sender address: ${senderAccount.address}`);
  console.log(`Recipient address: ${recipientAccount.address}`);
  
  // Create clients
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http()
  });
  
  const senderWalletClient = createWalletClient({
    account: senderAccount,
    chain: sepolia,
    transport: http()
  });
  
  // Check sender's gift card balance
  const senderBalance = await publicClient.readContract({
    address: contractAddress,
    abi: GIFT_CARD_ABI,
    functionName: "balanceOf",
    args: [senderAccount.address],
  });
  
  console.log(`Sender has ${senderBalance} gift cards`);
  
  if (senderBalance === BigInt(0)) {
    console.error("Sender has no gift cards to transfer");
    process.exit(1);
  }
  
  // Get the first gift card token ID owned by the sender
  const tokenId = await publicClient.readContract({
    address: contractAddress,
    abi: GIFT_CARD_ABI,
    functionName: "tokenOfOwnerByIndex",
    args: [senderAccount.address, BigInt(0)],
  });
  
  console.log(`Transferring gift card with token ID: ${tokenId}`);
  
  // Check current owner
  const currentOwner = await publicClient.readContract({
    address: contractAddress,
    abi: GIFT_CARD_ABI,
    functionName: "ownerOf",
    args: [tokenId],
  });
  
  console.log(`Current owner: ${currentOwner}`);
  
  // Approve the recipient to transfer the gift card
  console.log("Approving transfer...");
  const approveHash = await senderWalletClient.writeContract({
    address: contractAddress,
    abi: GIFT_CARD_ABI,
    functionName: "approve",
    args: [recipientAccount.address, tokenId],
  });
  
  console.log(`Approval transaction hash: ${approveHash}`);
  
  // Wait for approval transaction to be mined
  await publicClient.waitForTransactionReceipt({ hash: approveHash });
  console.log("Approval confirmed");
  
  // Transfer the gift card
  console.log("Transferring gift card...");
  const transferHash = await senderWalletClient.writeContract({
    address: contractAddress,
    abi: GIFT_CARD_ABI,
    functionName: "transferFrom",
    args: [senderAccount.address, recipientAccount.address, tokenId],
  });
  
  console.log(`Transfer transaction hash: ${transferHash}`);
  
  // Wait for transfer transaction to be mined
  await publicClient.waitForTransactionReceipt({ hash: transferHash });
  console.log("Transfer confirmed");
  
  // Verify the new owner
  const newOwner = await publicClient.readContract({
    address: contractAddress,
    abi: GIFT_CARD_ABI,
    functionName: "ownerOf",
    args: [tokenId],
  });
  
  console.log(`New owner: ${newOwner}`);
  
  if (newOwner.toLowerCase() === recipientAccount.address.toLowerCase()) {
    console.log("✅ Transfer successful! The gift card NFT now belongs to the recipient.");
  } else {
    console.error("❌ Transfer failed. The gift card NFT was not transferred correctly.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
}); 