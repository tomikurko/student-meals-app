'use client'

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Card, Table, TableBody, TableCell, TableContainer,
         TableHead, TableRow, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: '#fffefb',
}));


export function SearchByEquipmentTable({ equipment, onEquipmentChange,
                                         onClickAddEquipment, onClickRemoveEquipment }) {
  return (
    <Box sx={{ width: { xs: '100%', sm: '65%' } }}>
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
                    label="Equipment" type="text" key={"E_" + Math.random()}
                    onChange={(e) => onEquipmentChange(index, e)}
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

      <Button variant="outlined" size="small" onClick={onClickAddEquipment} sx={{ mt: 3 }}><AddIcon /></Button>
    </Box>
  )
}

export function SearchByIngredientsTable({ ingredients, onIngredientsChange,
                                           onClickAddIngredient, onClickRemoveIngredient }) {
  return (
    <Box sx={{ width: { xs: '100%', sm: '65%' } }}>
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

      <Button variant="outlined" size="small" onClick={onClickAddIngredient} sx={{ mt: 3 }}><AddIcon /></Button>
    </Box>
  )
}
