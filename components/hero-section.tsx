import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Gift, ShieldCheck, Zap } from "lucide-react"

export default function HeroSection() {
  return (
    <div className="relative w-full section-padding">
      <div className="container-wide">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] 2xl:grid-cols-[1fr_700px] max-w-[2000px] mx-auto">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                The Future of Gift Cards is Here
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                CardSphere is a decentralized marketplace for NFT-based gift cards and vouchers, leveraging Web3
                technology to create a more efficient, cost-effective alternative to traditional gift card systems.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/marketplace">
                <Button size="lg" className="gap-1">
                  Explore Marketplace
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/vendors">
                <Button size="lg" variant="outline">
                  For Vendors
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Instant Settlement</span>
              </div>
              <div className="flex items-center gap-1">
                <Gift className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Zero Fees</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full h-[400px] overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 p-6">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[180px] rounded-xl bg-background shadow-lg border rotate-6">
                <div className="p-4 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs text-muted-foreground">Gift Card</div>
                      <div className="font-bold">Starbucks</div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mt-auto">
                    <div className="text-xs text-muted-foreground">Balance</div>
                    <div className="text-xl font-bold">$25.00</div>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[180px] rounded-xl bg-background shadow-lg border -rotate-3">
                <div className="p-4 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs text-muted-foreground">Gift Card</div>
                      <div className="font-bold">Amazon</div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-blue-500"></div>
                  </div>
                  <div className="mt-auto">
                    <div className="text-xs text-muted-foreground">Balance</div>
                    <div className="text-xl font-bold">$50.00</div>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[180px] rounded-xl bg-background shadow-lg border rotate-0">
                <div className="p-4 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs text-muted-foreground">Gift Card</div>
                      <div className="font-bold">Target</div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-red-500"></div>
                  </div>
                  <div className="mt-auto">
                    <div className="text-xs text-muted-foreground">Balance</div>
                    <div className="text-xl font-bold">$100.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
