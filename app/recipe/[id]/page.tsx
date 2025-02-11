import type { DetailedRecipe } from "@/app/types/recipe"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"

async function getRecipe(id: string): Promise<DetailedRecipe> {
  const res = await fetch(`/api/recipes/${id}`, { cache: "no-store" })

  if (!res.ok) {
    throw new Error("Failed to fetch recipe")
  }

  return res.json()
}

export default async function RecipePage({ params }: { params: { id: string } }) {
  let recipe: DetailedRecipe

  try {
    recipe = await getRecipe(params.id)
  } catch {
    notFound()
  }

  return (
    <div className="bg-background">
      <Button asChild className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90">
        <Link href="/">Back to Search</Link>
      </Button>
      <div className="bg-card border border-primary/20 rounded-lg shadow-lg p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4 text-primary">{recipe.title}</h1>
            <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
              <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
            </div>
            <p className="mb-2 text-muted-foreground">Ready in {recipe.readyInMinutes} minutes</p>
            <p className="mb-4 text-muted-foreground">Servings: {recipe.servings}</p>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-primary">Summary</h2>
              <div dangerouslySetInnerHTML={{ __html: recipe.summary }} className="prose max-w-none text-foreground" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Ingredients</h2>
            <ul className="list-disc pl-5 mb-6 text-foreground">
              {recipe.extendedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient.original}</li>
              ))}
            </ul>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Instructions</h2>
            <div
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              className="prose max-w-none text-foreground"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

