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
    mobileForm: {
        display: 'flex',
        width: '100%',
        height: '50px',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    input: {
        width: '80%',
    },
    mobileInput: {
        width: '70%'
    },
    submit: {
        width: '10%',
        minHeight: '75%'
    },
    mobileSubmit: {
        width: '10%',
        height: '42px',
        fontSize: '10px',
    },
})

const AddTaskForm = ({ handleTaskAddition, mobile }) => {
    const [newTaskInputState, setNewTaskInputState] = useState('')

    const classes = useStyles()

    return (
        <form className={mobile ? classes.mobileForm : classes.form} onSubmit={(e) => {
            e.preventDefault();
            handleTaskAddition(newTaskInputState)
            setNewTaskInputState('')
        }}>
            <TextField size={mobile ? 'small' : 'medium'} className={mobile ? classes.mobileInput : classes.input} label='New Task' variant='outlined' value={newTaskInputState} onChange={(e) => setNewTaskInputState(e.target.value)} />
            <Button size={mobile ? 'small' : 'large'} className={mobile ? classes.mobileSubmit : classes.submit} variant='contained' color='primary' type='submit'>Add Task</Button>
        </form>
    )
}

export default AddTaskForm
