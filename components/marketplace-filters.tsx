"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function MarketplaceFilters() {
  const [priceRange, setPriceRange] = useState([0, 500])

  const categories = [
    { id: "retail", label: "Retail" },
    { id: "food", label: "Food & Dining" },
    { id: "entertainment", label: "Entertainment" },
    { id: "travel", label: "Travel" },
    { id: "electronics", label: "Electronics" },
  ]

  const discounts = [
    { id: "any", label: "Any Discount" },
    { id: "5plus", label: "5% or more" },
    { id: "10plus", label: "10% or more" },
    { id: "15plus", label: "15% or more" },
    { id: "20plus", label: "20% or more" },
  ]

  return (
    <div className="bg-card rounded-lg border p-4">
      <h3 className="font-medium mb-4">Filters</h3>

      <Accordion type="multiple" defaultValue={["price", "categories", "discounts"]}>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider defaultValue={[0, 500]} max={500} step={10} value={priceRange} onValueChange={setPriceRange} />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="min-price">$</Label>
                  <Input
                    id="min-price"
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                    className="w-20"
                  />
                </div>
                <span>to</span>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="max-price">$</Label>
                  <Input
                    id="max-price"
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="w-20"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox id={category.id} />
                  <Label htmlFor={category.id}>{category.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="discounts">
          <AccordionTrigger>Discounts</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {discounts.map((discount) => (
                <div key={discount.id} className="flex items-center space-x-2">
                  <Checkbox id={discount.id} />
                  <Label htmlFor={discount.id}>{discount.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 space-y-2">
        <Button className="w-full">Apply Filters</Button>
        <Button variant="outline" className="w-full">
          Reset
        </Button>
      </div>
    </div>
  )
}
