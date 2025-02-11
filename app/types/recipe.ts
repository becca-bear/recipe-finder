export interface Recipe {
  id: number
  title: string
  image: string
  readyInMinutes: number
  servings: number
  summary: string
}

export interface DetailedRecipe extends Recipe {
  instructions: string
  extendedIngredients: {
    original: string
  }[]
}

