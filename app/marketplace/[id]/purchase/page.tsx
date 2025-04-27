"use client"

import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { useWallet } from "@/hooks/use-wallet"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { use } from "react"

// This would typically come from an API or database
const giftCards = [
  {
    id: "1",
    name: "Starbucks",
    image: "/placeholder.svg?height=200&width=300",
    price: 25,
    discount: 5,
    color: "bg-green-500",
    description: "Enjoy your favorite coffee and treats at Starbucks with this gift card.",
    terms: "Valid at participating Starbucks locations. Cannot be combined with other offers.",
    expiry: "No expiration date",
  },
  {
    id: "2",
    name: "Amazon",
    image: "/placeholder.svg?height=200&width=300",
    price: 50,
    discount: 7,
    color: "bg-blue-500",
    description: "Shop millions of products on Amazon with this gift card.",
    terms: "Valid for purchases on Amazon.com. Cannot be used for Amazon Prime memberships.",
    expiry: "No expiration date",
  },
  {
    id: "3",
    name: "Target",
    image: "/placeholder.svg?height=200&width=300",
    price: 100,
    discount: 10,
    color: "bg-red-500",
    description: "Shop for everything you need at Target with this gift card.",
    terms: "Valid at all Target stores and Target.com. Cannot be used for Target Circle offers.",
    expiry: "No expiration date",
  },
  {
    id: "4",
    name: "Apple",
    image: "/placeholder.svg?height=200&width=300",
    price: 200,
    discount: 15,
    color: "bg-gray-500",
    description: "Purchase Apple products, accessories, and digital content with this gift card.",
    terms: "Valid at Apple Store locations and Apple.com. Cannot be used for AppleCare+.",
    expiry: "No expiration date",
  },
  {
    id: "5",
    name: "Best Buy",
    image: "/placeholder.svg?height=200&width=300",
    price: 150,
    discount: 12,
    color: "bg-yellow-500",
    description: "Shop for electronics and appliances at Best Buy with this gift card.",
    terms: "Valid at Best Buy stores and BestBuy.com. Cannot be used for Best Buy membership.",
    expiry: "No expiration date",
  },
  {
    id: "6",
    name: "Walmart",
    image: "/placeholder.svg?height=200&width=300",
    price: 75,
    discount: 8,
    color: "bg-blue-700",
    description: "Shop for groceries, household items, and more at Walmart with this gift card.",
    terms: "Valid at all Walmart stores and Walmart.com. Cannot be used for Walmart+ membership.",
    expiry: "No expiration date",
  },
  {
    id: "7",
    name: "Uber",
    image: "/placeholder.svg?height=200&width=300",
    price: 30,
    discount: 6,
    color: "bg-black",
    description: "Use this gift card for Uber rides and Uber Eats orders.",
    terms: "Valid for Uber rides and Uber Eats. Cannot be used for Uber Pass subscription.",
    expiry: "No expiration date",
  },
  {
    id: "8",
    name: "Netflix",
    image: "/placeholder.svg?height=200&width=300",
    price: 45,
    discount: 9,
    color: "bg-red-700",
    description: "Enjoy streaming your favorite movies and TV shows on Netflix with this gift card.",
    terms: "Valid for Netflix subscription. Cannot be combined with other Netflix offers.",
    expiry: "No expiration date",
  },
  {
    id: "9",
    name: "Spotify",
    image: "/placeholder.svg?height=200&width=300",
    price: 20,
    discount: 5,
    color: "bg-green-700",
    description: "Listen to millions of songs on Spotify with this gift card.",
    terms: "Valid for Spotify Premium subscription. Cannot be combined with other Spotify offers.",
    expiry: "No expiration date",
  },
]

export default function PurchasePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const giftCard = giftCards.find((card) => card.id === resolvedParams.id)
  const { isConnected } = useWallet()
  const [email, setEmail] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  if (!giftCard) {
    notFound()
  }

  const handleCompletePurchase = async () => {
    if (!isConnected) {
      alert("Please connect your wallet to complete the purchase")
      return
    }

    if (!email) {
      alert("Please enter your email for the receipt")
      return
    }

    if (!termsAccepted) {
      alert("Please accept the terms and conditions")
      return
    }

    setIsProcessing(true)
    
    try {
      // Here you would typically call your smart contract or API to process the purchase
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to a success page or dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Purchase failed:", error)
      alert("Purchase failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={`/marketplace/${resolvedParams.id}`} className="inline-flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Gift Card Details
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="p-6">
            <h1 className="font-bold text-2xl mb-6">Complete Your Purchase</h1>
            
            <div className="space-y-6">
              <div>
                <h2 className="font-medium text-lg mb-4">Gift Card Information</h2>
                <div className="flex items-center space-x-4 mb-4">
                  <div
                    className={`h-12 w-12 rounded-full ${giftCard.color} flex items-center justify-center text-white font-bold`}
                  >
                    {giftCard.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold">{giftCard.name}</h3>
                    <div className="flex items-baseline">
                      <span className="font-bold">${giftCard.price.toFixed(2)}</span>
                      <span className="text-muted-foreground text-sm ml-2 line-through">
                        ${(giftCard.price / (1 - giftCard.discount / 100)).toFixed(2)}
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        {giftCard.discount}% Off
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-medium text-lg mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email for Receipt</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john.doe@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="p-4 border rounded-md bg-muted/30">
                    <h3 className="font-medium mb-2">Connect Your Wallet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You'll need to connect your wallet to complete this purchase with cryptocurrency.
                    </p>
                    <WalletConnectButton />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the <Link href="#" className="text-primary hover:underline">Terms and Conditions</Link>
                </Label>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h2 className="font-bold text-xl mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Gift Card</span>
                <span>${giftCard.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">-${(giftCard.price * giftCard.discount / 100).toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>${(giftCard.price * (1 - giftCard.discount / 100)).toFixed(2)}</span>
              </div>
              <Button 
                className="w-full mt-4" 
                onClick={handleCompletePurchase}
                disabled={!isConnected || isProcessing}
              >
                {isProcessing ? "Processing..." : "Complete Purchase"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 