import React from 'react'

import { Droppable } from 'react-beautiful-dnd'
import { makeStyles } from '@material-ui/core'

import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import Task from './Task'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1),
    },
    list: {
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        transitionDuration: 200,
        overflowY: 'auto',
        overflowX: 'hidden',
        minHeight: '15vh',
        maxHeight: '75vh',
    },
    listMobile: {
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        transitionDuration: 200,
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: '63vh',
        [theme.breakpoints.up(370)]: {
            maxHeight: '68vh',
        },
        [theme.breakpoints.up('sm')]: {
            maxHeight: '75vh',
        },
    }
}))

const Column = ({ tasks, title, columnId, handleTaskDelete, handleTaskEdit, mobile, handleTaskMobileMove, isDragDisabled, disableDrag }) => {
    const classes = useStyles()

    const mappedTasks = tasks.map((task, index) =>
        <Task
            taskId={task.id}
            taskContent={task.content}
            index={index}
            key={task.id}
            handleTaskDelete={handleTaskDelete}
            handleTaskEdit={handleTaskEdit}
            columnId={columnId}
            mobile={mobile}
            handleTaskMobileMove={handleTaskMobileMove}
            isDragDisabled={isDragDisabled}
            disableDrag={disableDrag}>
        </Task>
    )
    return (
        <Box className={classes.root} width={mobile ? 1 : 1 / 3}>
            <Typography align='center' variant={mobile ? 'h5' : 'h2'}>{title}</Typography>
            <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                    <List
                        component={Paper}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={mobile ? classes.listMobile : classes.list}
                        elevation={snapshot.isDraggingOver ? 6 : 1}
                    >
                        {mappedTasks}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </Box>
    )
}

export default Column
