import React, { useState, Fragment } from 'react'

import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Snackbar from '@material-ui/core/Snackbar'

const LocalStorageSave = ({ isSaveOpen, setIsSaveOpen, combinedState, setSelectedList }) => {
    const [listName, setListName] = useState('')
    const [listNameForSnackbar, setListNameForSnackbar] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleListNameChange = (e) => {
        setListName(e.target.value)
    }

    const handleLoadClose = () => {
        setIsSaveOpen(false)
    }

    const handleListSave = (name) => {
        const stateString = JSON.stringify(combinedState)
        const innerName = `__${name}__`
        localStorage.setItem(innerName, stateString)

        setListNameForSnackbar(name)
        setListName('')

        setSelectedList(name)
        handleLoadClose()
        setOpenSnackbar(true)
    }

    return (
        <Fragment>
            <Dialog open={isSaveOpen} onClose={handleLoadClose} fullWidth>
                <DialogTitle>
                    Save todo list
            </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Set a name for this list
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={listName}
                        onChange={handleListNameChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLoadClose} color="secondary">
                        Cancel
                </Button>
                    <Button onClick={() => handleListSave(listName)} color="primary" variant='contained'>
                        Save
                </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={openSnackbar}
                autoHideDuration={3000}
                message={`List with name '${listNameForSnackbar}' saved!`}
                onClose={() => setOpenSnackbar(false)}
            />
        </Fragment>
    )
}

export default LocalStorageSave
