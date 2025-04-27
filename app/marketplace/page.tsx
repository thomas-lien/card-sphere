import { Suspense } from "react"
import MarketplaceHeader from "@/components/marketplace-header"
import MarketplaceGrid from "@/components/marketplace-grid"
import MarketplaceFilters from "@/components/marketplace-filters"
import { Skeleton } from "@/components/ui/skeleton"

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MarketplaceHeader />
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <div className="w-full md:w-64 shrink-0">
          <MarketplaceFilters />
        </div>
        <div className="flex-1">
          <Suspense fallback={<MarketplaceSkeleton />}>
            <MarketplaceGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function MarketplaceSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(9)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="rounded-lg border overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        ))}
    </div>
  )
}
