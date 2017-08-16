/**
 * Created by nicholas on 8/4/17.
 */
import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

const FormErrorDialog = ({ onCancel,
                           formErrors }) => {
  const isErrorDialogOpen = formErrors.length > 0;
  const actions = [
    <FlatButton
      label="Okay"
      primary={true}
      onTouchTap={onCancel}
    />,
  ]
  return (
    <Dialog
      title="Form Submission Error"
      actions={actions}
      open={isErrorDialogOpen}
    >
      {formErrors[0]}
    </Dialog>
  )
}

export default FormErrorDialog