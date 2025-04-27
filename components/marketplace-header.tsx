import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function MarketplaceHeader() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Gift Card Marketplace</h1>
        <p className="text-muted-foreground mt-2">Browse and purchase gift cards from your favorite brands</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search gift cards..." className="pl-10" />
        </div>
        <Button>Search</Button>
      </div>
    </div>
  )
}
