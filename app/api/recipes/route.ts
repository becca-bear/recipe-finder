import { NextRequest, NextResponse } from 'next/server';

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_API_URL = 'https://api.spoonacular.com/recipes/complexSearch';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${SPOONACULAR_API_URL}?apiKey=${SPOONACULAR_API_KEY}&query=${query}&addRecipeInformation=true&instructionsRequired=true`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}

