import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Gift, ArrowUpRight } from "lucide-react"

export default function UserGiftCards() {
  const userCards = [
    {
      id: "1",
      name: "Starbucks",
      balance: 25.0,
      expiryDate: "12/31/2025",
      color: "bg-green-500",
    },
    {
      id: "2",
      name: "Amazon",
      balance: 50.0,
      expiryDate: "06/30/2026",
      color: "bg-blue-500",
    },
    {
      id: "3",
      name: "Target",
      balance: 100.0,
      expiryDate: "09/15/2025",
      color: "bg-red-500",
    },
    {
      id: "4",
      name: "Apple",
      balance: 175.0,
      expiryDate: "03/22/2026",
      color: "bg-gray-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Gift Cards</h3>
        <Button variant="outline" size="sm">
          <Gift className="h-4 w-4 mr-2" />
          Add New Card
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userCards.map((card) => (
          <Card key={card.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex border-b">
                <div className={`w-2 ${card.color}`}></div>
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">{card.name}</h4>
                      <p className="text-sm text-muted-foreground">Expires: {card.expiryDate}</p>
                    </div>
                    <div
                      className={`h-8 w-8 rounded-full ${card.color} flex items-center justify-center text-white font-bold`}
                    >
                      {card.name.charAt(0)}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm text-muted-foreground">Balance</div>
                    <div className="text-2xl font-bold">${card.balance.toFixed(2)}</div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm">Use Card</Button>
                    <Button variant="outline" size="sm">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      Transfer
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}