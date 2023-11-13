'use client'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';


export default function RecipeMenu({ onRemove, sx }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const onOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  const onClickRemove = () => {
    onCloseMenu();
    onRemove();
  };


  return (
    <>
      <IconButton
        aria-label="recipe menu"
        id="recipe-menu-button"
        aria-controls={open ? 'recipe-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={onOpenMenu}
        sx={sx}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="recipe-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'recipe-menu-button',
        }}
      >
        <MenuItem onClick={onClickRemove}>Remove</MenuItem>
      </Menu>
    </>
  );
}
