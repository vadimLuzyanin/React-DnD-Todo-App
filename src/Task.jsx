import React, { useState, useEffect } from 'react'

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

import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles(theme => ({
    listItem: {
        overflow: 'auto'
    },
    paper: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    paperTransition: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        transform: 'translateX(110%)',
        transitionProperty: 'transform',
        transitionDuration: '0.5s'
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
    },
    next: {
        fontSize: '50px',
        marginRight: '-25px',
        color: theme.palette.primary.main,
    },
}))

const Task = ({ taskId, taskContent, index, columnId, handleTaskDelete, handleTaskEdit, mobile, handleTaskMobileMove, isDragDisabled, disableDrag }) => {
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

    useEffect(() => {
        if (!taskEditValue && !editDialogOpen) {
            setTaskEditValue(taskContent)
        }
    }, [taskEditValue, editDialogOpen, taskContent])

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

    const [sentToNextColumn, setSentToNextColumn] = useState(false);

    const handleSend = (currentColumn) => {
        setSentToNextColumn(true);
        disableDrag(true);
        let nextColumnId;
        setTimeout(() => {
            switch (currentColumn) {
                case 'todo': nextColumnId = 'doing';
                    break;
                case 'doing': nextColumnId = 'done';
                    break;
                default: break;
            }
            handleTaskMobileMove(taskId, columnId, nextColumnId);
            disableDrag(false);
        }, 500);
    }

    return (
        <Draggable draggableId={taskId} index={index} isDragDisabled={isDragDisabled}>
            {(provided, snapshot) => (
                <ListItem
                    component={Paper}
                    className={sentToNextColumn ? classes.paperTransition : classes.paper}
                    elevation={snapshot.isDragging ? 6 : 1}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <ListItemText className={classes.listItem}>
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
                    {mobile && columnId !== 'done' && <ListItemIcon className={classes.next} onClick={() => handleSend(columnId)}>
                        <NavigateNextIcon fontSize='inherit' color='inherit' />
                    </ListItemIcon>}

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
