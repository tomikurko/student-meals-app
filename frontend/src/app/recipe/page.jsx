'use client'

import { Alert, Card, CardContent, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Image from 'mui-image';
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import RecipeMenu from './RecipeMenu';
import RemoveConfirmationDialog from './RemoveConfirmationDialog';
import { getRecipe, removeRecipe } from "../../Services/RecipesService";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ffa726',
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: '#fffcf8',
}));


export default function GetRecipe() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const recipeId = searchParams.get('id')

  const [recipe, setRecipe] = useState(undefined);
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const [removeSuccess, setRemoveSuccess] = useState(undefined);

  useEffect(() => {
    recipeId && (async () => setRecipe(await getRecipe(recipeId)))();
  }, [recipeId]);

  const onConfirmRemove = async () => {
    setShowRemoveConfirmation(true);
  };

  const onCancelRemove = async () => {
    setShowRemoveConfirmation(false);
  };

  const onRemove = async () => {
    setShowRemoveConfirmation(false);

    const success = await removeRecipe(recipe.id);
    setRemoveSuccess(success);

    if (success) {
      setTimeout(() => {
        router.replace('/');
      }, 1500);
    }
  };


  return (
    <>
      <Stack spacing={5} justifyContent="center" alignItems="stretch">

        {recipe === null && (
          <>
            <Alert severity="error">Recipe not found!</Alert>
          </>
        )}
        {recipe && (
          <>

            <RemoveConfirmationDialog isOpen={showRemoveConfirmation} onRemove={onRemove} onCancel={onCancelRemove} />

            <Stack spacing={5}>
              <Stack spacing={1}>

                {removeSuccess && (
                  <Alert severity="success">Recipe removed successfully.</Alert>
                )}
                {removeSuccess === false && (
                  <Alert severity="error">Failed to remove the recipe!</Alert>
                )}

                <Stack direction="row" justifyContent="space-between">
                  <RecipeMenu sx={{ visibility: 'hidden' }}/>
                  <Typography variant="h1" display="inline" >{recipe.title}</Typography>
                  <RecipeMenu onRemove={onConfirmRemove} />
                </Stack>

                <Typography variant="subtitle1" sx={{fontStyle: 'italic'}}>{"by " + (recipe.author ?? "Guest User")}</Typography>

                {recipe.pricePerMeal && (
                  <>
                    <br/>
                    <Typography variant="body2" display="inline"
                    sx={{ alignSelf: 'center', background: '#fff3e0', borderRadius: '25px', border: '1.0px solid #eeeeee', px: 2.0, py: 0.7}}
                    >
                      {recipe.pricePerMeal} €/meal
                    </Typography>
                  </>
                )}

                {recipe.imgUrl && (
                  <>
                    <br/>
                    <Image src={recipe.imgUrl} alt="Image of the meal" sx={{ boxShadow: 2 }}/>
                  </>
                )}
              </Stack>

              <Stack direction="row" spacing={3}>
                <Stack spacing={5} sx={{ width: '40%' }}>

                  <TableContainer component={Card} sx={{ borderRadius: '0px' }}>
                    <Table>
                      <colgroup>
                        <col width="35%" />
                        <col width="65%" />
                      </colgroup>

                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Amount</StyledTableCell>
                          <StyledTableCell>Ingredient</StyledTableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {recipe.ingredients.map((ingredient) => (
                          <StyledTableRow key={ingredient.id}>
                            <StyledTableCell component="th" scope="row">{ingredient.amount}</StyledTableCell>
                            <StyledTableCell>{ingredient.description}</StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TableContainer component={Card} sx={{ borderRadius: '0px' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Equipment</StyledTableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {recipe.equipment.map((equipment) => (
                          <StyledTableRow key={equipment.id}>
                            <StyledTableCell component="th" scope="row">{equipment.name}</StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>

                <Card sx={{ display: 'flex', width: '60%', background: '#fffcf8', borderRadius: '0px' }}>
                  <CardContent>
                    <div className="multiline">
                      <Typography variant="body1">{recipe.description}</Typography>
                    </div>
                  </CardContent>
                </Card>

              </Stack>
            </Stack>

          </>
        )}

      </Stack>
    </>
  )
}
