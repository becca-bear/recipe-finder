import type { Recipe } from "../types/recipe"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from "next/image"

interface RecipeModalProps {
  recipe: Recipe | null
  isOpen: boolean
  onClose: () => void
}

export function RecipeModal({ recipe, isOpen, onClose }: RecipeModalProps) {
  if (!recipe) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{recipe.title}</DialogTitle>
          <DialogDescription>
            Ready in {recipe.readyInMinutes} minutes | Servings: {recipe.servings}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="aspect-video relative mb-4">
            <Image
              src={recipe.image || "/placeholder.svg"}
              alt={recipe.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
          <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} className="prose prose-sm max-w-none" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

