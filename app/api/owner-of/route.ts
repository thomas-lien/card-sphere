import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'

// This is a placeholder ABI - you'll need to replace this with your actual contract ABI
const GIFT_CARD_ABI = [
  {
    name: "ownerOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "address" }],
  }
] as const

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const tokenId = searchParams.get('tokenId')

  if (!tokenId) {
    return NextResponse.json({ error: 'Missing tokenId parameter' }, { status: 400 })
  }

  try {
    const client = createPublicClient({
      chain: sepolia,
      transport: http()
    })

    const contractAddress = process.env.NEXT_PUBLIC_GIFT_CARD_CONTRACT_ADDRESS as `0x${string}` || "0x0000000000000000000000000000000000000000"

    const owner = await client.readContract({
      address: contractAddress,
      abi: GIFT_CARD_ABI,
      functionName: 'ownerOf',
      args: [BigInt(tokenId)],
    })

    return NextResponse.json({ owner })
  } catch (error) {
    console.error('Error fetching token owner:', error)
    return NextResponse.json({ error: 'Failed to fetch token owner' }, { status: 500 })
  }
} 