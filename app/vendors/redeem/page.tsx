"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useGiftCard } from "@/hooks/use-gift-card-mint"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { formatEther } from "viem"

export default function RedeemPage() {
  const { address, isConnected } = useAccount()
  const [tokenId, setTokenId] = useState("")
  const [isValidToken, setIsValidToken] = useState(false)
  
  // Only fetch gift card details if we have a valid token ID
  const tokenIdBigInt = tokenId && !isNaN(Number(tokenId)) ? BigInt(tokenId) : BigInt(0)
  const { 
    giftCardDetails, 
    owner, 
    isError, 
    isLoading, 
    useGiftCard: redeemGiftCard, 
    isUsing 
  } = useGiftCard(tokenIdBigInt)
  
  const handleTokenIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTokenId(value)
    setIsValidToken(value !== "" && !isNaN(Number(value)))
  }
  
  const handleRedeem = async () => {
    if (!tokenId || !giftCardDetails) return
    
    try {
      const txHash = await redeemGiftCard()
      
      if (txHash) {
        toast({
          title: "Gift Card Redeemed",
          description: `The gift card has been successfully redeemed. Transaction hash: ${txHash}`,
        })
        
        // Reset form
        setTokenId("")
        setIsValidToken(false)
      }
    } catch (error: any) {
      console.error("Redemption failed:", error)
      
      let errorMessage = "There was an error redeeming the gift card. Please try again."
      
      if (error.message?.includes("already used")) {
        errorMessage = "This gift card has already been used."
      } else if (error.message?.includes("expired")) {
        errorMessage = "This gift card has expired."
      } else if (error.message?.includes("Not owner nor approved")) {
        errorMessage = "You are not the owner of this gift card."
      }
      
      toast({
        title: "Redemption Failed",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }
  
  const isOwner = owner && address && owner.toLowerCase() === address.toLowerCase()
  const isExpired = giftCardDetails && new Date(Number(giftCardDetails[1]) * 1000) < new Date()
  const isUsed = giftCardDetails && giftCardDetails[2]
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Redeem Gift Card</h1>
      
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Enter Gift Card Token ID</CardTitle>
            <CardDescription>
              Enter the token ID of the gift card you want to redeem.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tokenId" className="text-right">
                  Token ID
                </Label>
                <Input
                  id="tokenId"
                  value={tokenId}
                  onChange={handleTokenIdChange}
                  placeholder="Enter token ID"
                  className="col-span-3"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {isValidToken && !isError && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Gift Card Details</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Loading gift card details...</p>
              ) : giftCardDetails ? (
                <div className="grid gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Value</Label>
                    <div className="col-span-3">
                      ${Number(formatEther(giftCardDetails[0])).toFixed(2)}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Expiry Date</Label>
                    <div className="col-span-3">
                      {new Date(Number(giftCardDetails[1]) * 1000).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Status</Label>
                    <div className="col-span-3">
                      {isUsed ? (
                        <span className="text-destructive">Used</span>
                      ) : isExpired ? (
                        <span className="text-destructive">Expired</span>
                      ) : (
                        <span className="text-green-500">Valid</span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Owner</Label>
                    <div className="col-span-3">
                      {owner ? (
                        <span className={isOwner ? "text-green-500" : "text-destructive"}>
                          {isOwner ? "You own this gift card" : "You don't own this gift card"}
                        </span>
                      ) : (
                        "Unknown"
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p>Gift card not found</p>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleRedeem} 
                disabled={!isConnected || isUsing || !isOwner || isUsed || isExpired}
                className="w-full"
              >
                {isUsing ? "Processing..." : "Redeem Gift Card"}
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {!isConnected && (
          <p className="mt-4 text-sm text-destructive">
            Please connect your wallet to redeem a gift card.
          </p>
        )}
      </div>
    </div>
  )
} 