'use client'

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Button, Card, Stack, Table, TableBody, TableCell, TableContainer,
         TableHead, TableRow, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Image from 'mui-image';
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Resizer from "react-image-file-resizer";

import { postRecipe } from "../../Services/RecipesService";


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: '#fffefb',
}));

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

async function encodeFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
  })
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

  const onClickAddIngredient = (e) => {
    e.preventDefault();
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

  const onClickAddEquipment = (e) => {
    e.preventDefault();
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

      if (imgFileState == "file_selected") {
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
    <>
      <Stack spacing={2} justifyContent="center" alignItems="center">
        <Typography variant="h1">Post a new recipe</Typography>
        <br/>

        {imgFile && (
          <Image src={URL.createObjectURL(imgFile)} width="100%" alt="Image of the meal" />
        )}

        {imgFileState === "file_too_big" && (
          <>
            <Alert severity="error">Resized image is bigger than 1 MB in size! Please try another image.</Alert>
          </>
        )}
        {imgFileState === "file_invalid" && (
          <>
            <Alert severity="error">Invalid image file! Please try another image.</Alert>
          </>
        )}

        <Button variant="contained" component="label">
          Select image
          <input type="file" hidden onChange={onImgFileChange} />
        </Button>
        <br/>
        <br/>

        <form onSubmit={onClickSubmit}>
          <TextField id="title" label="Title" type="text" required sx={{ minWidth: '50%' }} onChange={onTitleChange} />
          <br/>
          <br/>

          <TextField id="author" label="Author" type="text" sx={{ minWidth: '50%' }} onChange={onAuthorChange} />
          <br/>
          <br/>

          <TextField id="price" label="Price per meal (€)"
            inputProps={{ inputMode: 'numeric', pattern: '^[0-9]{1,4}(?:\\.[0-9]{1,2})?$' }}
            sx={{ minWidth: '50%' }} onChange={onPriceChange} />
          <br/>
          <br/>
          <br/>

          <TableContainer component={Card} sx={{ width: '100%' }}>
            <Table>
              <colgroup>
                <col width="30%" />
                <col width="60%" />
                <col width="10%" />
              </colgroup>

              <TableHead>
                <StyledTableRow>
                  <TableCell colSpan={3}>Ingredients</TableCell>
                </StyledTableRow>
              </TableHead>

              <TableBody>
                {ingredients.map((ingredient, index) => (
                  <StyledTableRow key={index}>
                    <TableCell component="th" scope="row">
                      <TextField id="amounts-{index}"
                       fullWidth variant="standard" size="small"
                       label="Amount" type="text" key={"A_" + Math.random()}
                       onChange={(e) => onAmountsChange(index, e)}
                       defaultValue={amounts[index]} />
                    </TableCell>
                    <TableCell>
                      <TextField id="ingredients-{index}"
                       fullWidth variant="standard" size="small"
                       label="Ingredient" type="text" key={"I_" + Math.random()}
                       onChange={(e) => onIngredientsChange(index, e)}
                       defaultValue={ingredient}
                       required />
                    </TableCell>
                    <TableCell>
                      {index > 0 || ingredients.length > 1
                      ? <Button variant="outlined" size="small" onClick={() => onClickRemoveIngredient(index)}><DeleteIcon /></Button>
                      : <Button variant="outlined" size="small" disabled><DeleteIcon /></Button>
                      }
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br/>
          <Button variant="outlined" size="small" onClick={onClickAddIngredient}><AddIcon /></Button>
          <br/>
          <br/>
          <br/>

          <TableContainer component={Card}>
            <Table>
              <colgroup>
                <col width="90%" />
                <col width="10%" />
              </colgroup>

              <TableHead>
                <StyledTableRow>
                  <TableCell colSpan={2}>Equipment</TableCell>
                </StyledTableRow>
              </TableHead>

              <TableBody>
                {equipment.map((equip, index) => (
                  <StyledTableRow key={index}>
                    <TableCell component="th" scope="row">
                      <TextField id="equipment-{index}"
                       fullWidth variant="standard" size="small"
                       label="Equipment" type="text" key={"E_" + Math.random()}
                       onChange={(e) => onEquipmentChange(index, e)}
                       defaultValue={equip} />
                    </TableCell>
                    <TableCell>
                      {index > 0 || equipment.length > 1
                      ? <Button variant="outlined" size="small" onClick={() => onClickRemoveEquipment(index)}><DeleteIcon /></Button>
                      : <Button variant="outlined" size="small" disabled><DeleteIcon /></Button>
                      }
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br/>
          <Button variant="outlined" size="small" onClick={onClickAddEquipment}><AddIcon /></Button>
          <br/>
          <br/>
          <br/>

          <TextField id="description" label="Description" multiline rows={10} sx={{ width: '100%' }}
           onChange={onDescriptionChange} />
          <br/>
          <br/>
          <br/>

          <Button variant="contained" type="submit">Submit</Button>
          <br/>
          <br/>

          {submitSuccess && <Alert severity="success">Recipe posted successfully.</Alert>}
          {submitSuccess === false && <Alert severity="error">Failed to post the recipe!</Alert>}
        </form>

      </Stack>
    </>
  )
}
