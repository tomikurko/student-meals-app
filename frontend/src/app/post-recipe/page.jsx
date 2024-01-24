'use client'

import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import Image from 'mui-image';
import { useRouter } from "next/navigation";
import { useState } from "react";

import { resizeImage, encodeFileAsBase64 } from "./imgUtils";
import { EquipmentTable, IngredientsTable } from "./RecipeContentsTables";
import { postRecipe } from "../../Services/RecipesService";


function ImageSelection({ imgFile, imgFileState, onImgFileChange }) {
  return (
    <>
      {imgFile && (
        <Image src={URL.createObjectURL(imgFile)} width="100%" alt="Image of the meal" />
      )}

      {imgFileState === "file_too_big" && (
        <Alert severity="error">Resized image is bigger than 1 MB in size! Please try another image.</Alert>
      )}
      {imgFileState === "file_invalid" && (
        <Alert severity="error">Invalid image file! Please try another image.</Alert>
      )}

      <Button variant="contained" component="label">
        Select image
        <input type="file" hidden onChange={onImgFileChange} />
      </Button>
    </>
  )
}

function RecipePostingAlert({ submitSuccess }) {
  if (submitSuccess) {
    return <Alert severity="success">Recipe posted successfully.</Alert>
  } else if (submitSuccess === false) {
    return <Alert severity="error">Failed to post the recipe!</Alert>
  } else {
    return <></>
  }
}


export default function PostRecipe() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(undefined);
  const [amounts, setAmounts] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
  const [equipment, setEquipment] = useState([""]);
  const [description, setDescription] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imgFileState, setImgFileState] = useState("no_file");

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const onPriceChange = (e) => {
    setPrice(e.target.value);
  };

  const onAmountsChange = (index, event) => {
    amounts[index] = event.target.value;
    setAmounts(amounts);
  };

  const onIngredientsChange = (index, event) => {
    ingredients[index] = event.target.value;
    setIngredients(ingredients);
  };

  const onClickAddIngredient = () => {
    setAmounts(amounts.concat([""]));
    setIngredients(ingredients.concat([""]));
  };

  const onClickRemoveIngredient = (index) => {
    setAmounts(amounts.slice(0, index).concat(amounts.slice(index+1)));
    setIngredients(ingredients.slice(0, index).concat(ingredients.slice(index+1)));
  };

  const onEquipmentChange = (index, event) => {
    equipment[index] = event.target.value;
    setEquipment(equipment);
  };

  const onClickAddEquipment = () => {
    setEquipment(equipment.concat([""]));
  };

  const onClickRemoveEquipment = (index) => {
    setEquipment(equipment.slice(0, index).concat(equipment.slice(index+1)));
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onClickSubmit = async (e) => {
    e.preventDefault();

    try {
      let imgData = null;

      if (imgFileState === "file_selected") {
        imgData = await encodeFileAsBase64(imgFile);
      }

      const recipeId = await postRecipe(
        title, author, price, imgData, amounts, ingredients,
        equipment.filter((item) => item && item != ""),
        description);
      const success = recipeId != null;
      setSubmitSuccess(success);

      if (success) {
        setTimeout(() => {
          router.replace(`/recipe/?id=${recipeId}`);
        }, 1500);
      }
    } catch (e) {
      console.log(e);
      setSubmitSuccess(false);
    }
  };

  const onImgFileChange = async (e) => {
    try {
      const file = await resizeImage(e.target.files[0]);

      if (file.size > 1024 * 1024) {
        setImgFile(null);
        setImgFileState("file_too_big");
      } else {
        setImgFile(file);
        setImgFileState("file_selected");
      }
    } catch (e) {
      console.error(e);

      setImgFile(null);
      setImgFileState("file_invalid");
    }
  };


  return (
    <Stack spacing={5} justifyContent="center" alignItems="center">

      <Typography variant="h1">Post a new recipe</Typography>

      <ImageSelection
        imgFile={imgFile}
        imgFileState={imgFileState}
        onImgFileChange={onImgFileChange} />

      <Stack spacing={4} justifyContent="center" alignItems="center" component="form" onSubmit={onClickSubmit}>

        <Stack spacing={3} justifyContent="center" sx={{ minWidth: '50%' }}>
          <TextField id="title" label="Title" type="text" required onChange={onTitleChange} />

          <TextField id="author" label="Author" type="text" onChange={onAuthorChange} />

          <TextField id="price" label="Price per meal (€)"
            inputProps={{ inputMode: 'numeric', pattern: '^[0-9]{1,4}(?:\\.[0-9]{1,2})?$' }}
            onChange={onPriceChange} />
        </Stack>

        <IngredientsTable
          ingredients={ingredients}
          amounts={amounts}
          onIngredientsChange={onIngredientsChange}
          onAmountsChange={onAmountsChange}
          onClickAddIngredient={onClickAddIngredient}
          onClickRemoveIngredient={onClickRemoveIngredient} />

        <EquipmentTable
          equipment={equipment}
          onEquipmentChange={onEquipmentChange}
          onClickAddEquipment={onClickAddEquipment}
          onClickRemoveEquipment={onClickRemoveEquipment} />

        <TextField id="description" label="Description" multiline rows={10} sx={{ width: '100%' }}
          onChange={onDescriptionChange} />

        <Button variant="contained" type="submit">Submit</Button>

        <RecipePostingAlert submitSuccess={submitSuccess} />

      </Stack>

    </Stack>
  )
}
