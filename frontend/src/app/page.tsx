'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, { useState } from "react";
import Button from '@mui/material/Button';
import { getRecipes } from "../Services/RecipesService";
import { Card, CardContent, Container, Stack, TextField, Typography } from "@mui/material";
import Link from 'next/link';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [equipment, setEquipment] = useState([""]);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onIngredientsChange = (index, event) => {
    ingredients[index] = event.target.value;
    setIngredients(ingredients);
  };

  const onClickAddIngredient = async (e) => {
    e.preventDefault();
    setIngredients(ingredients.concat([""]));
  };

  const onEquipmentChange = (index, event) => {
    equipment[index] = event.target.value;
    setEquipment(equipment);
  };

  const onClickAddEquipment = async (e) => {
    e.preventDefault();
    setEquipment(equipment.concat([""]));
  };

  const onClickSearch = async (e) => {
    e.preventDefault();
    const recipes = await getRecipes(title, ingredients, equipment);
    setRecipes(recipes);
  };

  return (
    <>
      <Container sx={{display: 'flex', justifyContent: 'center'}}>
        <Stack spacing={2} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography variant="h1">Student Meals</Typography>

          <Link href="/post-recipe"><Typography variant="h2">Post recipes</Typography></Link>

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

            {equipment.map((equipment, index) => (
              <>
                <br/>
                <br/>
                <TextField id="disallowed-equipment-search-{index}"
                label="Search by disallowed equipment" type="search" onChange={(e) => onEquipmentChange(index, e)}
                defaultValue={equipment} />
              </>
            ))}
            <br/>
            <br/>
            <Button variant="contained" onClick={onClickAddEquipment}>+</Button>
            <br/>
            <br/>
            <br/>

            <Button variant="contained" type="submit">Search</Button>
          </form>
          <br/>
          <br/>

          {recipes.map((recipe) => (
            <>

              <Card sx={{ minWidth: 700 }}>
                <CardContent>

                  <Stack spacing={3} sx={{ textAlign: 'left' }}>
                    <Link href={"/recipes/" + recipe.id}><Typography variant="h5">{recipe.title}</Typography></Link>
                    <br/>
                    {recipe.ingredients.length} ingredients
                    &nbsp;– &nbsp;
                    {recipe.equipment.length} equipment
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
