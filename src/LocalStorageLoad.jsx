import React, { useState, useEffect, Fragment } from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Divider from '@material-ui/core/Divider'
import Snackbar from '@material-ui/core/Snackbar'

import PublishIcon from '@material-ui/icons/Publish';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    listItem: {
        overflow: 'auto',
        marginRight: '30px',
    },
})

const LocalStorageLoad = ({ isLoadOpen, setIsLoadOpen, handleStateLoad, selectedList, setSelectedList }) => {
    const classes = useStyles()

    const [openLoadSnackbar, setOpenLoadSnackbar] = useState(false)
    const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)
    const [listNameForSnackbar, setListNameForSnackbar] = useState('')

    const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false)

    const handleLoadClose = () => {
        setIsLoadOpen(false)
    }

    const getSavedNames = () => {
        let savedNames = [];
        for (let i = 0; i < localStorage.length; i++) {
            const name = localStorage.key(i);
            const checkArr = [name[0], name[1], name[name.length - 1], name[name.length - 2]];
            const parsedName = name.split('').filter((item) => item !== '_')
            if (checkArr.every((item) => item === '_')) {
                const joinedParsedName = parsedName.join('')
                const date = Date.now()
                savedNames.push({
                    name: joinedParsedName,
                    date: date
                })
            }
        }
        return savedNames
    }

    useEffect(() => {
        const savedNames = getSavedNames()
        setSavedNamesState(savedNames)
    }, [isLoadOpen])

    const [savedNamesState, setSavedNamesState] = useState(getSavedNames())

    const handleLoad = (name) => {
        const loadedCombinedState = localStorage.getItem(`__${name}__`);
        const parsedCombinedState = JSON.parse(loadedCombinedState);
        handleStateLoad(
            parsedCombinedState.tasksState,
            parsedCombinedState.todoColumnState,
            parsedCombinedState.doingColumnState,
            parsedCombinedState.doneColumnState,
        )

        setOpenLoadSnackbar(true)
        setListNameForSnackbar(name)
        setSelectedList(name)
        handleLoadClose()
    }

    const handleDelete = (name) => {
        localStorage.removeItem(`__${name}__`)
        setSavedNamesState(savedNamesState.filter((item) => item.name !== name))
    }

    const handleDeleteConfirmOpen = (name) => {
        setConfirmDeleteDialogOpen(true)
        setListNameForSnackbar(name)
    }

    const handleDeleteConfirmClose = (toDelete, name) => {
        if (toDelete === true) {
            handleDelete(name)
        }
        setConfirmDeleteDialogOpen(false)
        setOpenDeleteSnackbar(true)
        setListNameForSnackbar(name)
    }

    const wrappedSavedNames = savedNamesState
        .sort((prev, current) => prev.date - current.date)
        .map((item, index, arr) => {
            const name = item.name
            return (
                <Fragment key={`${name}_${index}`}>
                    <ListItem selected={selectedList === name} button>
                        <ListItemText
                            primary={name}
                            className={classes.listItem}
                        />
                        <ListItemSecondaryAction >
                            <IconButton edge='end' onClick={() => handleLoad(name)}>
                                <PublishIcon color='primary' />
                            </IconButton>
                            <IconButton edge="end" onClick={() => handleDeleteConfirmOpen(name)}>
                                <DeleteIcon color='error' />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    {index !== (arr.length - 1) && <Divider />}
                </Fragment>
            )
        })

    return (
        <Fragment>
            <Dialog open={isLoadOpen} onClose={handleLoadClose} fullWidth >
                <DialogTitle>
                    List of saved lists
                </DialogTitle>
                <DialogContent>
                    <List>
                        {wrappedSavedNames.length === 0 ? 'No saved lists found' : wrappedSavedNames}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLoadClose} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={openLoadSnackbar}
                autoHideDuration={3000}
                message={`List with name '${listNameForSnackbar}' loaded!`}
                onClose={() => setOpenLoadSnackbar(false)}
            />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={openDeleteSnackbar}
                autoHideDuration={3000}
                message={`List with name '${listNameForSnackbar}' deleted!`}
                onClose={() => setOpenDeleteSnackbar(false)}
            />
            <Dialog open={confirmDeleteDialogOpen} onClose={() => setConfirmDeleteDialogOpen(false)} >
                <DialogTitle>
                    Confirm that you want to delete this list
                </DialogTitle>
                <DialogContent>
                    {`Are you sure you want to delete list named '${listNameForSnackbar}'?`}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDeleteConfirmClose(true, listNameForSnackbar)} color="secondary">
                        Yes
                    </Button>
                    <Button onClick={() => setConfirmDeleteDialogOpen(false)} color="primary">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default LocalStorageLoad
