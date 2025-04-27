'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VendorsPage() {
  const [price, setPrice] = useState<number | string>("");
  const [quantity, setQuantity] = useState<number | string>("");

  const handleMint = () => {
    // Logic for minting a card
    console.log("Minting card with:", { price, quantity });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Vendor Dashboard</CardTitle>
          <CardDescription>
            Easily mint cards with custom options for price and quantity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">
              Price (in USD)
            </label>
            <Input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="quantity" className="text-sm font-medium">
              Quantity
            </label>
            <Input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              className="w-full"
            />
          </div>

          <Button
            onClick={handleMint}
            className="w-full"
            size="lg"
          >
            Mint Card
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 