"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWallet } from "@/hooks/use-wallet"
import { isAddress } from "viem"

interface TransferGiftCardModalProps {
  isOpen: boolean
  onClose: () => void
  giftCardId: string
  onTransfer: (recipientAddress: string) => Promise<void>
}

export function TransferGiftCardModal({
  isOpen,
  onClose,
  giftCardId,
  onTransfer,
}: TransferGiftCardModalProps) {
  const [recipientAddress, setRecipientAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { address } = useWallet()

  const handleTransfer = async () => {
    if (!recipientAddress) {
      setError("Please enter a recipient address")
      return
    }

    if (!isAddress(recipientAddress)) {
      setError("Please enter a valid Ethereum address")
      return
    }

    if (recipientAddress.toLowerCase() === address?.toLowerCase()) {
      setError("You cannot transfer to your own address")
      return
    }

    try {
      setIsLoading(true)
      setError("")
      await onTransfer(recipientAddress)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to transfer gift card")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer Gift Card</DialogTitle>
          <DialogDescription>
            Enter the recipient's Ethereum address to transfer your gift card.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Input
              placeholder="0x..."
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              disabled={isLoading}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleTransfer} disabled={isLoading}>
              {isLoading ? "Transferring..." : "Transfer"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 