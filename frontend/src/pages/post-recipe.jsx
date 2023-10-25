'use client'

import React, { useState } from "react";
import { Button } from "@mui/material";
import { postRecipe } from "../Services/RecipesService";
import { Container, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";

export default function PostRecipe() {
  const [title, setTitle] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(undefined);
  const [amounts, setAmounts] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
  const [equipment, setEquipment] = useState([""]);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onAmountsChange = (index, event) => {
    amounts[index] = event.target.value;
    setAmounts(amounts);
  };

  const onIngredientsChange = (index, event) => {
    ingredients[index] = event.target.value;
    setIngredients(ingredients);
  };

  const onEquipmentChange = (index, event) => {
    equipment[index] = event.target.value;
    setEquipment(equipment);
  };

  const onClickAddIngredient = async (e) => {
    e.preventDefault();
    setAmounts(amounts.concat([""]));
    setIngredients(ingredients.concat([""]));
  };

  const onClickRemoveIngredient = (index) => {
    setAmounts(amounts.slice(0, index).concat(amounts.slice(index+1)));
    setIngredients(ingredients.slice(0, index).concat(ingredients.slice(index+1)));
  };

  const onClickAddEquipment = async (e) => {
    e.preventDefault();
    setEquipment(equipment.concat([""]));
  };

  const onClickRemoveEquipment = (index) => {
    setEquipment(equipment.slice(0, index).concat(equipment.slice(index+1)));
  };

  const onClickSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess(
      await postRecipe(title, amounts, ingredients, equipment.filter((item) => item && item != "")))
  };

  return (
    <>
      <Container sx={{display: 'flex', justifyContent: 'center'}}>
        <Stack spacing={2} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

          <Typography variant="h1">Student Meals</Typography>

          <Link href="/"><Typography variant="h2">Search recipes</Typography></Link>

          <Typography variant="h2">Post recipes</Typography>

          <form onSubmit={onClickSubmit}>
            <TextField id="title" label="Title" type="text" required onChange={onTitleChange} />

            {ingredients.map((ingredient, index) => (
              <>
                <br/>
                <br/>
                <TextField id="amounts-{index}"
                label="Amount" type="text" key={"A_" + Math.random()} onChange={(e) => onAmountsChange(index, e)}
                defaultValue={amounts[index]} />

                &nbsp;&nbsp;&nbsp;&nbsp;

                <TextField id="ingredients-{index}"
                label="Ingredient" type="text" key={"I_" + Math.random()} required onChange={(e) => onIngredientsChange(index, e)}
                defaultValue={ingredient} />

                &nbsp;&nbsp;&nbsp;&nbsp;

                {index > 0
                 ? <Button variant="contained" onClick={() => onClickRemoveIngredient(index)}>-</Button>
                 : <Button variant="contained" disabled>-</Button>
                 }
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
                <TextField id="equipment-{index}"
                label="Equipment" type="text" key={"E_" + Math.random()} onChange={(e) => onEquipmentChange(index, e)}
                defaultValue={equipment} />

                &nbsp;&nbsp;&nbsp;&nbsp;

                {index > 0
                 ? <Button variant="contained" onClick={() => onClickRemoveEquipment(index)}>-</Button>
                 : <Button variant="contained" disabled>-</Button>
                 }
              </>
            ))}
            <br/>
            <br/>
            <Button variant="contained" onClick={onClickAddEquipment}>+</Button>
            <br/>
            <br/>

            <Button variant="contained" type="submit">Submit</Button>
            <br/>
            <br/>

            {submitSuccess && <Typography variant="body">Recipe posted successfully.</Typography>}
            {submitSuccess === false && <Typography variant="body">ERROR: Failed to submit the recipe!</Typography>}
          </form>

        </Stack>
      </Container>
    </>
  )
}
