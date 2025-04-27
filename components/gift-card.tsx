"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TransferGiftCardModal } from "@/components/transfer-gift-card-modal"
import { useGiftCardTransfer } from "@/hooks/use-gift-card-transfer"

interface GiftCardProps {
  id: string
  name: string
  balance: string
  expiryDate: string
  imageUrl: string
}

export function GiftCard({ id, name, balance, expiryDate, imageUrl }: GiftCardProps) {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false)
  const { transferGiftCard, isTransferring } = useGiftCardTransfer()

  const handleTransfer = async (recipientAddress: string) => {
    await transferGiftCard(recipientAddress, id)
  }

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>Expires: {expiryDate}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <img
              src={imageUrl}
              alt={name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">${balance}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setIsTransferModalOpen(true)}>
            Transfer
          </Button>
          <Button>Use Card</Button>
        </CardFooter>
      </Card>

      <TransferGiftCardModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        giftCardId={id}
        onTransfer={handleTransfer}
      />
    </>
  )
} 