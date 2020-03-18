import React, { useState } from 'react'

import { Draggable } from 'react-beautiful-dnd'
import { makeStyles } from '@material-ui/core'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    button: {
        marginLeft: theme.spacing(1),
    },
    buttonInner: {
        [theme.breakpoints.down('md')]: {
            width: 0,
            marginBottom: '5px',
        },
    },
    buttonContainer: {
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'flex-end',
        }
    }
}))

const Task = ({ taskId, taskContent, index, columnId, handleTaskDelete, handleTaskEdit }) => {
    const classes = useStyles();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true)
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false)
    }

    const handleCloseAndDelete = () => {
        setDeleteDialogOpen(false);
        handleTaskDelete(taskId, columnId)
    }

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [taskEditValue, setTaskEditValue] = useState(taskContent)

    const handleEditDialogOpen = () => {
        setEditDialogOpen(true)
    }

    const handleEditDialogClose = () => {
        setEditDialogOpen(false)
        setTaskEditValue('')
    }

    const handleCloseAndEdit = () => {
        if (!taskEditValue) {
            return
        }
        handleTaskEdit(taskId, taskEditValue);
        setTaskEditValue('')
        setEditDialogOpen(false);
    }

    return (
        <Draggable draggableId={taskId} index={index}>
            {(provided, snapshot) => (
                <ListItem
                    component={Paper}
                    className={classes.paper}
                    elevation={snapshot.isDragging ? 6 : 1}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <ListItemText>
                        {taskContent}
                    </ListItemText>
                    <div className={classes.buttonContainer}>
                        <ListItemIcon className={classes.button}>
                            <Button variant='outlined' color='primary' className={classes.buttonInner} onClick={handleEditDialogOpen}>edit</Button>
                        </ListItemIcon>
                        <ListItemIcon className={classes.button}>
                            <Button variant='outlined' color='secondary' className={classes.buttonInner} onClick={handleDeleteDialogOpen}>delete</Button>
                        </ListItemIcon>
                    </div>

                    <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose} >
                        <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Task content: <br /> {taskContent}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteDialogClose} variant='outlined' color='primary' >
                                No
                            </Button>
                            <Button onClick={handleCloseAndDelete} variant='outlined' color='secondary' autoFocus>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                        <DialogTitle >Edit task</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Enter a new text for this task
                            </DialogContentText>
                            <TextField
                                value={taskEditValue}
                                onChange={(e) => setTaskEditValue(e.target.value)}
                                multiline
                                autoFocus
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleEditDialogClose} variant='outlined' color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleCloseAndEdit} variant='outlined' color="secondary">
                                Edit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </ListItem>
            )}
        </Draggable>
    )
}

export default Task
