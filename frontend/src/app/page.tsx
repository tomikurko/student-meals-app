'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, { useState } from "react";
import Button from '@mui/material/Button';
import { getRecipes } from "./Services/RecipesService";
import { Box, Card, CardContent, Container, Divider, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([""]);

  const onClickSearch = async (e) => {
    e.preventDefault();
    const recipes = await getRecipes(title, ingredients);
    setRecipes(recipes);
    console.log(recipes);
  };

  const onClickAddIngredient = async (e) => {
    e.preventDefault();
    setIngredients(ingredients.concat([""]));
    console.log(ingredients);
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onIngredientsChange = (index, event) => {
    ingredients[index] = event.target.value;
    setIngredients(ingredients);
  };

  return (
    <>
      <Container sx={{display: 'flex', justifyContent: 'center'}}>
        <Stack spacing={5} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Typography variant="h1">Student Meals</Typography>

        <Typography variant="h2">Search recipes</Typography>

        <form onSubmit={onClickSearch}>
          <TextField id="title-contains-search" label="Search by title" type="search" onChange={onTitleChange} />
          {ingredients.map((ingredient, index) => (
            <>
              <br/>
              <br/>
              <TextField id="ingredients-contain-search-{index}"
              label="Search by ingredients" type="search" onChange={(e) => onIngredientsChange(index, e)}
              defaultValue={ingredient} />
            </>
          ))}
          <br/>
          <br/>
          <Button variant="contained" onClick={onClickAddIngredient}>+</Button>
          <br/>
          <br/>

          <Button variant="contained" type="submit">Search</Button>
        </form>
        <br/>
        <br/>

          {recipes.map((recipe) => (
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
                          <Typography variant="body1">{recipe.description}</Typography>
                        </CardContent>
                      </Card>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </>
          ))}
        </Stack>
      </Container>
    </>
  );
}
