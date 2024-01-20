'use client'

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Card, Table, TableBody, TableCell, TableContainer,
         TableHead, TableRow, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: '#fffefb',
}));


export function EquipmentTable({ equipment, onEquipmentChange, onClickAddEquipment, onClickRemoveEquipment }) {
  return (
    <>
      <TableContainer component={Card} sx={{ width: '100%' }}>
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
    </>
  )
}

export function IngredientsTable({ ingredients, amounts, onIngredientsChange, onAmountsChange,
                                   onClickAddIngredient, onClickRemoveIngredient }) {
  return (
    <>
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
    </>
  )
}
