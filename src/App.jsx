import React, { useState, Fragment, useEffect } from 'react'

import { DragDropContext } from 'react-beautiful-dnd';
import { makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import Column from './Column';
import AddTaskForm from './AddTaskForm';
import MobileColumnsContainer from './MobileColumnsContainer';
import LocalStorageLoad from './LocalStorageLoad';
import Title from './Title';
import LocalStorageSave from './LocalStorageSave';

const initalTasks = [
  { id: 'task-1', content: 'ExampleTodo' },
  { id: 'task-2', content: 'ExampleDoing' },
  { id: 'task-3', content: 'ExampleDone' },
];

const initialTodoColumn = ['task-1'];
const initialDoingColumn = ['task-2'];
const initialDoneColumn = ['task-3'];

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

  const [isMobileVersion, setIsMobileVersion] = useState();

  const [isLoadOpen, setIsLoadOpen] = useState(false)
  const [isSaveOpen, setIsSaveOpen] = useState(false)

  const [selectedList, setSelectedList] = useState()

  const combinedState = {
    tasksState: [...tasksState],
    todoColumnState: [...todoColumnState],
    doingColumnState: [...doingColumnState],
    doneColumnState: [...doneColumnState],
  }

  const handleStateLoad = (loadedTasksState, loadedTodoColumnState, loadedDoingColumnState, loadedDoneColumnState) => {
    setTasksState(loadedTasksState);
    setTodoColumnState(loadedTodoColumnState);
    setDoingColumnState(loadedDoingColumnState);
    setDoneColumnState(loadedDoneColumnState)
  }

  const theme = useTheme();
  const mathches = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setIsMobileVersion(mathches);
  }, [mathches])

  const columns = {
    todo: [todoColumnState, setTodoColumnState],
    doing: [doingColumnState, setDoingColumnState],
    done: [doneColumnState, setDoneColumnState],
  }

  const mapThroughTasks = (taskList) => {
    return taskList.map((item) => tasksState.filter((task) => task.id === item)[0])
  }

  const [addEventFlag, setAddEventFlag] = useState(false)

  const handleTaskAddition = (taskContent) => {
    if (!taskContent) {
      return;
    }

    setAddEventFlag(true)

    const newTaskId = 'task-' + (tasksState.length + 1);
    const newTasksState = [...tasksState, { id: newTaskId, content: taskContent }];
    const newTodoColumnState = [...todoColumnState, newTaskId];

    setTasksState(newTasksState);
    setTodoColumnState(newTodoColumnState);

    setTimeout(() => {
      setAddEventFlag(false)
    }, 100)
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

  const [isDragDisabled, setIsDragDisabled] = useState(false);

  const disableDrag = (bool) => {
    setIsDragDisabled(bool)
  }

  const handleTaskMobileMove = (taskId, oldColumnId, newColumnId) => {
    const startColumn = [...columns[oldColumnId][0]];
    const finishColumn = [...columns[newColumnId][0]];

    const setStartColumnState = columns[oldColumnId][1];
    const setFinishColumnState = columns[newColumnId][1];

    startColumn.splice(startColumn.indexOf(taskId), 1);
    finishColumn.splice(finishColumn.length, 0, taskId);

    setStartColumnState(startColumn);
    setFinishColumnState(finishColumn);
  }

  const onDragEnd = (result) => {
    let { draggableId, source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const startColumn = [...columns[source.droppableId][0]];
      const finishColumn = [...columns[destination.droppableId][0]];

      const setStartColumnState = columns[source.droppableId][1];
      const setFinishColumnState = columns[destination.droppableId][1];

      startColumn.splice(source.index, 1);
      finishColumn.splice(destination.index, 0, draggableId);

      setStartColumnState(startColumn);
      setFinishColumnState(finishColumn);
    }

    if (source.droppableId === destination.droppableId) {
      const column = [...columns[source.droppableId][0]];
      const setColumnState = columns[source.droppableId][1];

      column.splice(source.index, 1);
      column.splice(destination.index, 0, draggableId)

      setColumnState(column);
    }
  }

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth='xl' style={{ overflow: 'hidden' }}>
        <Title isMobileVersion={isMobileVersion} setIsLoadOpen={setIsLoadOpen} setIsSaveOpen={setIsSaveOpen} />
        <LocalStorageLoad mobile={isMobileVersion} isLoadOpen={isLoadOpen} setIsLoadOpen={setIsLoadOpen} handleStateLoad={handleStateLoad} selectedList={selectedList} setSelectedList={setSelectedList} />
        <LocalStorageSave mobile={isMobileVersion} isSaveOpen={isSaveOpen} setIsSaveOpen={setIsSaveOpen} combinedState={combinedState} setSelectedList={setSelectedList} />
        <AddTaskForm mobile={isMobileVersion} handleTaskAddition={handleTaskAddition} />
        <DragDropContext onDragEnd={onDragEnd} >
          {!isMobileVersion && <Box className={classes.columns}>
            <Column tasks={mapThroughTasks(todoColumnState)} handleTaskDelete={handleTaskDelete} title='To do' columnId='todo' handleTaskEdit={handleTaskEdit} />
            <Column tasks={mapThroughTasks(doingColumnState)} handleTaskDelete={handleTaskDelete} title='Doing' columnId='doing' handleTaskEdit={handleTaskEdit} />
            <Column tasks={mapThroughTasks(doneColumnState)} handleTaskDelete={handleTaskDelete} title='Done' columnId='done' handleTaskEdit={handleTaskEdit} />
          </Box>}
          {isMobileVersion && <MobileColumnsContainer
            columns={{
              todo: {
                tasks: mapThroughTasks(todoColumnState),
                title: 'To do',
                columnId: 'todo'
              },
              doing: {
                tasks: mapThroughTasks(doingColumnState),
                title: 'Doing',
                columnId: 'doing'
              },
              done: {
                tasks: mapThroughTasks(doneColumnState),
                title: 'Done',
                columnId: 'done'
              }
            }}
            handleTaskDelete={handleTaskDelete}
            handleTaskEdit={handleTaskEdit}
            handleTaskMobileMove={handleTaskMobileMove}
            isDragDisabled={isDragDisabled}
            disableDrag={disableDrag}
            addEventFlag={addEventFlag} />}
        </DragDropContext>
      </Container>
    </Fragment>
  )
}

export default App