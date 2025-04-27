"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@/hooks/use-wallet"
import { useContractRead, useContractWrite } from "wagmi"

// This is a placeholder ABI - you'll need to replace this with your actual contract ABI
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
    name: "getGiftCardDetails",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [
      { name: "price", type: "uint256" },
      { name: "expiryDate", type: "uint256" },
      { name: "isUsed", type: "bool" }
    ],
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
  },
  {
    name: "getApproved",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "address" }],
  }
] as const

interface GiftCard {
  id: string
  name: string
  price: string
  expiryDate: string
  isUsed: boolean
  owner?: string
  approvedAddress?: string
  imageUrl?: string
}

export function useGiftCards() {
  const [giftCards, setGiftCards] = useState<GiftCard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { address } = useWallet()
  const { writeContract } = useContractWrite()

  // Get the contract address from environment variables
  const contractAddress = process.env.NEXT_PUBLIC_GIFT_CARD_CONTRACT_ADDRESS as `0x${string}` || "0x0000000000000000000000000000000000000000"
  
  console.log("Debug - Contract Address:", contractAddress)
  console.log("Debug - Wallet Address:", address)

  // Fetch the balance of gift cards owned by the address
  const { data: balance } = useContractRead({
    address: contractAddress,
    abi: GIFT_CARD_ABI,
    functionName: "balanceOf",
    args: [address || "0x0"],
  })

  console.log("Debug - Balance:", balance?.toString())

  const transferGiftCard = async (tokenId: string, toAddress: string) => {
    if (!address) {
      throw new Error("Wallet not connected")
    }

    try {
      // First approve the transfer
      await writeContract({
        address: contractAddress,
        abi: GIFT_CARD_ABI,
        functionName: "approve",
        args: [toAddress as `0x${string}`, BigInt(tokenId)],
      })

      // Then transfer the gift card
      await writeContract({
        address: contractAddress,
        abi: GIFT_CARD_ABI,
        functionName: "transferFrom",
        args: [address, toAddress as `0x${string}`, BigInt(tokenId)],
      })

      return true
    } catch (error) {
      console.error("Transfer failed:", error)
      throw error
    }
  }

  // Function to get NFT metadata (placeholder - implement based on your contract)
  const getNFTMetadata = async (tokenId: string) => {
    try {
      // This is a placeholder - implement based on your contract's metadata function
      // If your contract uses tokenURI, you could fetch the metadata from there
      return {
        name: `Gift Card #${tokenId}`,
        description: `A gift card with value of ${tokenId} ETH`,
        image: `https://example.com/gift-card-${tokenId}.png`, // Replace with your actual image URL
      }
    } catch (error) {
      console.error("Failed to fetch NFT metadata:", error)
      return null
    }
  }

  useEffect(() => {
    const fetchGiftCards = async () => {
      if (!address || !balance) {
        console.log("Debug - No address or balance, returning empty array")
        setGiftCards([])
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        console.log("Debug - Starting to fetch gift cards")
        
        // Create an array of indices to fetch token IDs
        const indices = Array.from({ length: Number(balance) }, (_, i) => i)
        console.log("Debug - Indices to fetch:", indices)
        
        // Fetch all token IDs owned by the address
        const tokenIdsPromises = indices.map(index => 
          fetch(`/api/token-of-owner-by-index?owner=${address}&index=${index}`)
            .then(res => {
              console.log(`Debug - Token of owner response for index ${index}:`, res.status)
              return res.json()
            })
            .then(data => {
              console.log(`Debug - Token ID for index ${index}:`, data.tokenId)
              return data.tokenId
            })
            .catch(error => {
              console.error(`Debug - Error fetching token ID for index ${index}:`, error)
              throw error
            })
        )
        
        const tokenIds = await Promise.all(tokenIdsPromises)
        console.log("Debug - All token IDs:", tokenIds)
        
        // Fetch details for each token
        const cardsPromises = tokenIds.map(async tokenId => {
          console.log(`Debug - Fetching details for token ${tokenId}`)
          
          try {
            // Fetch gift card details
            const detailsResponse = await fetch(`/api/gift-card-details?tokenId=${tokenId}`)
            console.log(`Debug - Gift card details response for token ${tokenId}:`, detailsResponse.status)
            const details = await detailsResponse.json()
            console.log(`Debug - Gift card details for token ${tokenId}:`, details)
            
            // Fetch owner and approved address
            const ownerResponse = await fetch(`/api/owner-of?tokenId=${tokenId}`)
            const ownerData = await ownerResponse.json()
            console.log(`Debug - Owner data for token ${tokenId}:`, ownerData)
            
            const approvedResponse = await fetch(`/api/get-approved?tokenId=${tokenId}`)
            const approvedData = await approvedResponse.json()
            console.log(`Debug - Approved data for token ${tokenId}:`, approvedData)
            
            // Fetch NFT metadata
            const metadata = await getNFTMetadata(tokenId)
            console.log(`Debug - Metadata for token ${tokenId}:`, metadata)
            
            return {
              id: tokenId.toString(),
              name: metadata?.name || `Gift Card #${tokenId.toString()}`,
              price: details.price.toString(),
              expiryDate: new Date(Number(details.expiryDate) * 1000).toISOString(),
              isUsed: details.isUsed,
              owner: ownerData.owner,
              approvedAddress: approvedData.approvedAddress,
              imageUrl: metadata?.image,
            }
          } catch (error) {
            console.error(`Debug - Error processing token ${tokenId}:`, error)
            throw error
          }
        })
        
        const cards = await Promise.all(cardsPromises)
        console.log("Debug - Final gift cards array:", cards)
        setGiftCards(cards)
      } catch (error) {
        console.error("Debug - Error in fetchGiftCards:", error)
        setGiftCards([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchGiftCards()
  }, [address, balance])

  return {
    giftCards,
    isLoading,
    transferGiftCard
  }
} 