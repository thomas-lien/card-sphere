"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Wallet, Gift, CreditCard, BarChart3, Settings, LogOut, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { DepositCalculator } from "@/components/deposit-calculator"

interface UserData {
  id: number
  name: string
  email: string
  isVendor: boolean
  giftCardOwned: string[]
  history: any[]
  user_balance: number
}

export default function AccountPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDepositOpen, setIsDepositOpen] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user data from localStorage
        const storedUser = localStorage.getItem("user")
        if (!storedUser) {
          router.push("/signin")
          return
        }
        setUserData(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-[50vh]">
          <p className="text-muted-foreground">No user data found</p>
        </div>
      </div>
    )
  }

  // Placeholder data for gift cards - in a real app, this would come from the backend
  const giftCards = [
    {
      id: "ABC123",
      name: "Starbucks",
      balance: 25.0,
      expiryDate: "12/31/2025",
      color: "bg-green-500",
    },
    {
      id: "XYZ456",
      name: "Amazon",
      balance: 50.0,
      expiryDate: "06/30/2026",
      color: "bg-blue-500",
    },
  ]

  // Placeholder data for transactions - in a real app, this would come from the backend
  const transactions = [
    {
      id: "1",
      date: "2025-04-15",
      type: "Purchase",
      card: "Starbucks",
      amount: 25.0,
      status: "Completed",
    },
    {
      id: "2",
      date: "2025-04-10",
      type: "Purchase",
      card: "Amazon",
      amount: 50.0,
      status: "Completed",
    },
  ]

  // Placeholder data for rewards - in a real app, this would come from the backend
  const loyaltyPoints = 1250
  const nextTier = 2500
  const progress = (loyaltyPoints / nextTier) * 100

  const handleDeposit = async (amount: number) => {
    try {
      const response = await fetch("/api/users/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData?.email,
          amount,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to deposit")
      }

      const updatedUser = await response.json()
      setUserData(updatedUser)
    } catch (error) {
      console.error("Error depositing:", error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{userData.name}</h1>
            <p className="text-muted-foreground">{userData.email}</p>
            {userData.isVendor && (
              <Badge className="mt-2">Vendor</Badge>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDepositOpen(true)}
                className="h-4 w-4 text-muted-foreground hover:text-primary"
              >
                <CreditCard className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${userData.user_balance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Available balance</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gift Cards</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.giftCardOwned.length}</div>
              <p className="text-xs text-muted-foreground">Total cards owned</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loyaltyPoints}</div>
              <p className="text-xs text-muted-foreground">Points earned</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Tier</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{nextTier}</div>
              <p className="text-xs text-muted-foreground">Points needed</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="cards" className="space-y-4">
          <TabsList>
            <TabsTrigger value="cards">Gift Cards</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {giftCards.map((card) => (
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
                          <Button variant="outline" size="sm">Transfer</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your recent gift card transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.card}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${transaction.amount.toFixed(2)}</p>
                        <Badge
                          variant={
                            transaction.type === "Purchase"
                              ? "default"
                              : transaction.type === "Redemption"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {transaction.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Loyalty Program</CardTitle>
                <CardDescription>Earn points and unlock rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Current Points: {loyaltyPoints}</span>
                      <span>Next Tier: {nextTier}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">5% Discount</CardTitle>
                        <CardDescription>Get 5% off your next gift card purchase</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <Badge>500 points</Badge>
                          <Button size="sm">Redeem</Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Premium Status</CardTitle>
                        <CardDescription>Unlock premium status for 30 days</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <Badge>1000 points</Badge>
                          <Button size="sm">Redeem</Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Yield Boost</CardTitle>
                        <CardDescription>Boost your DeFi yield by 2% for 60 days</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <Badge>2000 points</Badge>
                          <Button size="sm">Redeem</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <DepositCalculator
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onDeposit={handleDeposit}
        currentBalance={userData.user_balance}
      />
    </div>
  )
} 