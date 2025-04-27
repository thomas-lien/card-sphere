"use client"

import { useState } from "react"
import { useWallet } from "@/hooks/use-wallet"
import { useContractWrite, useContractRead } from "wagmi"
import { parseEther } from "viem"

// This is the ABI for the GiftCard contract
const GIFT_CARD_ABI = [
  {
    name: "mint",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "price", type: "uint256" },
      { name: "expiryDate", type: "uint256" }
    ],
    outputs: [],
  },
  {
    name: "useGiftCard",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "tokenId", type: "uint256" }
    ],
    outputs: [],
  },
  {
    name: "getGiftCardDetails",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "tokenId", type: "uint256" }
    ],
    outputs: [
      { name: "price", type: "uint256" },
      { name: "expiryDate", type: "uint256" },
      { name: "isUsed", type: "bool" }
    ],
  },
  {
    name: "ownerOf",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "tokenId", type: "uint256" }
    ],
    outputs: [
      { name: "", type: "address" }
    ],
  }
] as const

export function useGiftCardMint() {
  const [isMinting, setIsMinting] = useState(false)
  const { address } = useWallet()

  const { writeContract } = useContractWrite()

  const mintGiftCard = async (price: number, quantity: number) => {
    if (!address) {
      throw new Error("Wallet not connected")
    }

    try {
      setIsMinting(true)
      
      // Calculate expiry date (1 year from now)
      const expiryDate = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60
      
      // Mint the specified quantity of gift cards
      const txHashes = []
      
      for (let i = 0; i < quantity; i++) {
        await writeContract({
          address: process.env.NEXT_PUBLIC_GIFT_CARD_CONTRACT_ADDRESS as `0x${string}`,
          abi: GIFT_CARD_ABI,
          functionName: "mint",
          args: [
            address, // recipient address (the vendor)
            parseEther(price.toString()),
            BigInt(expiryDate)
          ],
        })
        
        // Since writeContract doesn't return a hash directly, we'll use a placeholder
        // In a real implementation, you might want to use a different approach to track transactions
        txHashes.push(`tx-${Date.now()}-${i}`)
      }
      
      return txHashes
    } catch (error) {
      console.error("Minting failed:", error)
      throw error
    } finally {
      setIsMinting(false)
    }
  }

  return {
    mintGiftCard,
    isMinting,
  }
}

export function useGiftCard(tokenId: bigint) {
  const { data: giftCardDetails, isError, isLoading } = useContractRead({
    address: process.env.NEXT_PUBLIC_GIFT_CARD_CONTRACT_ADDRESS as `0x${string}`,
    abi: GIFT_CARD_ABI,
    functionName: "getGiftCardDetails",
    args: [tokenId],
  })

  const { data: owner } = useContractRead({
    address: process.env.NEXT_PUBLIC_GIFT_CARD_CONTRACT_ADDRESS as `0x${string}`,
    abi: GIFT_CARD_ABI,
    functionName: "ownerOf",
    args: [tokenId],
  })

  const { writeContract } = useContractWrite()
  const [isUsing, setIsUsing] = useState(false)

  const useGiftCard = async () => {
    if (!giftCardDetails) return null
    
    try {
      setIsUsing(true)
      
      await writeContract({
        address: process.env.NEXT_PUBLIC_GIFT_CARD_CONTRACT_ADDRESS as `0x${string}`,
        abi: GIFT_CARD_ABI,
        functionName: "useGiftCard",
        args: [tokenId],
      })
      
      // Return a placeholder transaction hash
      return `tx-${Date.now()}`
    } catch (error) {
      console.error("Using gift card failed:", error)
      throw error
    } finally {
      setIsUsing(false)
    }
  }

  return {
    giftCardDetails,
    owner,
    isError,
    isLoading,
    useGiftCard,
    isUsing,
  }
} 