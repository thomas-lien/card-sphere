import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserGiftCards from "@/components/user-gift-cards"
import UserTransactions from "@/components/user-transactions"
import UserRewards from "@/components/user-rewards"
import ConnectWalletPrompt from "@/components/connect-wallet-prompt"
import DashboardStats from "@/components/dashboard-stats"

export default function DashboardPage() {
  // In a real implementation, we would check if the user is connected
  const isConnected = false

  if (!isConnected) {
    return <ConnectWalletPrompt />
  }

  return (
    <div className="container-wide py-8">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      <DashboardStats />

      <Tabs defaultValue="cards" className="mt-8">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="cards">My Gift Cards</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="rewards">Loyalty Rewards</TabsTrigger>
        </TabsList>
        <TabsContent value="cards">
          <UserGiftCards />
        </TabsContent>
        <TabsContent value="transactions">
          <UserTransactions />
        </TabsContent>
        <TabsContent value="rewards">
          <UserRewards />
        </TabsContent>
      </Tabs>
    </div>
  )
}