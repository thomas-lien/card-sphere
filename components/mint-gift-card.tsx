"use client"

import { useState } from "react"
import { useAccount, useContractWrite, useTransaction } from "wagmi"
import { parseEther } from "viem"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// ABI for the gift card contract
const GIFT_CARD_ABI = [
  {
    name: "mintGiftCard",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "value", type: "uint256" },
      { name: "expiryDate", type: "uint256" }
    ],
    outputs: [{ name: "", type: "uint256" }],
  }
] as const

const contractAddress = process.env.NEXT_PUBLIC_GIFT_CARD_CONTRACT_ADDRESS as `0x${string}`

export function MintGiftCard() {
  const { address, isConnected } = useAccount()
  const [value, setValue] = useState("")
  const [expiryDays, setExpiryDays] = useState("30")
  const [isMinting, setIsMinting] = useState(false)

  // Calculate expiry date (current timestamp + days)
  const calculateExpiryDate = (days: number) => {
    const now = Math.floor(Date.now() / 1000)
    return now + (days * 24 * 60 * 60)
  }

  // Contract write function
  const { data: hash, writeContract } = useContractWrite()

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useTransaction({
    hash,
  })

  const handleMint = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to mint a gift card",
        variant: "destructive",
      })
      return
    }

    if (!value || isNaN(Number(value)) || Number(value) <= 0) {
      toast({
        title: "Invalid value",
        description: "Please enter a valid gift card value",
        variant: "destructive",
      })
      return
    }

    if (!expiryDays || isNaN(Number(expiryDays)) || Number(expiryDays) <= 0) {
      toast({
        title: "Invalid expiry days",
        description: "Please enter a valid number of days",
        variant: "destructive",
      })
      return
    }

    setIsMinting(true)

    try {
      const valueInWei = parseEther(value)
      const expiryDate = calculateExpiryDate(Number(expiryDays))

      writeContract({
        address: contractAddress,
        abi: GIFT_CARD_ABI,
        functionName: "mintGiftCard",
        args: [valueInWei, BigInt(expiryDate)],
        value: valueInWei, // Send the same amount of ETH as the gift card value
      })
    } catch (error) {
      console.error("Error minting gift card:", error)
      toast({
        title: "Error",
        description: "Failed to mint gift card. Please try again.",
        variant: "destructive",
      })
      setIsMinting(false)
    }
  }

  // Handle transaction confirmation
  if (isConfirmed) {
    toast({
      title: "Gift Card Minted!",
      description: "Your new gift card has been created successfully.",
    })
    setIsMinting(false)
    setValue("")
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Mint New Gift Card</CardTitle>
        <CardDescription>
          Create a new gift card NFT with your desired value and expiry date.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="value" className="text-right">
              Value (ETH)
            </Label>
            <Input
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0.1"
              className="col-span-3"
              type="number"
              step="0.01"
              min="0.01"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expiryDays" className="text-right">
              Expiry (Days)
            </Label>
            <Input
              id="expiryDays"
              value={expiryDays}
              onChange={(e) => setExpiryDays(e.target.value)}
              placeholder="30"
              className="col-span-3"
              type="number"
              min="1"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleMint}
          disabled={!isConnected || isMinting || isConfirming}
        >
          {isMinting || isConfirming ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isConfirming ? "Confirming..." : "Minting..."}
            </>
          ) : (
            "Mint Gift Card"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
} 