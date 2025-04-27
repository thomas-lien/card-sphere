import GiftCardItem from "./gift-card-item"

export default function MarketplaceGrid() {
  const giftCards = [
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
    {
      id: "5",
      name: "Best Buy",
      image: "/placeholder.svg?height=200&width=300",
      price: 150,
      discount: 12,
      color: "bg-yellow-500",
    },
    {
      id: "6",
      name: "Walmart",
      image: "/placeholder.svg?height=200&width=300",
      price: 75,
      discount: 8,
      color: "bg-blue-700",
    },
    {
      id: "7",
      name: "Uber",
      image: "/placeholder.svg?height=200&width=300",
      price: 30,
      discount: 6,
      color: "bg-black",
    },
    {
      id: "8",
      name: "Netflix",
      image: "/placeholder.svg?height=200&width=300",
      price: 45,
      discount: 9,
      color: "bg-red-700",
    },
    {
      id: "9",
      name: "Spotify",
      image: "/placeholder.svg?height=200&width=300",
      price: 20,
      discount: 5,
      color: "bg-green-700",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {giftCards.map((card) => (
        <GiftCardItem key={card.id} card={card} />
      ))}
    </div>
  )
}
