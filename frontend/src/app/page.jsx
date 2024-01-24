'use client'

import { Alert, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import RecipeCard from "./RecipeCard";
import SearchForm from "./SearchForm";
import { getRecipes } from "../Services/RecipesService";


export default function Home() {
  const searchParams = useSearchParams()
  const qTitle = searchParams.get('title');
  const qMinPrice = searchParams.get('minPrice');
  const qMaxPrice = searchParams.get('maxPrice');
  const qIngredients = searchParams.getAll('ingredients');
  const qEquipment = searchParams.getAll('equipment');

  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    (async () => setRecipes(await getRecipes(qTitle, qMinPrice, qMaxPrice, qIngredients, qEquipment)))();
  }, [qTitle, qMinPrice, qMaxPrice, JSON.stringify(qIngredients), JSON.stringify(qEquipment)]);


  return (
    <Stack justifyContent="center" alignItems="stretch">

      <Typography variant="h1" sx={{ mb: 5 }}>Recipes</Typography>

      <SearchForm
        qTitle={qTitle}
        qMinPrice={qMinPrice}
        qMaxPrice={qMaxPrice}
        qIngredients={qIngredients}
        qEquipment={qEquipment} />

      <Stack spacing={3} justifyContent="center" alignItems="stretch" sx={{ mt: 8 }}>

        {recipes && recipes.length === 0 && (
          <Alert severity="info">No recipes found!</Alert>
        )}
        {recipes && recipes.map((recipe) => <RecipeCard recipe={recipe} />)}

      </Stack>
    </Stack>
  );
}
