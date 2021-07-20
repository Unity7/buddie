import React, {useEffect, useState} from 'react';
import { UPDATE_TASK, DELETE_TASK } from '../../utils/mutations';
import Toggler from '../Toggler';
import AssignMenu from '../AssignMenu';
// -----------------------------  task list styles ----------------------------- //
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';


 // -----------------------------  task list styles ----------------------------- //

import { useMutation } from '@apollo/client';
import DeleteButton from '../DeleteButton';

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
                  <Toggler task={task} setShouldUpdate={setShouldUpdate}/>
                </Grid>
                <Grid item sm={1} className="taskItem">
                  <AssignMenu task={task} setShouldUpdate={setShouldUpdate}/>

                </Grid>
                <Grid item sm={1} className="taskItem">
                  <DeleteButton task={task} setShouldUpdate={setShouldUpdate}/>
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