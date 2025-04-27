import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import GiftCardItem from "./gift-card-item"

export default function FeaturedCards() {
  const featuredCards = [
    {
      id: "1",
      name: "Starbucks",
      image: "/placeholder.svg?height=200&width=300",
      price: 25,
      discount: 5,
      color: "bg-green-500",
    },
    {
      id: "2",
      name: "Amazon",
      image: "/placeholder.svg?height=200&width=300",
      price: 50,
      discount: 7,
      color: "bg-blue-500",
    },
    {
      id: "3",
      name: "Target",
      image: "/placeholder.svg?height=200&width=300",
      price: 100,
      discount: 10,
      color: "bg-red-500",
    },
    {
      id: "4",
      name: "Apple",
      image: "/placeholder.svg?height=200&width=300",
      price: 200,
      discount: 15,
      color: "bg-gray-500",
    },
  ]

  return (
    <section className="w-full section-padding">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Gift Cards</h2>
            <p className="text-muted-foreground mt-2">Discover popular gift cards with exclusive discounts</p>
          </div>
          <Link href="/marketplace">
            <Button variant="ghost" className="mt-4 md:mt-0 gap-1">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCards.map((card) => (
            <GiftCardItem key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
