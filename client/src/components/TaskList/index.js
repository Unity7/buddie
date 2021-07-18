import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { UPDATE_TASK, DELETE_TASK } from '../../utils/mutations';

// -----------------------------  task list styles ----------------------------- //
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
 // -----------------------------  task list styles ----------------------------- //

import { useMutation } from '@apollo/client';

// -----------------------------  task list styles ----------------------------- //
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    borderRadius: 4,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '5px 26px 5px 12px'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 'auto',
    width: 900,
    maxWidth: 1000,
  },
  icon: {
    width: 128,
    height: 128,
    borderRadius: 30,
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  taskItem: {
    height: 128,
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  statusBtn: {

  }
  
}));

// -----------------------------  task list styles ----------------------------- //
const TaskList = ({ tasks }) => {
  const classes = useStyles();
  // if (!tasks.length) {
  //   return <h3>No Tasks Yet</h3>;
  // }

  // ----------------------- Updating Tasks ----------------------- //
  // set state to track changes in status the inital value = false 
  const [status, setStatus] = useState(false)

  // const [updateTask, {error}] = useMutation(UPDATE_TASK, {})
  const handleStatus = event => {

    const currentStatus = event.target.value
    console.log(`
    =====================
    Status ${currentStatus}
    =====================
    
    `)
    // if the value of the task's state is false 
    if(currentStatus === false) {
      //set new state to true
      const newStatus = setStatus(true)
        console.log(`
      =====================
      New Status ${newStatus}
      =====================
      
      `)
    } // else set to false  
  }
// ------------------------------- Deleting Task ---------------------------------------- //
// set current state with current taskList object
const [state, setTaskList] = useState(...tasks);


const deleteTask = ({_id}) => {
  // update state and create new task list without deleted task
  let newTaskList = state.filter( task => !_id );
};



  return (
    <div>
      { tasks &&
        tasks.map(task => (
          <div className={classes.root}>
            <Paper key={task._id} className={classes.paper}>
              <Grid item xs={12} container>
                <Grid item>
                  <ButtonBase className={classes.icon}>
                    <div>CL</div>
                  </ButtonBase>
                </Grid>
                <Grid item className={classes.taskItem}>
                  <Typography>{task.taskText}</Typography>
                </Grid>
                <Grid item className={classes.taskItem}>
                  <ButtonBase>
                    {!task.taskStatus ? (
                      // <Button value={task.taskStatus} onClick={handleStatus}>TODO</Button>
                     <button value={status} onClick={handleStatus}>TODO</button>
                    ) : (
                      <button value={status} onClick={handleStatus}>DONE</button>
                    )}
                  </ButtonBase>
                </Grid>
                <Grid item className={classes.taskItem}>
                  <InputLabel id="demo-customized-select-label">Assigned To:</InputLabel>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    onChange={'click'}
                    className={classes.input}
                  >
                    <MenuItem value="">
                      <em>Choose User</em>
                    </MenuItem>
                    <MenuItem value={10}>User</MenuItem>
                    <MenuItem value={20}>User</MenuItem>
                    <MenuItem value={30}>User</MenuItem>
                  </Select>
                </Grid>
                <Grid item className={classes.taskItem}>
                    <Fab color="secondary" aria-label="delete" value={task._id} onClick={deleteTask}>
                      <DeleteIcon />
                    </Fab>
                </Grid>
              </Grid>
            </Paper>
          </div>
        ))}
    </div>
  );
};

export default TaskList;