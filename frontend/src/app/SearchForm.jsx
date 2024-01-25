'use client'

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, IconButton, InputAdornment, Slider, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { SearchByEquipmentTable, SearchByIngredientsTable } from "./SearchByContentsTables";


const MIN_PRICE = 0.0;
const MAX_PRICE = 12.0;

const range = (start, stop, step = 1) =>
  Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)

const priceRangeMarks = () => {
  const marks = range(MIN_PRICE, MAX_PRICE + 1, 2).map((price) => ({ value: price, label: `${price} €`}));
  marks[marks.length - 1].label = `${MAX_PRICE}+ €`;

  return marks;
}


function SearchByTitle({ title, onTitleChange }) {
  return (
    <TextField id="title-contains-search" label="Search by title" type="search" sx={{ width: { xs: '100%', sm: '50%' } }}
      onChange={onTitleChange}
      defaultValue={title}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }} />
  )
}

function SearchByPricePerMeal({ priceRange, setPriceRange }) {
  return (
    <Box sx={{ width: { xs: '95%', sm: '60%' } }}>
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
      />
    </Box>
  )
}


export default function SearchForm({ qTitle, qMinPrice, qMaxPrice, qIngredients, qEquipment }) {
  const router = useRouter();

  const [title, setTitle] = useState(qTitle ?? "");
  const [priceRange, setPriceRange] = useState([qMinPrice ?? MIN_PRICE, qMaxPrice ?? MAX_PRICE]);
  const [ingredients, setIngredients] = useState(qIngredients.length === 0 ? [""] : qIngredients);
  const [equipment, setEquipment] = useState(qEquipment.length === 0 ? [""] : qEquipment);
  const [criteriaExpanded, setCriteriaExpanded] =
    useState(qMinPrice || qMaxPrice || qIngredients.length > 0 || qEquipment.length > 0);

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
    <Stack spacing={4} justifyContent="center" alignItems="center" component="form" onSubmit={onClickSearch}>
      <SearchByTitle title={title} onTitleChange={onTitleChange} />

      {!criteriaExpanded && (
        <IconButton onClick={() => setCriteriaExpanded(true)}>
          <ExpandMoreIcon />
        </IconButton>
      )}

      {criteriaExpanded && (
        <>
          <SearchByPricePerMeal priceRange={priceRange} setPriceRange={setPriceRange} />
          <SearchByIngredientsTable
            ingredients={ingredients}
            onIngredientsChange={onIngredientsChange}
            onClickAddIngredient={onClickAddIngredient}
            onClickRemoveIngredient={onClickRemoveIngredient} />
          <SearchByEquipmentTable
            equipment={equipment}
            onEquipmentChange={onEquipmentChange}
            onClickAddEquipment={onClickAddEquipment}
            onClickRemoveEquipment={onClickRemoveEquipment} />

          <IconButton onClick={() => setCriteriaExpanded(false)}>
            <ExpandLessIcon />
          </IconButton>
        </>
      )}

      <Button variant="contained" type="submit">Search</Button>
    </Stack>
  )
}
