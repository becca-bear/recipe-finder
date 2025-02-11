import { NextResponse } from "next/server"

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY
const SPOONACULAR_API_URL = "https://api.spoonacular.com/recipes"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  if (!id) {
    return NextResponse.json({ error: "Recipe ID is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`${SPOONACULAR_API_URL}/${id}/information?apiKey=${SPOONACULAR_API_KEY}`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch recipe details")
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching recipe details:", error)
    return NextResponse.json({ error: "Failed to fetch recipe details" }, { status: 500 })
  }
}

