import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    form: {
        display: 'flex',
        width: '100%',
        height: '75px',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    input: {
        width: '80%',
    },
    submit: {
        width: '10%',
        minHeight: '75%'
    }
})

const AddTaskForm = ({ handleTaskAddition }) => {
    const [newTaskInputState, setNewTaskInputState] = useState('')

    const classes = useStyles()

    return (
        <form className={classes.form} onSubmit={(e) => {
            e.preventDefault();
            handleTaskAddition(newTaskInputState)
            setNewTaskInputState('')
        }}>
            <TextField className={classes.input} label='New Task' variant='outlined' value={newTaskInputState} onChange={(e) => setNewTaskInputState(e.target.value)} />
            <Button className={classes.submit} variant='contained' color='primary' type='submit'>Add Task</Button>
        </form>
    )
}

export default AddTaskForm
