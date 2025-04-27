import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, ShoppingBag, Gift, Repeat } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      title: "Connect Wallet",
      description: "Connect your Web3 wallet to get started with CardSphere",
      icon: Wallet,
    },
    {
      title: "Browse & Purchase",
      description: "Browse available gift cards and purchase with cryptocurrency",
      icon: ShoppingBag,
    },
    {
      title: "Receive NFT Gift Card",
      description: "Your gift card is minted as an NFT in your wallet",
      icon: Gift,
    },
    {
      title: "Use or Trade",
      description: "Redeem your gift card or trade it with others on the platform",
      icon: Repeat,
    },
  ]

  return (
    <section className="w-full section-padding bg-muted/50">
      <div className="container-wide">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">How It Works</h2>
          <p className="text-muted-foreground max-w-[700px]">
            CardSphere makes buying, selling, and trading gift cards simple and secure using blockchain technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                    {index + 1}
                  </span>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}