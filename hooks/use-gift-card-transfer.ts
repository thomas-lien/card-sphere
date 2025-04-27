"use client"

import { useState } from "react"
import { useWallet } from "@/hooks/use-wallet"
import { useContractWrite, usePrepareContractWrite } from "wagmi"
import { parseEther } from "viem"

// This is a placeholder ABI - you'll need to replace this with your actual contract ABI
const GIFT_CARD_ABI = [
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" }
    ],
    outputs: [],
  }
] as const

export function useGiftCardTransfer() {
  const [isTransferring, setIsTransferring] = useState(false)
  const { address } = useWallet()

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_GIFT_CARD_CONTRACT_ADDRESS as `0x${string}`,
    abi: GIFT_CARD_ABI,
    functionName: "transfer",
  })

  const { writeAsync } = useContractWrite(config)

  const transferGiftCard = async (recipientAddress: string, tokenId: string) => {
    if (!address || !writeAsync) {
      throw new Error("Wallet not connected")
    }

    try {
      setIsTransferring(true)
      const tx = await writeAsync({
        args: [recipientAddress, BigInt(tokenId)],
      })
      await tx.wait()
      return tx.hash
    } catch (error) {
      console.error("Transfer failed:", error)
      throw error
    } finally {
      setIsTransferring(false)
    }
  }

  return {
    transferGiftCard,
    isTransferring,
  }
} 