'use client'

import React, { useEffect, useState } from "react";
import { getRecipe, removeRecipe } from "../../Services/RecipesService";
import { Alert, Box, Button, Card, CardContent, Container, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function GetRecipe() {
  const [recipe, setRecipe] = useState(undefined);
  const [removeSuccess, setRemoveSuccess] = useState(undefined);

  const router = useRouter()
  const recipeId = router.query.recipe

  useEffect(() => {
    recipeId && (async () => setRecipe(await getRecipe(recipeId)))();
  }, [recipeId]);

  const onClickRemove = async () => {
    setRemoveSuccess(
      await removeRecipe(recipe.id));
  };

  return (
    <>

      <Container sx={{display: 'flex', justifyContent: 'center'}}>
        <Stack spacing={5} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

        <Typography variant="h1">Student Meals</Typography>

        <Link href="/"><Typography variant="h2">Search recipes</Typography></Link>

        <Link href="/post-recipe"><Typography variant="h2">Post recipes</Typography></Link>

        {!recipe && (
          <>
            <Typography variant="body">ERROR: Recipe not found!</Typography>
          </>
        )}
        {recipe && (
          <>
            <Card sx={{ maxWidth: 700 }}>
              <CardContent>

                <Stack spacing={5}>
                  <Box justifyContent="center" display="flex">
                    <Typography variant="h5">{recipe.title}</Typography>
                  </Box>

                  <Stack direction="row" spacing={3}>
                    <Stack spacing={5}>

                      <TableContainer component={Card}>
                        <Table sx={{ minWidth: 300 }}>
                          <colgroup>
                            <col width="35%" />
                            <col width="65%" />
                          </colgroup>

                          <TableHead>
                            <TableRow>
                              <TableCell>Amount</TableCell>
                              <TableCell>Ingredient</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {recipe.ingredients.map((ingredient) => (
                              <TableRow key={ingredient.id}>
                                <TableCell component="th" scope="row">{ingredient.amount}</TableCell>
                                <TableCell>{ingredient.description}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <TableContainer component={Card}>
                        <Table sx={{ minWidth: 300 }}>
                          <TableHead>
                            <TableRow>
                              <TableCell>Equipment</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {recipe.equipment.map((equipment) => (
                              <TableRow key={equipment.id}>
                                <TableCell component="th" scope="row">{equipment.name}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Stack>

                    <Card sx={{ minWidth: 340 }}>
                      <CardContent>
                        <div className="multiline">
                          <Typography variant="body1">{recipe.description}</Typography>
                        </div>
                      </CardContent>
                    </Card>

                  </Stack>

                  <hr />

                  <Stack direction="row" justifyContent="center" spacing={3}>
                    <Button variant="contained" onClick={onClickRemove}>Remove</Button>
                  </Stack>

                  {removeSuccess && (
                    <Alert severity="success">Recipe removed successfully</Alert>
                  )}
                  {removeSuccess === false && (
                    <Alert severity="error">Failed to remove the recipe!</Alert>
                  )}
                </Stack>

              </CardContent>
            </Card>
          </>
        )}
        </Stack>
      </Container>

    </>
  )
}
