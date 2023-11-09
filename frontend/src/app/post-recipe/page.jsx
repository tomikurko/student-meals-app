'use client'

import AWS from "aws-sdk";
import Resizer from "react-image-file-resizer";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { postRecipe } from "../../Services/RecipesService";
import { Alert, Container, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

export default function PostRecipe() {
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

  const onEquipmentChange = (index, event) => {
    equipment[index] = event.target.value;
    setEquipment(equipment);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
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

    try {
      let url = null;

      if (imgFileState == "file_selected") {
        url = await uploadImgFile(imgFile);
      }

      setSubmitSuccess(
        await postRecipe(
          title, author, price, url, amounts, ingredients,
          equipment.filter((item) => item && item != ""),
          description))

    } catch (e) {
      console.log(e);
      setSubmitSuccess(false);
    }
  };

  const resizeImage = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        800,
        800,
        "WEBP",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const uploadImgFile = async (file) => {
    const S3_BUCKET = "img.studentmeals.site";
    const REGION = "eu-north-1";

    AWS.config.update({
      accessKeyId: "studentmeals-secret",
      secretAccessKey: "studentmeals-secret",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const filename = uuidv4() + ".webp";
    const params = {
      Bucket: S3_BUCKET,
      Key: filename,
      Body: file,
    };

    try {
      const data = await s3
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          console.log(
            "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
          );
        })
        .promise();

      const url = `https://s3.eu-north-1.amazonaws.com/img.studentmeals.site/${filename}`;
      console.log(`Image uploaded successfully to ${url}`);

      return Promise.resolve(url);
    } catch (e) {
      console.error(e);
      return Promise.reject(new Error("Failed to upload image"));
    }
  };

  const handleImgFileChange = async (e) => {
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
    <>
      <Container sx={{display: 'flex', justifyContent: 'center'}}>
        <Stack spacing={2} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

          <Typography variant="h1">Student Meals</Typography>

          <Link href="/"><Typography variant="h2">Search recipes</Typography></Link>

          <Typography variant="h2">Post recipes</Typography>
          <br/>

          <form onSubmit={onClickSubmit}>
            <TextField id="title" label="Title" type="text" required onChange={onTitleChange} />
            <br/>
            <br/>

            <TextField id="author" label="Author" type="text" onChange={onAuthorChange} />
            <br/>
            <br/>

            <TextField id="price" label="Price per meal (€)"
             inputProps={{ inputMode: 'numeric', pattern: '^[0-9]{1,4}(?:\\.[0-9]{1,2})?$' }} onChange={onPriceChange} />
            <br/>

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
            <br/>

            <TextField id="description" label="Description" multiline rows={10} sx={{ width: '60ch' }} onChange={onDescriptionChange} />
            <br/>
            <br/>
            <br/>

            <input type="file" onChange={handleImgFileChange} />
            {imgFileState === "file_too_big" && (
              <>
                <br/>
                <br/>
                <Alert severity="error">Resized image is bigger than 1 MB in size! Please try another image.</Alert>
              </>
            )}
            {imgFileState === "file_invalid" && (
              <>
                <br/>
                <br/>
                <Alert severity="error">Invalid image file! Please try another image.</Alert>
              </>
            )}
            <br/>
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
