"use client"

import { useState } from "react"
import { X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { FilterOptions } from "@/lib/types"

interface FilterDialogProps {
  filterOptions: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
  onReset: () => void
}

export function FilterDialog({ filterOptions, onFilterChange, onReset }: FilterDialogProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filterOptions)
  const [open, setOpen] = useState(false)

  const handleCategoryChange = (category: string, checked: boolean) => {
    setLocalFilters((prev) => {
      const updatedCategories = checked 
        ? [...prev.categories, category] 
        : prev.categories.filter((c) => c !== category)

      return { ...prev, categories: updatedCategories }
    })
  }

  const handleConditionChange = (condition: string) => {
    setLocalFilters((prev) => ({ ...prev, condition }))
  }

  const handleExchangeMethodChange = (method: string) => {
    setLocalFilters((prev) => ({ ...prev, exchangeMethod: method }))
  }

  const handleDistanceChange = (value: number[]) => {
    setLocalFilters((prev) => ({ ...prev, maxDistance: value[0] }))
  }

  const applyFilters = () => {
    onFilterChange(localFilters)
    setOpen(false)
  }

  const resetFilters = () => {
    const resetFilters = {
      categories: [],
      condition: "any",
      exchangeMethod: "any",
      maxDistance: 50,
      sortBy: "recent",
    }
    setLocalFilters(resetFilters)
    onReset()
  }

  const activeFilterCount = 
    (filterOptions.categories.length > 0 ? 1 : 0) +
    (filterOptions.condition !== "any" ? 1 : 0) +
    (filterOptions.exchangeMethod !== "any" ? 1 : 0)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative group">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge 
                variant="default" 
                className="absolute -right-2 -top-2 h-5 w-5 flex items-center justify-center p-0 bg-primary/90 group-hover:bg-primary"
              >
                {activeFilterCount}
              </Badge>
            )}
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] animate-pop-in">
        <DialogHeader className="relative">
          <DialogTitle className="text-lg font-semibold">Filter Listings</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-0 rounded-full hover:bg-gray-100" 
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
          {/* Categories Section */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-800">Categories</h3>
            <div className="grid grid-cols-2 gap-3">
              {["Electronics", "Furniture", "Clothing", "Books", "Services", "Sports", "Other"].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={localFilters.categories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    className="data-[state=checked]:bg-primary border-gray-300"
                  />
                  <Label 
                    htmlFor={`category-${category}`} 
                    className="font-normal text-gray-700 cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Condition Section */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-800">Condition</h3>
            <RadioGroup
              value={localFilters.condition}
              onValueChange={handleConditionChange}
              className="grid grid-cols-3 gap-2"
            >
              {["any", "New", "Like New", "Good", "Fair", "Poor"].map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={condition} 
                    id={`condition-${condition}`}
                    className="border-gray-300 data-[state=checked]:border-primary"
                  />
                  <Label 
                    htmlFor={`condition-${condition}`} 
                    className="font-normal text-gray-700 cursor-pointer"
                  >
                    {condition === "any" ? "Any" : condition}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Exchange Method Section */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-800">Exchange Method</h3>
            <RadioGroup
              value={localFilters.exchangeMethod}
              onValueChange={handleExchangeMethodChange}
              className="space-y-2"
            >
              {["any", "in-person", "shipping", "both"].map((method) => (
                <div key={method} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={method} 
                    id={`method-${method}`}
                    className="border-gray-300 data-[state=checked]:border-primary"
                  />
                  <Label 
                    htmlFor={`method-${method}`}
                    className="font-normal text-gray-700 cursor-pointer"
                  >
                    {method === "any"
                      ? "Any"
                      : method === "in-person"
                        ? "In-person only"
                        : method === "shipping"
                          ? "Shipping only"
                          : "Both options"}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Distance Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-800">Maximum Distance</h3>
              <span className="text-sm font-medium text-primary">
                {localFilters.maxDistance} miles
              </span>
            </div>
            <Slider 
              defaultValue={[localFilters.maxDistance]} 
              max={100} 
              step={5} 
              onValueChange={handleDistanceChange}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              thumbClassName="focus-visible:ring-2 focus-visible:ring-primary/50"
            />
            <div className="flex justify-between text-xs text-gray-500 px-1">
              <span>5</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>

          {/* Sort By Section */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-800">Sort By</h3>
            <RadioGroup
              value={localFilters.sortBy}
              onValueChange={(value) => setLocalFilters((prev) => ({ ...prev, sortBy: value }))}
              className="space-y-2"
            >
              {[
                { value: "recent", label: "Most Recent" },
                { value: "oldest", label: "Oldest First" },
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={option.value} 
                    id={`sort-${option.value}`}
                    className="border-gray-300 data-[state=checked]:border-primary"
                  />
                  <Label 
                    htmlFor={`sort-${option.value}`}
                    className="font-normal text-gray-700 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between gap-3 pt-2">
          <Button 
            variant="outline" 
            onClick={resetFilters}
            className="flex-1 border-gray-300 hover:bg-gray-50"
          >
            Reset
          </Button>
          <Button 
            onClick={applyFilters} 
            className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-sm"
          >
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}