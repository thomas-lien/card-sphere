"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

// Format address to show first 6 and last 4 characters
const formatAddress = (address: string | undefined) => {
  if (!address) return ""
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <Button variant="outline" className="gap-2" onClick={() => disconnect()}>
        <Wallet className="h-4 w-4" />
        <span className="hidden sm:inline">{formatAddress(address)}</span>
      </Button>
    )
  }

  return (
    <Button 
      variant="outline" 
      className="gap-2" 
      onClick={() => connect({ connector: connectors[0] })}
    >
      <Wallet className="h-4 w-4" />
      <span className="hidden sm:inline">Connect Wallet</span>
    </Button>
  )
} 