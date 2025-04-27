"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Gift, ArrowUpRight } from "lucide-react"
import { useWallet } from "@/hooks/use-wallet"
import { useToast } from "@/hooks/use-toast"
import { usePublicClient, useWriteContract } from "wagmi"
import { type Address, getAddress } from "viem"
import { TransferGiftCardModal } from "@/components/transfer-gift-card-modal"

// ABI for the gift card contract
const giftCardABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

export default function UserGiftCards() {
  const { address } = useWallet()
  const { toast } = useToast()
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const publicClient = usePublicClient()
  const { writeContract } = useWriteContract()

  // Contract address with proper typing
  const contractAddress = getAddress(process.env.NEXT_PUBLIC_GIFT_CARD_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000')

  const userCards = [
    {
      id: "1",
      name: "Starbucks",
      balance: 25.0,
      expiryDate: "12/31/2025",
      color: "bg-green-500",
    },
    {
      id: "2",
      name: "Amazon",
      balance: 50.0,
      expiryDate: "06/30/2026",
      color: "bg-blue-500",
    },
    {
      id: "3",
      name: "Target",
      balance: 100.0,
      expiryDate: "09/15/2025",
      color: "bg-red-500",
    },
    {
      id: "4",
      name: "Apple",
      balance: 175.0,
      expiryDate: "03/22/2026",
      color: "bg-gray-500",
    },
  ]

  const handleTransferSubmit = async (recipientAddress: string) => {
    if (!selectedCard || !address || !publicClient || !writeContract) {
      toast({
        title: "Error",
        description: "No card selected or wallet not connected",
        variant: "destructive",
      })
      return
    }

    if (!recipientAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid Ethereum address",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const recipient = getAddress(recipientAddress)
      const sender = getAddress(address)

      // First approve the recipient
      await writeContract({
        address: contractAddress,
        abi: giftCardABI,
        functionName: 'approve',
        args: [recipient, BigInt(selectedCard)],
      })

      toast({
        title: "Approval Pending",
        description: "Please confirm the approval transaction in your wallet",
      })

      // Wait for approval transaction to be mined
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: "Approval Successful",
        description: "Now initiating the transfer...",
      })

      // Then transfer the gift card
      await writeContract({
        address: contractAddress,
        abi: giftCardABI,
        functionName: 'transferFrom',
        args: [recipient, BigInt(selectedCard)],
      })

      toast({
        title: "Transfer Pending",
        description: "Please confirm the transfer transaction in your wallet",
      })

      // Wait for transfer transaction to be mined
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: "Transfer Successful",
        description: "The gift card has been transferred successfully",
      })

      setIsTransferModalOpen(false)
    } catch (error) {
      console.error("Transfer failed:", error)
      toast({
        title: "Transfer Failed",
        description: error instanceof Error ? error.message : "Failed to transfer the gift card. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setSelectedCard(null)
    }
  }

  const handleTransfer = (cardId: string) => {
    if (!address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to transfer this gift card.",
        variant: "destructive",
      })
      return
    }

    setSelectedCard(cardId)
    setIsTransferModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Gift Cards</h3>
        <Button variant="outline" size="sm">
          <Gift className="h-4 w-4 mr-2" />
          Add New Card
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userCards.map((card) => (
          <Card key={card.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex border-b">
                <div className={`w-2 ${card.color}`}></div>
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">{card.name}</h4>
                      <p className="text-sm text-muted-foreground">Expires: {card.expiryDate}</p>
                    </div>
                    <div
                      className={`h-8 w-8 rounded-full ${card.color} flex items-center justify-center text-white font-bold`}
                    >
                      {card.name.charAt(0)}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm text-muted-foreground">Balance</div>
                    <div className="text-2xl font-bold">${card.balance.toFixed(2)}</div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm">Use Card</Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleTransfer(card.id)}
                      disabled={isLoading}
                    >
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      Transfer
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <TransferGiftCardModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        onSubmit={handleTransferSubmit}
      />
    </div>
  )
}
