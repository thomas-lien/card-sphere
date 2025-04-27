import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BadgeDollarSign, Zap, ShieldCheck } from "lucide-react"

export default function VendorCTA() {
  const benefits = [
    {
      icon: BadgeDollarSign,
      title: "Zero-Fee Issuance",
      description: "Create and distribute gift cards without incurring distribution fees",
    },
    {
      icon: Zap,
      title: "Instant Settlement",
      description: "Receive funds immediately upon gift card purchase",
    },
    {
      icon: ShieldCheck,
      title: "Enhanced Security",
      description: "Blockchain technology provides unmatched security and verification",
    },
  ]

  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">For Vendors</h2>
              <p className="text-muted-foreground">
                Join CardSphere as a vendor and revolutionize how you distribute gift cards
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="mt-1 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Link href="/vendors/register">
                <Button size="lg">Become a Vendor</Button>
              </Link>
              <Link href="/vendors/learn-more">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          <Card className="overflow-hidden border-none shadow-lg">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-background p-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Vendor Dashboard Preview</h3>
                  <p className="text-muted-foreground">
                    Manage your gift cards, track sales, and analyze customer data all in one place
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-background rounded-lg p-4 shadow-sm">
                      <div className="text-sm font-medium text-muted-foreground">Total Sales</div>
                      <div className="text-2xl font-bold">$12,450</div>
                    </div>
                    <div className="bg-background rounded-lg p-4 shadow-sm">
                      <div className="text-sm font-medium text-muted-foreground">Active Cards</div>
                      <div className="text-2xl font-bold">245</div>
                    </div>
                    <div className="bg-background rounded-lg p-4 shadow-sm">
                      <div className="text-sm font-medium text-muted-foreground">Redemption Rate</div>
                      <div className="text-2xl font-bold">78%</div>
                    </div>
                    <div className="bg-background rounded-lg p-4 shadow-sm">
                      <div className="text-sm font-medium text-muted-foreground">Customer Retention</div>
                      <div className="text-2xl font-bold">92%</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
