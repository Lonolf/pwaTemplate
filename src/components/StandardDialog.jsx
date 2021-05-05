import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core'
import { Close, Check } from '@material-ui/icons'
import React from 'react'
import translator from 'utility/translator'

const StandardDialog = ({
  open = false,
  dialogTitle = 'generic_dialogTitle',
  dialogText = '',
  onClose = () => {},
  onConfirm = () => {},
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle><Typography variant='h1'>{translator.fromLabel(dialogTitle)}</Typography></DialogTitle>
      {dialogText
        ? <DialogContent><Typography>{translator.fromLabel(dialogText)}</Typography></DialogContent>
        : null}
      <DialogActions style={{ justifyContent: 'space-between' }}>
        <Button variant='outlined' onClick={onClose}><Close /></Button>
        <Button variant='contained' color='primary' onClick={onConfirm}><Check /></Button>
      </DialogActions>
    </Dialog>
  )
}

export default StandardDialog
