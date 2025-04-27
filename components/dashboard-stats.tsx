import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gift, CreditCard, BarChart3, Wallet } from "lucide-react"

export default function DashboardStats() {
  const stats = [
    {
      title: "Active Gift Cards",
      value: "5",
      icon: Gift,
      description: "Total active gift cards",
    },
    {
      title: "Total Value",
      value: "$350.00",
      icon: CreditCard,
      description: "Combined value of all cards",
    },
    {
      title: "Rewards Points",
      value: "1,250",
      icon: BarChart3,
      description: "Loyalty points earned",
    },
    {
      title: "Yield Earned",
      value: "$12.35",
      icon: Wallet,
      description: "DeFi yield generated",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
