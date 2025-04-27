import HeroSection from "@/components/hero-section"
import FeaturedCards from "@/components/featured-cards"
import HowItWorks from "@/components/how-it-works"
import VendorCTA from "@/components/vendor-cta"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <FeaturedCards />
      <HowItWorks />
      <VendorCTA />
    </div>
  )
}
