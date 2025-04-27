import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'
import { NextRequest } from 'next/server'

const contractAddress = process.env.NEXT_PUBLIC_GIFT_CARD_CONTRACT_ADDRESS as `0x${string}`

if (!contractAddress) {
  throw new Error('NEXT_PUBLIC_GIFT_CARD_CONTRACT_ADDRESS is not set')
}

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
    return new Response(JSON.stringify({ error: 'Missing owner or index parameter' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    console.log(`Debug - Fetching token ID for owner ${owner} at index ${index} from contract ${contractAddress}`)
    
    const tokenId = await publicClient.readContract({
      address: contractAddress,
      abi: GIFT_CARD_ABI,
      functionName: 'tokenOfOwnerByIndex',
      args: [owner as `0x${string}`, BigInt(index)]
    })

    console.log(`Debug - Received token ID: ${tokenId.toString()}`)

    return new Response(JSON.stringify({ tokenId: tokenId.toString() }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error fetching token ID:', error)
    return new Response(JSON.stringify({ error: 'Error fetching token ID', details: error }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
} 