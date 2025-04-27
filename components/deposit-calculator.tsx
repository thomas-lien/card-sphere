import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DepositCalculatorProps {
  isOpen: boolean
  onClose: () => void
  onDeposit: (amount: number) => void
  currentBalance: number
}

export function DepositCalculator({ isOpen, onClose, onDeposit, currentBalance }: DepositCalculatorProps) {
  const [amount, setAmount] = useState("")

  const handleNumberClick = (num: string) => {
    setAmount((prev) => {
      // Prevent multiple decimal points
      if (num === "." && prev.includes(".")) return prev
      // Limit to 2 decimal places
      if (prev.includes(".") && prev.split(".")[1].length >= 2) return prev
      return prev + num
    })
  }

  const handleClear = () => {
    setAmount("")
  }

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount)
    if (!isNaN(depositAmount) && depositAmount > 0) {
      onDeposit(depositAmount)
      setAmount("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deposit Funds</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p className="text-2xl font-bold">${currentBalance.toFixed(2)}</p>
          </div>
          <Input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="text-center text-2xl"
          />
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "C"].map((num) => (
              <Button
                key={num}
                variant={num === "C" ? "destructive" : "outline"}
                className="h-12 text-lg"
                onClick={() => (num === "C" ? handleClear() : handleNumberClick(num.toString()))}
              >
                {num}
              </Button>
            ))}
          </div>
          <Button className="w-full" onClick={handleDeposit}>
            Deposit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 