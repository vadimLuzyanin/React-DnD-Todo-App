import React, { useState, Fragment } from 'react'

import { DragDropContext } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import Column from './Column';
import AddTaskForm from './AddTaskForm';

const initalTasks = [
  { id: 'task-1', content: 'task-1' },
  { id: 'task-2', content: 'task-2' },
  { id: 'task-3', content: 'task-3' },
  { id: 'task-4', content: 'task-4' },
  { id: 'task-5', content: 'task-5' },
  { id: 'task-6', content: 'task-6' },
  { id: 'task-7', content: 'task-7' },
  { id: 'task-8', content: 'task-8' },
  { id: 'task-9', content: 'task-9' },
];

const initialTodoColumn = ['task-1', 'task-2', 'task-3']
const initialDoingColumn = ['task-4', 'task-5', 'task-6']
const initialDoneColumn = ['task-7', 'task-8', 'task-9']

const useStyles = makeStyles({
  columns: {
    display: 'flex',
    flexDirection: 'row',
  }
})

const App = () => {
  const classes = useStyles()

  const [tasksState, setTasksState] = useState(initalTasks)
  const [todoColumnState, setTodoColumnState] = useState(initialTodoColumn)
  const [doingColumnState, setDoingColumnState] = useState(initialDoingColumn)
  const [doneColumnState, setDoneColumnState] = useState(initialDoneColumn)

  const columns = {
    todo: [todoColumnState, setTodoColumnState],
    doing: [doingColumnState, setDoingColumnState],
    done: [doneColumnState, setDoneColumnState],
  }

  const mapThrougTasks = (taskList) => {
    return taskList.map((item) => tasksState.filter((task) => task.id === item)[0])
  }

  const handleTaskAddition = (taskContent) => {
    if (!taskContent) {
      return;
    }

    const newTaskId = 'task-' + (tasksState.length + 1);
    const newTasksState = [...tasksState, { id: newTaskId, content: taskContent }];
    const newTodoColumnState = [...todoColumnState, newTaskId];

    setTasksState(newTasksState);
    setTodoColumnState(newTodoColumnState);
  }

  const handleTaskDelete = (taskId, columnId) => {
    setTasksState((prev) => prev.filter((task) => task.id !== taskId))

    const setColumnState = columns[columnId][1];

    setColumnState((prev) => prev.filter((task) => task !== taskId))
  }

  const handleTaskEdit = (taskId, newTaskContent) => {
    const editedTask = { id: taskId, content: newTaskContent };

    setTasksState((prev) => [...prev.filter((task) => task.id !== taskId), editedTask])
  }

  const onDragEnd = (result) => {
    const { draggableId, source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const startColumn = [...columns[source.droppableId][0]];
      const finishColumn = [...columns[destination.droppableId][0]]

      const setStartColumnState = columns[source.droppableId][1];
      const setFinishColumnState = columns[destination.droppableId][1];

      startColumn.splice(source.index, 1);
      finishColumn.splice(destination.index, 0, draggableId);

      setStartColumnState(startColumn);
      setFinishColumnState(finishColumn)
    }

    if (source.droppableId === destination.droppableId) {
      const column = [...columns[source.droppableId][0]];
      const setColumnState = columns[source.droppableId][1];

      column.splice(source.index, 1);
      column.splice(destination.index, 0, draggableId)

      setColumnState(column)
    }
  }

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth='xl' style={{overflow: 'hidden'}}>
        <Typography variant='h1' align='center'>Todo List</Typography>
        <AddTaskForm handleTaskAddition={handleTaskAddition} />
        <DragDropContext onDragEnd={onDragEnd} >
          <Box className={classes.columns}>
            <Column tasks={mapThrougTasks(todoColumnState)} handleTaskDelete={handleTaskDelete} title='To do' columnId='todo' handleTaskEdit={handleTaskEdit} />
            <Column tasks={mapThrougTasks(doingColumnState)} handleTaskDelete={handleTaskDelete} title='Doing' columnId='doing' handleTaskEdit={handleTaskEdit} />
            <Column tasks={mapThrougTasks(doneColumnState)} handleTaskDelete={handleTaskDelete} title='Done' columnId='done' handleTaskEdit={handleTaskEdit} />
          </Box>
        </DragDropContext>
      </Container>
    </Fragment>
  )
}

export default App