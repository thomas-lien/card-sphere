"use client"

import { MintGiftCard } from "@/components/mint-gift-card"

export default function MintPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Mint a New Gift Card NFT</h1>
      <MintGiftCard />
    </div>
  )
} 