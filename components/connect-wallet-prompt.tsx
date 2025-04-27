"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, AlertCircle } from "lucide-react"
import { useWallet } from "@/hooks/use-wallet"
import { useToast } from "@/hooks/use-toast"

export default function ConnectWalletPrompt() {
  const { connect, isConnected } = useWallet()
  const { toast } = useToast()

  const handleConnect = async () => {
    try {
      await connect()
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
      })
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect your wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center">Connect Your Wallet</CardTitle>
          <CardDescription className="text-center">
            You need to connect your wallet to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Wallet className="h-10 w-10 text-primary" />
          </div>
          <div className="text-center space-y-2 mb-6">
            <p>Connect your Web3 wallet to view your gift cards, transactions, and rewards.</p>
            <div className="flex items-center justify-center text-sm text-amber-600 dark:text-amber-500">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>Your wallet is used for secure authentication only</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full gap-2" 
            onClick={handleConnect}
            disabled={isConnected}
          >
            <Wallet className="h-4 w-4" />
            {isConnected ? "Connected" : "Connect Wallet"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
