import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'
import { NextRequest } from 'next/server'

const contractAddress = process.env.NEXT_PUBLIC_GIFT_CARD_CONTRACT_ADDRESS as `0x${string}`

if (!contractAddress) {
  throw new Error('NEXT_PUBLIC_GIFT_CARD_CONTRACT_ADDRESS is not set')
}

const GIFT_CARD_ABI = [
  {
    name: "getGiftCardDetails",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [
      { name: "price", type: "uint256" },
      { name: "expiryDate", type: "uint256" },
      { name: "isUsed", type: "bool" }
    ],
  }
] as const

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http()
})

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const tokenId = searchParams.get('tokenId')

  if (!tokenId) {
    return new Response('Missing tokenId parameter', { status: 400 })
  }

  try {
    console.log(`Debug - Fetching details for token ${tokenId} from contract ${contractAddress}`)
    
    const details = await publicClient.readContract({
      address: contractAddress,
      abi: GIFT_CARD_ABI,
      functionName: 'getGiftCardDetails',
      args: [BigInt(tokenId)]
    })

    console.log(`Debug - Received details for token ${tokenId}:`, details)

    return new Response(JSON.stringify({
      price: details[0].toString(),
      expiryDate: details[1].toString(),
      isUsed: details[2]
    }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error fetching gift card details:', error)
    return new Response(JSON.stringify({ error: 'Error fetching gift card details', details: error }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
} 