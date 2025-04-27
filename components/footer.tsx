import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col md:flex-row items-center justify-between py-10 gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="font-bold text-xl">
            CardSphere
          </Link>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            A decentralized marketplace for NFT-based gift cards and vouchers
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Platform</h3>
            <Link href="/marketplace" className="text-sm text-muted-foreground hover:text-primary">
              Marketplace
            </Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary">
              Dashboard
            </Link>
            <Link href="/vendors" className="text-sm text-muted-foreground hover:text-primary">
              For Vendors
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Company</h3>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
              About
            </Link>
            <Link href="/roadmap" className="text-sm text-muted-foreground hover:text-primary">
              Roadmap
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
              Contact
            </Link>
          </div>

          <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
            <h3 className="font-medium">Legal</h3>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Github className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} CardSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
