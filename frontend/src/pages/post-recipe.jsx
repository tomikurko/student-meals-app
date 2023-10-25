'use client'

import React, { useState } from "react";
import { Button } from "@mui/material";
import { postRecipe } from "../Services/RecipesService";
import { Container, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";

export default function PostRecipe() {
  const [title, setTitle] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(undefined);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onClickSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess(await postRecipe(title))
  };

  return (
    <>
      <Container sx={{display: 'flex', justifyContent: 'center'}}>
        <Stack spacing={5} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

          <Typography variant="h1">Student Meals</Typography>

          <Link href="/"><Typography variant="h2">Search recipes</Typography></Link>

          <Typography variant="h2">Post recipes</Typography>

          <form onSubmit={onClickSubmit}>
            <TextField id="title" label="Title" type="text" required onChange={onTitleChange} />
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
