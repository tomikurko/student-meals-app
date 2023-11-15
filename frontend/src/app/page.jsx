'use client'

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { Alert, Box, Button, Card, CardContent, Container, IconButton, InputAdornment,
         Link, Slider, Stack, Table, TableBody, TableCell, TableContainer,
         TableHead, TableRow, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Image from 'mui-image';
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { getRecipes } from "../Services/RecipesService";


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: '#fffefb',
}));

const MIN_PRICE = 0.0;
const MAX_PRICE = 12.0;

const range = (start, stop, step = 1) =>
  Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)

const priceRangeMarks = () => {
  const marks = range(MIN_PRICE, MAX_PRICE + 1, 2).map((price) => ({ value: price, label: `${price} €`}));
  marks[marks.length - 1].label = `${MAX_PRICE}+ €`;

  return marks;
}


export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const qTitle = searchParams.get('title');
  const qMinPrice = searchParams.get('minPrice');
  const qMaxPrice = searchParams.get('maxPrice');
  const qIngredients = searchParams.getAll('ingredients');
  const qEquipment = searchParams.getAll('equipment');

  const [recipes, setRecipes] = useState(null);
  const [title, setTitle] = useState(qTitle ?? "");
  const [priceRange, setPriceRange] = useState([qMinPrice ?? MIN_PRICE, qMaxPrice ?? MAX_PRICE]);
  const [ingredients, setIngredients] = useState(qIngredients.length === 0 ? [""] : qIngredients);
  const [equipment, setEquipment] = useState(qEquipment.length === 0 ? [""] : qEquipment);
  const [criteriaExpanded, setCriteriaExpanded] = useState(qMinPrice || qMaxPrice || qIngredients.length > 0 || qEquipment.length > 0);

  useEffect(() => {
    (async () => setRecipes(await getRecipes(qTitle, qMinPrice, qMaxPrice, qIngredients, qEquipment)))();
  }, [qTitle, qMinPrice, qMaxPrice, JSON.stringify(qIngredients), JSON.stringify(qEquipment)]);

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

  const onClickRemoveIngredient = (index) => {
    setIngredients(ingredients.slice(0, index).concat(ingredients.slice(index+1)));
  };

  const onEquipmentChange = (index, event) => {
    equipment[index] = event.target.value;
    setEquipment(equipment);
  };

  const onClickAddEquipment = async (e) => {
    e.preventDefault();
    setEquipment(equipment.concat([""]));
  };

  const onClickRemoveEquipment = (index) => {
    setEquipment(equipment.slice(0, index).concat(equipment.slice(index+1)));
  };

  const onClickSearch = async (e) => {
    e.preventDefault();

    const minPrice = priceRange[0] <= MIN_PRICE ? "" : priceRange[0];
    const maxPrice = priceRange[1] >= MAX_PRICE ? "" : priceRange[1];

    const searchParams = [
      ["title", title],
      ["minPrice", minPrice],
      ["maxPrice", maxPrice],
      ...ingredients.map((ing) => ["ingredients", ing]),
      ...equipment.map((equip) => ["equipment", equip])
    ].map((param) => param[1] === "" ? "" : `${param[0]}=${param[1]}`)
     .filter((param) => param !== "")
     .join("&");

    router.push(`/?${searchParams}`);
  };


  return (
    <>
      <Stack spacing={2} justifyContent="center" alignItems="stretch">

        <Stack spacing={2} justifyContent="center" alignItems="stretch">

          <Typography variant="h1">Recipes</Typography>

          <form onSubmit={onClickSearch}>
            <br/>
            <TextField id="title-contains-search" label="Search by title" type="search" sx={{ width: '50%' }}
             onChange={onTitleChange}
             defaultValue={title}
             InputProps={{
               startAdornment: (
                 <InputAdornment position="start">
                   <SearchIcon />
                 </InputAdornment>
               ),
             }} />
            <br/>
            <br/>

            {!criteriaExpanded && (
              <IconButton onClick={() => setCriteriaExpanded(true)}>
                <ExpandMoreIcon />
              </IconButton>
            )}

            {criteriaExpanded && (
              <>
                <br/>
                <Typography gutterBottom>Price per meal</Typography>
                <Slider
                  aria-label="Price per meal"
                  getAriaValueText={(value) => `${value} €`}
                  step={0.5}
                  marks={priceRangeMarks()}
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  valueLabelDisplay="auto"
                  value={priceRange}
                  onChange={(event, newValue) => setPriceRange(newValue)}
                  sx={{ width: '60%' }}
                />
                <br/>
                <br/>
                <br/>

                <Container sx={{ width: '70%' }}>
                  <TableContainer component={Card}>
                    <Table>
                      <colgroup>
                        <col width="90%" />
                        <col width="10%" />
                      </colgroup>

                      <TableHead>
                        <StyledTableRow>
                          <TableCell colSpan={2}>Ingredients included in the recipe</TableCell>
                        </StyledTableRow>
                      </TableHead>

                      <TableBody>
                        {ingredients.map((ingredient, index) => (
                          <StyledTableRow key={index}>
                            <TableCell component="th" scope="row">
                              <TextField id="ingredients-{index}"
                              fullWidth variant="standard" size="small"
                              label="Ingredient" type="text" key={"I_" + Math.random()}
                              onChange={(e) => onIngredientsChange(index, e)}
                              defaultValue={ingredient} />
                            </TableCell>
                            <TableCell>
                              {index > 0 || ingredients.length > 1
                               ? <Button variant="outlined" size="small" onClick={() => onClickRemoveIngredient(index)}>
                                   <DeleteIcon />
                                 </Button>
                               : <Button variant="outlined" size="small" disabled><DeleteIcon /></Button>
                              }
                            </TableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Container>
                <br/>
                <Button variant="outlined" size="small" onClick={onClickAddIngredient}><AddIcon /></Button>
                <br/>
                <br/>
                <br/>

                <Container sx={{ width: '70%' }}>
                  <TableContainer component={Card}>
                    <Table>
                      <colgroup>
                        <col width="90%" />
                        <col width="10%" />
                      </colgroup>

                      <TableHead>
                        <StyledTableRow>
                          <TableCell colSpan={2}>Equipment not included in the recipe</TableCell>
                        </StyledTableRow>
                      </TableHead>

                      <TableBody>
                        {equipment.map((equip, index) => (
                          <StyledTableRow key={index}>
                            <TableCell component="th" scope="row">
                              <TextField id="equipment-{index}"
                              fullWidth variant="standard" size="small"
                              label="Equipment" type="text" key={"E_" + Math.random()} onChange={(e) => onEquipmentChange(index, e)}
                              defaultValue={equip} />
                            </TableCell>
                            <TableCell>
                              {index > 0 || equipment.length > 1
                               ? <Button variant="outlined" size="small" onClick={() => onClickRemoveEquipment(index)}>
                                   <DeleteIcon />
                                 </Button>
                               : <Button variant="outlined" size="small" disabled><DeleteIcon /></Button>
                              }
                            </TableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Container>
                <br/>
                <Button variant="outlined" size="small" onClick={onClickAddEquipment}><AddIcon /></Button>
                <br/>
                <br/>

                <IconButton onClick={() => setCriteriaExpanded(false)}>
                  <ExpandLessIcon />
                </IconButton>
              </>
            )}
            <br/>
            <br/>
            <br/>

            <Button variant="contained" type="submit">Search</Button>
          </form>
          <br/>
          <br/>

        </Stack>

        <Stack spacing={3} justifyContent="center" alignItems="stretch">

          {recipes && recipes.length === 0 && (
            <Alert severity="info">No recipes found!</Alert>
          )}
          {recipes && recipes.map((recipe) => (
            <>

              <Card sx={{ backgroundColor: '#fffcf8', p: 1 }}>
                <CardContent>
                  <Stack direction="row" spacing={4}>

                    <Box sx={{ width: '30%' }}>
                      <Image src={recipe.imgUrl ?? "/default-recipe-image.png"}
                       alt="Image of the meal" />
                    </Box>

                    <Box sx={{ width: '70%' }}>
                      <Stack spacing={3} sx={{ textAlign: 'left' }}>
                        <Link href={{ pathname: '/recipe', query: { id: `${recipe.id}` } }}
                         variant="h5" underline="hover"
                        >
                          {recipe.title}
                        </Link>

                        <Stack direction="row" spacing={2}>
                          <Typography variant="body2" display="inline"
                           sx={{ background: '#fff3e0', borderRadius: '25px', border: '1.0px solid #eeeeee', px: 2.0, py: 0.7}}
                          >
                            {recipe.pricePerMeal ?? "-"} €
                          </Typography>

                          <Typography variant="body2" display="inline"
                           sx={{ background: '#fff3e0', borderRadius: '25px', border: '1.0px solid #eeeeee', px: 2.0, py: 0.7}}
                          >
                            {recipe.ingredients.length} ingredient{recipe.ingredients.length === 1 ? "" : "s"}
                          </Typography>

                          <Typography variant="body2" display="inline"
                           sx={{ background: '#fff3e0', borderRadius: '25px', border: '1.0px solid #eeeeee', px: 2.0, py: 0.7}}
                          >
                            {recipe.equipment.length} equipment
                          </Typography>
                        </Stack>

                        <Typography variant="body1" sx={{fontStyle: 'italic'}}>{"by " + (recipe.author ?? "Guest User")}</Typography>
                      </Stack>
                    </Box>

                  </Stack>
                </CardContent>
              </Card>

            </>
          ))}

        </Stack>
      </Stack>
    </>
  );
}
