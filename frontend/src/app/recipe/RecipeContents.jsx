'use client'

import { Card, CardContent, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ffa726',
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: '#fffcf8',
}));


function RecipeIngredients({ ingredients }) {
  return (
    <>
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
            {ingredients.map((ingredient) => (
              <StyledTableRow key={ingredient.id}>
                <StyledTableCell component="th" scope="row">{ingredient.amount}</StyledTableCell>
                <StyledTableCell>{ingredient.description}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

function RecipeEquipment({ equipment }) {
  return (
    <>
      <TableContainer component={Card} sx={{ borderRadius: '0px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Equipment</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {equipment.map((equip) => (
              <StyledTableRow key={equip.id}>
                <StyledTableCell component="th" scope="row">{equip.name}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

function RecipeDescription({ description, width }) {
  return (
    <>
      <Card sx={{ display: 'flex', width: width, background: '#fffcf8', borderRadius: '0px' }}>
        <CardContent>
          <div className="multiline">
            <Typography variant="body1">{description}</Typography>
          </div>
        </CardContent>
      </Card>
    </>
  )
}


export default function RecipeContents({ recipe }) {
  return (
    <>
      <Stack direction="row" spacing={3}>
        <Stack spacing={5} sx={{ width: '40%' }}>
          <RecipeIngredients ingredients={recipe.ingredients} />
          <RecipeEquipment equipment={recipe.equipment} />
        </Stack>

        <RecipeDescription description={recipe.description} width="60%" />
      </Stack>
    </>
  )
}
