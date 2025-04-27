"use client"

import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

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

export default function GiftCardDetailPage({ params }: { params: { id: string } }) {
  const giftCard = giftCards.find((card) => card.id === params.id)

  if (!giftCard) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/marketplace" className="inline-flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="overflow-hidden">
            <div className="relative">
              <div className={`absolute top-0 left-0 w-full h-1 ${giftCard.color}`} />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`h-16 w-16 rounded-full ${giftCard.color} flex items-center justify-center text-white font-bold text-2xl`}
                  >
                    {giftCard.name.charAt(0)}
                  </div>
                  <Badge variant="secondary" className="text-lg px-4 py-1">
                    {giftCard.discount}% Off
                  </Badge>
                </div>
                <h1 className="font-bold text-3xl mb-2">{giftCard.name}</h1>
                <div className="flex items-baseline mt-1 mb-6">
                  <span className="text-3xl font-bold">${giftCard.price.toFixed(2)}</span>
                  <span className="text-muted-foreground text-lg ml-3 line-through">
                    ${(giftCard.price / (1 - giftCard.discount / 100)).toFixed(2)}
                  </span>
                </div>
                <p className="text-lg mb-6">{giftCard.description}</p>
                <Link href={`/marketplace/${giftCard.id}/purchase`}>
                  <Button size="lg" className="w-full">Buy Now</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h2 className="font-bold text-xl mb-4">Terms & Conditions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Terms of Use</h3>
                <p className="text-muted-foreground">{giftCard.terms}</p>
              </div>
              <div>
                <h3 className="font-medium">Expiration</h3>
                <p className="text-muted-foreground">{giftCard.expiry}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 