import React from 'react';
import ListAltIcon from '@material-ui/icons/ListAlt';
// -----------------------------  components ----------------------------- //
import Toggler from '../Toggler';
import AssignMenu from '../AssignMenu';
import DeleteButton from '../DeleteButton';
// -----------------------------  task list styles ----------------------------- //

import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';

const DashTask = ({ tasks, username, setShouldUpdate }) => {
  return (
    <div>
      {tasks &&
        tasks.map((task) => (
          <Grid container className="" key={task._id}>
            {/* <Grid xs={12} sm={12} md={1} item className="taskItem">
              <ButtonBase>
                <div className="task-creator">
                  {" "}
                  <span className="mobile-display">Creator:</span>{" "}
                  {task.username}
                </div>
              </ButtonBase>
            </Grid> */}
            <Grid item xs={12} sm={12} md={12} className="">
              <p className="myTaskStyle"><span className="myTaskIcon"><ListAltIcon></ListAltIcon></span>{task.taskText}</p>
            </Grid>
            {/* <Grid item xs={4} sm={4} md={1} className="">
              <Toggler task={task} setShouldUpdate={setShouldUpdate} />
            </Grid> */}
            {/* <Grid item xs={4} sm={4} md={1} className="taskItem">
              <AssignMenu task={task} setShouldUpdate={setShouldUpdate} />
            </Grid> */}
            {/* <Grid item xs={4} sm={4} md={1} className="taskItem">
              <DeleteButton task={task} setShouldUpdate={setShouldUpdate} />
            </Grid> */}
          </Grid>
        ))}
    </div>
  );
};

export default DashTask;
