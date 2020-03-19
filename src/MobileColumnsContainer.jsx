import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Column from './Column'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            hidden={value !== index}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </Typography>
    );
}

const useStyles = makeStyles({
    tabPanel: {
        transitionProperty: 'transform',
        transitionDuration: '0.5s'
    },
    tabPanelTransitionForwards: {
        transform: 'translateX(110%)',
        transitionProperty: 'transform',
        transitionDuration: '0.5s'
    },
    tabPanelTransitionBackwards: {
        transform: 'translateX(-110%)',
        transitionProperty: 'transform',
        transitionDuration: '0.5s'
    },
})

const MobileColumnsContainer = ({ columns, handleTaskDelete, handleTaskEdit, handleTaskMobileMove, isDragDisabled, disableDrag, addEventFlag }) => {
    const [value, setValue] = useState(0);

    const [transition, setTransition] = useState(null)

    const classes = useStyles()

    const handleChange = (event, newValue) => {
        if (newValue > value) {
            setTransition('forwards')
        } else if (newValue < value) {
            setTransition('backwards')
        }

        setValue(newValue);

        setTimeout(() => {
            setTransition(null)
        }, 0)
    };

    useEffect(() => {
        if (addEventFlag) {
            setTransition('backwards')

            setValue(0)

            setTimeout(() => {
                setTransition(null)
            }, 0)
        }
    }, [addEventFlag])

    return (
        <Box>
            <Tabs value={value} onChange={handleChange} variant='fullWidth' >
                <Tab className={classes.tab} label="To Do" />
                <Tab className={classes.tab} label="Doing" />
                <Tab className={classes.tab} label="Done" />
            </Tabs>
            <TabPanel value={value} index={0} className={transition === 'forwards' ? classes.tabPanelTransitionForwards : transition === 'backwards' ? classes.tabPanelTransitionBackwards : classes.tabPanel}>
                <Column
                    mobile
                    tasks={columns.todo.tasks}
                    handleTaskDelete={handleTaskDelete}
                    title={columns.todo.title}
                    columnId={columns.todo.columnId}
                    handleTaskEdit={handleTaskEdit}
                    handleTaskMobileMove={handleTaskMobileMove}
                    isDragDisabled={isDragDisabled}
                    disableDrag={disableDrag} />
            </TabPanel>
            <TabPanel value={value} index={1} className={transition === 'forwards' ? classes.tabPanelTransitionForwards : transition === 'backwards' ? classes.tabPanelTransitionBackwards : classes.tabPanel}>
                <Column
                    mobile
                    tasks={columns.doing.tasks}
                    handleTaskDelete={handleTaskDelete}
                    title={columns.doing.title}
                    columnId={columns.doing.columnId}
                    handleTaskEdit={handleTaskEdit}
                    handleTaskMobileMove={handleTaskMobileMove}
                    isDragDisabled={isDragDisabled}
                    disableDrag={disableDrag} />
            </TabPanel>
            <TabPanel value={value} index={2} className={transition === 'forwards' ? classes.tabPanelTransitionForwards : transition === 'backwards' ? classes.tabPanelTransitionBackwards : classes.tabPanel}>
                <Column
                    mobile
                    tasks={columns.done.tasks}
                    handleTaskDelete={handleTaskDelete}
                    title={columns.done.title}
                    columnId={columns.done.columnId}
                    handleTaskEdit={handleTaskEdit}
                    handleTaskMobileMove={handleTaskMobileMove}
                    isDragDisabled={isDragDisabled}
                    disableDrag={disableDrag} />
            </TabPanel>
        </Box>
    )
}

export default MobileColumnsContainer
