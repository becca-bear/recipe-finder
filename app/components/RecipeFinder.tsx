"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import RecipeList from "./RecipeList"
import type { Recipe } from "../types/recipe"

export default function RecipeFinder() {
  const [query, setQuery] = useState("")
  const [recipes, setRecipes] = useState<Recipe[] | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/recipes?query=${encodeURIComponent(query.trim())}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch recipes")
      }

      setRecipes(data.results)
    } catch (error) {
      console.error("Error searching recipes:", error)
      setError(error instanceof Error ? error.message : "Failed to fetch recipes")
      setRecipes(undefined)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background min-h-screen">
      <form onSubmit={handleSearch} className="mb-8 max-w-md mx-auto">
        <div className="flex gap-2">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter an ingredient (e.g., tomato)"
            className="flex-grow bg-white border-secondary"
          />
          <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </form>
      {error && <p className="text-center text-destructive mb-4">{error}</p>}
      <RecipeList recipes={recipes} />
    </div>
  )
}

