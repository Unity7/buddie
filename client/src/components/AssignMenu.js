import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { UPDATE_TASK } from '../utils/mutations';
import { QUERY_USERS } from '../utils/queries';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
const useStyles = makeStyles((theme) => ({

    input: {
      borderRadius: 4,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '5px 26px 5px 12px'
    }
  }));


const AssignMenu = () => {
    const classes = useStyles();

    const { loading, data } = useQuery(QUERY_USERS);
    const users = data?.users || [];
    const [assign, setAssign] = useState('')
    // const [updateState] = useMutation(UPDATE_TASK)

    const handleChange = () => {
        let newStatus = setAssign()
        // updateState(newStatus)
        console.log(`
        =====================
        OnChange Assigned To
        =====================
        Assigned To ${assign}
        =====================
        `)
    }
    
    return (
        <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            // onClick={handleChange}
            className={classes.input}
            
        >
        {
            users && 
            users.map(user => (
                <MenuItem key={user._id} value={user.username}>
                {user.username}
                </MenuItem>
            ))
        }
        </Select>
    )
}

export default AssignMenu;