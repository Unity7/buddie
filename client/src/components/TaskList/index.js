import React, {useEffect, useState} from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_USERS_TASKS } from '../../utils/queries';
// -----------------------------  components ----------------------------- //
import Toggler from '../Toggler';
import AssignMenu from '../AssignMenu';
import DeleteButton from '../DeleteButton';
// -----------------------------  task list styles ----------------------------- //
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';

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


const TaskList = ({ tasks, username, setShouldUpdate }) => {
  const classes = useStyles();
  // if (!tasks.length) {
  //   return <h3>No Tasks Yet</h3>;
  // }



  return (
    <div>
      <Grid id="taskListContainer" container>
       <Grid item container>
         <Grid item container id="taskListHeader" className={classes.paper}>
                <Grid item sm={1} className="headerItem">
                  <p>Creator</p>
                </Grid>
                <Grid item sm={6} className="headerItem">
                  <p>Task</p>
                </Grid>
                <Grid item sm={1} className="headerItem">
                  <p>Status</p>
                </Grid>
                <Grid item sm={1} className="headerItem">
                      <p>Assign</p>
                </Grid>
                <Grid item sm={1} className="headerItem">
                  <p>Delete</p>
                </Grid>
          </Grid>
        </Grid >
      { tasks &&
        tasks.map(task => (
              <Grid container className="task-container" key={task._id}>
                <Grid xs={12} sm={12} md={1} item className="taskItem">
                  <ButtonBase>
                    <div className="task-creator"> <span className="mobile-display">Creator:</span>  {task.username}</div>
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm={12} md={6} className="taskItem">
                  <p className="taskText">{task.taskText}</p>
                </Grid>
                <Grid item xs={4} sm={4} md={1} className="taskItem">
                  <Toggler task={task} setShouldUpdate={setShouldUpdate}/>
                </Grid>
                <Grid item xs={4} sm={4} md={1} className="taskItem">
                  <AssignMenu task={task} setShouldUpdate={setShouldUpdate}/>
                </Grid>
                <Grid item xs={4} sm={4} md={1} className="taskItem">
                  <DeleteButton task={task} setShouldUpdate={setShouldUpdate}/>
                </Grid>
              </Grid>
        ))}
        </Grid>
    </div>
  );
};

export default TaskList;