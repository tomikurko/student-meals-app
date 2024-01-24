'use client'

import { Alert, Stack, Typography } from "@mui/material";
import Image from 'mui-image';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import RecipeContents from './RecipeContents';
import RecipeMenu from './RecipeMenu';
import RemoveConfirmationDialog from './RemoveConfirmationDialog';
import { getRecipe, removeRecipe } from "../../Services/RecipesService";


function RecipeRemovalAlert({ removeSuccess }) {
  if (removeSuccess) {
    return <Alert severity="success">Recipe removed successfully.</Alert>
  } else if (removeSuccess === false) {
    return <Alert severity="error">Failed to remove the recipe!</Alert>
  } else {
    return <></>
  }
}

function RecipeTitleRow({ title, onConfirmRemove }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <RecipeMenu sx={{ visibility: 'hidden' }}/>
      <Typography variant="h1" display="inline" >{title}</Typography>
      <RecipeMenu onRemove={onConfirmRemove} />
    </Stack>
  )
}

function RecipeAuthor({ author }) {
  return <Typography variant="subtitle1" sx={{fontStyle: 'italic'}}>{"by " + (author ?? "Guest User")}</Typography>
}

function RecipePricePerMeal({ pricePerMeal }) {
  return (
    <>
      {pricePerMeal && (
        <Typography variant="body2" display="inline"
          sx={{ alignSelf: 'center', background: '#fff3e0',
                borderRadius: '25px', border: '1.0px solid #eeeeee',
                px: 2.0, py: 0.7}}
        >
          {pricePerMeal} €/meal
        </Typography>
      )}
    </>
  )
}

function RecipeImage({ imgUrl }) {
  return (
    <Image src={imgUrl ?? "/default-recipe-image.png"}
      alt="Image of the meal" sx={{ boxShadow: 2 }}/>
  )
}


export default function GetRecipe() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const recipeId = searchParams.get('id')

  const [recipe, setRecipe] = useState(undefined);
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const [removeSuccess, setRemoveSuccess] = useState(undefined);

  useEffect(() => {
    recipeId && (async () => setRecipe(await getRecipe(recipeId)))();
  }, [recipeId]);

  const onConfirmRemove = async () => {
    setShowRemoveConfirmation(true);
  };

  const onCancelRemove = async () => {
    setShowRemoveConfirmation(false);
  };

  const onRemove = async () => {
    setShowRemoveConfirmation(false);

    const success = await removeRecipe(recipe.id);
    setRemoveSuccess(success);

    if (success) {
      setTimeout(() => {
        router.replace('/');
      }, 1500);
    }
  };


  return (
    <Stack spacing={5} justifyContent="center" alignItems="stretch">

      {recipe === null && <Alert severity="error">Recipe not found!</Alert>}
      {recipe && (
        <>
          <RemoveConfirmationDialog isOpen={showRemoveConfirmation} onRemove={onRemove} onCancel={onCancelRemove} />

          <Stack spacing={2}>
            <RecipeRemovalAlert removeSuccess={removeSuccess} />
            <RecipeTitleRow title={recipe.title} onConfirmRemove={onConfirmRemove} />
            <RecipeAuthor author={recipe.author} />
            <RecipePricePerMeal pricePerMeal={recipe.pricePerMeal} />
            <RecipeImage imgUrl={recipe.imgUrl} />
          </Stack>

          <RecipeContents recipe={recipe}/>
        </>
      )}

    </Stack>
  )
}
