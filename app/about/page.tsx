'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold mb-4">CardSphere</h1>
        <div className="relative w-full max-w-2xl h-64 mb-8">
          <Image
            src="https://github.com/user-attachments/assets/e1b93607-ec89-48ec-bf5c-67a4ad64733c"
            alt="CardSphere"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                A decentralized marketplace for NFT-based gift cards and vouchers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                CardSphere leverages Web3 technology to create a more efficient, cost-effective alternative to traditional gift card systems. By utilizing blockchain technology, CardSphere eliminates high vendor fees while providing a seamless user experience that feels familiar to Web2 platforms.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Inspiration</h3>
                <p>
                  The concept for CardSphere originated from the "Petr Drops" NFT stickers at UCI, which demonstrated the perceived value and uniqueness of digital collectibles. This led to exploring NFTs as a vehicle for other valuable items, including gift cards.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Zero-Fee Gift Card Issuance</h3>
                  <p>Vendors can create and distribute gift cards without incurring distribution fees</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Instant Settlement</h3>
                  <p>Vendors receive funds immediately upon gift card purchase</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Seamless Trading</h3>
                  <p>Users can easily transfer gift cards to others, creating a social gifting experience</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Loyalty Rewards</h3>
                  <p>Incentivizes customer retention through points and rewards</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">DeFi Integration</h3>
                  <p>Unredeemed funds generate yield through DeFi protocols</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Modern UI</h3>
                  <p>Clean, intuitive interface that feels familiar to Web2 users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap">
          <Card>
            <CardHeader>
              <CardTitle>Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Phase 1: Core Functionality (Current)</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="default">Completed</Badge>
                      <span>Smart contract development</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">Completed</Badge>
                      <span>Basic frontend implementation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">Completed</Badge>
                      <span>Wallet integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">Completed</Badge>
                      <span>Gift card minting and redemption</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Phase 2: Enhanced Features</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">In Progress</Badge>
                      <span>Migration to custom app-chain</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">In Progress</Badge>
                      <span>Custodial wallet implementation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">In Progress</Badge>
                      <span>Yield staking with USDT</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">In Progress</Badge>
                      <span>Enhanced loyalty program</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Phase 3: Market Expansion</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Planned</Badge>
                      <span>Local vendor onboarding program</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Planned</Badge>
                      <span>University campus partnerships</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Planned</Badge>
                      <span>Regional expansion strategy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Planned</Badge>
                      <span>Advanced analytics for vendors</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Phase 4: Universal Marketplace</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Planned</Badge>
                      <span>Cross-platform mobile app</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Planned</Badge>
                      <span>International expansion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Planned</Badge>
                      <span>Advanced DeFi integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Planned</Badge>
                      <span>Comprehensive vendor dashboard</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical">
          <Card>
            <CardHeader>
              <CardTitle>Technical Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  CardSphere is built on Ethereum (currently testnet) with plans to migrate to a custom app-chain for lower transaction fees. The platform consists of:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Smart Contracts</h3>
                    <p>For gift card issuance and management</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Web3 Integration</h3>
                    <p>Wallet integration for secure transactions</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Frontend</h3>
                    <p>Modern React frontend with Tailwind CSS</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">DeFi Integration</h3>
                    <p>Protocol integration for yield generation</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 