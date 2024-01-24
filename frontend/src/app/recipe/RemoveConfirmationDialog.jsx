'use client'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function RemoveConfirmationDialog({ isOpen, onRemove, onCancel }) {

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Remove this recipe?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <p>You should remove only recipes that you have created.</p>
          <p>Please request removal from the site administrator.</p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button disabled onClick={onRemove} autoFocus>Remove</Button>
      </DialogActions>
    </Dialog>
  );
}
