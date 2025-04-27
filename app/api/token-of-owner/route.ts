import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'
import { NextRequest } from 'next/server'

const contractAddress = process.env.NEXT_PUBLIC_GIFT_CARD_CONTRACT_ADDRESS as `0x${string}`

const GIFT_CARD_ABI = [
  {
    name: "tokenOfOwnerByIndex",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "index", type: "uint256" }
    ],
    outputs: [{ name: "", type: "uint256" }],
  }
] as const

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http()
})

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const owner = searchParams.get('owner')
  const index = searchParams.get('index')

  if (!owner || !index) {
    return new Response('Missing owner or index parameter', { status: 400 })
  }

  try {
    const tokenId = await publicClient.readContract({
      address: contractAddress,
      abi: GIFT_CARD_ABI,
      functionName: 'tokenOfOwnerByIndex',
      args: [owner as `0x${string}`, BigInt(index)]
    })

    return new Response(JSON.stringify(tokenId), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error fetching token ID:', error)
    return new Response('Error fetching token ID', { status: 500 })
  }
} 