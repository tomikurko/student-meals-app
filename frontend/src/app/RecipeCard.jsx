'use client'

import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import Image from 'mui-image';

function RecipeImage({ recipe }) {
  return (
    <Image src={recipe.imgUrl ?? "/default-recipe-image.png"}
      alt="Image of the meal" />
  )
}

function RecipeTitle({ recipe }) {
  return (
    <Link href={{ pathname: '/recipe', query: { id: `${recipe.id}` } }}
      variant="h5" underline="hover"
    >
      {recipe.title}
    </Link>
  )
}

function RecipePricePerMeal({ recipe }) {
  return (
    <Typography variant="body2" display="inline"
      sx={{ background: '#fff3e0', borderRadius: '25px', border: '1.0px solid #eeeeee', px: 2.0, py: 0.7}}
    >
      {recipe.pricePerMeal ?? "-"} €
    </Typography>
  )
}

function RecipeIngredients({ recipe }) {
  return (
    <Typography variant="body2" display="inline"
      sx={{ background: '#fff3e0', borderRadius: '25px', border: '1.0px solid #eeeeee', px: 2.0, py: 0.7}}
    >
      {recipe.ingredients.length} ingredient{recipe.ingredients.length === 1 ? "" : "s"}
    </Typography>
  )
}

function RecipeEquipment({ recipe }) {
  return (
    <Typography variant="body2" display="inline"
      sx={{ background: '#fff3e0', borderRadius: '25px', border: '1.0px solid #eeeeee', px: 2.0, py: 0.7}}
    >
      {recipe.equipment.length} equipment
    </Typography>
  )
}

function RecipeAuthor({ recipe }) {
  return (
    <Typography variant="body1" sx={{fontStyle: 'italic'}}>{"by " + (recipe.author ?? "Guest User")}</Typography>
  )
}


export default function RecipeCard({ recipe }) {

  return (
    <Card sx={{ backgroundColor: '#fffcf8', p: 1 }}>
      <CardContent>
        <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', md: 'flex' } }}>

          <Box sx={{ width: '30%' }}>
            <RecipeImage recipe={recipe} />
          </Box>

          <Box sx={{ width: '70%' }}>
            <Stack spacing={3} sx={{ textAlign: 'left' }}>
              <RecipeTitle recipe={recipe} />

              <Stack direction="row" spacing={2}>
                <RecipePricePerMeal recipe={recipe} />
                <RecipeIngredients recipe={recipe} />
                <RecipeEquipment recipe={recipe} />
              </Stack>

              <RecipeAuthor recipe={recipe} />
            </Stack>
          </Box>

        </Stack>

        <Stack spacing={3} sx={{ display: { xs: 'flex', md: 'none' } }}>
          <RecipeTitle recipe={recipe} />
          <RecipeAuthor recipe={recipe} />
          <RecipeImage recipe={recipe} />
          <Stack direction="row" justifyContent="center" spacing={2} useFlexGap flexWrap="wrap">
            <RecipePricePerMeal recipe={recipe} />
            <RecipeIngredients recipe={recipe} />
            <RecipeEquipment recipe={recipe} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
