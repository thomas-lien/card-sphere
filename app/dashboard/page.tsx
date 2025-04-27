"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserGiftCards from "@/components/user-gift-cards"
import UserTransactions from "@/components/user-transactions"
import UserRewards from "@/components/user-rewards"
import ConnectWalletPrompt from "@/components/connect-wallet-prompt"
import DashboardStats from "@/components/dashboard-stats"
import { useWallet } from "@/hooks/use-wallet"
import type { Metadata } from 'next'

export default function DashboardPage() {
  const { isConnected, address } = useWallet()

  if (!isConnected || !address) {
    return <ConnectWalletPrompt />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      <DashboardStats />

      <Tabs defaultValue="cards" className="mt-8">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="cards">My Gift Cards</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="rewards">Loyalty Rewards</TabsTrigger>
        </TabsList>
        <TabsContent value="cards">
          <UserGiftCards />
        </TabsContent>
        <TabsContent value="transactions">
          <UserTransactions />
        </TabsContent>
        <TabsContent value="rewards">
          <UserRewards />
        </TabsContent>
      </Tabs>
    </div>
  )
}
