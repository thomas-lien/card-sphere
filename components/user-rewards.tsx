import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Gift, Award, Zap } from "lucide-react"

export default function UserRewards() {
  const rewards = [
    {
      id: "1",
      title: "5% Discount",
      description: "Get 5% off your next gift card purchase",
      points: 500,
      icon: Gift,
    },
    {
      id: "2",
      title: "Premium Status",
      description: "Unlock premium status for 30 days",
      points: 1000,
      icon: Award,
    },
    {
      id: "3",
      title: "Yield Boost",
      description: "Boost your DeFi yield by 2% for 60 days",
      points: 2000,
      icon: Zap,
    },
  ]

  const userPoints = 1250
  const nextTier = 2500
  const progress = (userPoints / nextTier) * 100

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Loyalty Program</CardTitle>
          <CardDescription>Earn points with every purchase and redeem for rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Progress to Gold Tier</span>
                <span className="text-sm font-medium">
                  {userPoints} / {nextTier} points
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="text-sm font-medium text-muted-foreground">Current Tier</div>
                <div className="text-xl font-bold">Silver</div>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="text-sm font-medium text-muted-foreground">Available Points</div>
                <div className="text-xl font-bold">{userPoints}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-lg font-medium mt-8">Available Rewards</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rewards.map((reward) => (
          <Card key={reward.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <reward.icon className="h-5 w-5 text-primary" />
                <div className="text-sm font-medium">{reward.points} points</div>
              </div>
              <CardTitle className="text-lg">{reward.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{reward.description}</CardDescription>
              <Button
                variant={userPoints >= reward.points ? "default" : "outline"}
                className="w-full"
                disabled={userPoints < reward.points}
              >
                {userPoints >= reward.points ? "Redeem Reward" : "Not Enough Points"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
