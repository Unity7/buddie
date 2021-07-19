import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { UPDATE_TASK, DELETE_TASK } from '../../utils/mutations';
import Toggler from '../Toggler';
import AssignMenu from '../AssignMenu';
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
    width: '85vw',
  }
}));

// -----------------------------  task list styles ----------------------------- //
const TaskList = ({ tasks, username }) => {
  const classes = useStyles();
  // if (!taskListState.length) {
  //   return <h3>No Tasks Yet</h3>;
  // }


 

  // ----------------------- Updating taskListState ----------------------- //

  //  const [taskListState, setTaskList] = useState(incomingTasks);
  
  //  useEffect (() => {
  //    useMutation
  //   setTaskList(...tasks)
    

  //   },[taskListState])


// ------------------------------- Deleting Task ---------------------------------------- //

const DeleteTask = ({_id}) => {
  // update state and create new task list without deleted task
  console.log(`
    =====================
    Delete Button Cliked
    =====================
    task id 
    =====================
    `)
    
   
};  

  return (
    <div>
      <Grid id="taskListContainer" container>
       <Grid item container >
         <Grid item container id="taskListHeader">
                <Grid item sm={1} className="headerItem">
                  <h4>Owner</h4>
                </Grid>
                <Grid item sm={7} className="headerItem">
                  <h4>Task</h4>
                </Grid>
                <Grid item sm={1} className="headerItem">
                  <h4>Status</h4>
                </Grid>
                <Grid item sm={1} className="headerItem">
                      <h4>Assign</h4>
                </Grid>
                <Grid item sm={1} className="headerItem">
                  <h4>Delete</h4>
                </Grid>
          </Grid>
        </Grid >
      { tasks &&
        tasks.map(task => (
          <div className={classes.root}>
            <Grid key={task._id} className={classes.paper}>
              <Grid item sm={12} container>
                <Grid sm={1} item className="taskItem">
                  <ButtonBase >
                    <div>CL</div>
                  </ButtonBase>
                </Grid>
                <Grid item sm={7} className="taskItem">
                  <Typography>{task.taskText}</Typography>
                </Grid>
                <Grid item sm={1} className="taskItem">
                  <Toggler/>
                </Grid>
                <Grid item sm={1} className="taskItem">
                  <AssignMenu/>
                  {/* <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    onChange={'click'}
                    className={classes.input}
                  >
                    <MenuItem value="">
                      <em>Choose User</em>
                    </MenuItem>
                    <MenuItem>User</MenuItem>
                    <MenuItem>User</MenuItem>
                    <MenuItem>User</MenuItem>
                  </Select> */}
                </Grid>
                <Grid item sm={1} className="taskItem">
                    <Fab color="secondary" aria-label="delete" value={task._id} onClick={DeleteTask}>
                      <DeleteIcon />
                    </Fab>
                </Grid>
              </Grid>
            </Grid>
          </div>
        ))}
        </Grid>
    </div>
  );
};

export default TaskList;