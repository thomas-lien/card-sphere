"use client"

import { Button } from "@/components/ui/button"
import { useWallet } from "@/hooks/use-wallet"
import { Wallet } from "lucide-react"
import { useState } from "react"

export function WalletConnectButton() {
  const { address, isConnected, connect } = useWallet()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      await connect()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div>
      {isConnected ? (
        <div className="flex items-center justify-between p-3 border rounded-md bg-background">
          <div className="flex items-center">
            <Wallet className="h-5 w-5 mr-2" />
            <span className="font-medium">Connected</span>
          </div>
          <span className="text-sm text-muted-foreground truncate max-w-[150px]">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
      ) : (
        <Button 
          onClick={handleConnect} 
          className="w-full"
          disabled={isConnecting}
        >
          <Wallet className="h-4 w-4 mr-2" />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
    </div>
  )
} 