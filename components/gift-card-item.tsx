import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface GiftCardProps {
  card: {
    id: string
    name: string
    image: string
    price: number
    discount: number
    color: string
  }
}

export default function GiftCardItem({ card }: GiftCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <div className={`absolute top-0 left-0 w-full h-1 ${card.color}`} />
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div
              className={`h-10 w-10 rounded-full ${card.color} flex items-center justify-center text-white font-bold`}
            >
              {card.name.charAt(0)}
            </div>
            <Badge variant="secondary">{card.discount}% Off</Badge>
          </div>
          <h3 className="font-bold text-lg">{card.name}</h3>
          <div className="flex items-baseline mt-1 mb-4">
            <span className="text-2xl font-bold">${card.price.toFixed(2)}</span>
            <span className="text-muted-foreground text-sm ml-2 line-through">
              ${(card.price / (1 - card.discount / 100)).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <Link href={`/marketplace/${card.id}`}>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </Link>
            <Link href={`/marketplace/${card.id}/purchase`}>
              <Button size="sm">Buy Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}
