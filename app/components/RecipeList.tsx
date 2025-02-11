import type { Recipe } from "../types/recipe"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RecipeListProps {
  recipes: Recipe[] | undefined
}

export default function RecipeList({ recipes }: RecipeListProps) {
  if (!recipes || recipes.length === 0) {
    return <p className="text-center text-muted-foreground">No recipes found. Try searching for an ingredient!</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full bg-card border-primary/20">
            <CardHeader className="bg-primary/10 p-4 rounded-t-lg">
              <CardTitle className="text-lg text-primary">{recipe.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="aspect-video relative mb-4">
                <Image
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <p className="text-sm text-muted-foreground">Ready in {recipe.readyInMinutes} minutes</p>
              <p className="text-sm text-muted-foreground">Servings: {recipe.servings}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

