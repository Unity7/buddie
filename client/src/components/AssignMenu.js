import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { UPDATE_TASK } from '../utils/mutations';
import { QUERY_USERS } from '../utils/queries';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    input: {
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '5px 26px 5px 12px',
        maxWidth: '70px'
    }
}));


const AssignMenu = ({ task, setShouldUpdate }) => {
    // ----------------------- styles ---------------------------- //
    const classes = useStyles();
    // ---------------------- get user data ---------------------- //
    const { loading, data } = useQuery(QUERY_USERS);
    const users = data?.users || [];

    // ----------- set state for who is assigned the task --------- //
    const [assign, setAssign] = useState('')

    // --------- definie mutation to update assigned to in gql ---------- //
    const [updateAssign, { error }] = useMutation(UPDATE_TASK)

    // ---------------------- handle select's onChange ---------------------- //
    const handleChange = (e) => {
        // update assigned user based on form input 
        const assign = e.target.value
        setAssign(assign)
        // update backend
        updateAssign({ variables: { assignedID: assign, _id: task._id } })
        console.log(`
        =====================
        OnChange Assigned To
        =====================
        Assigned To ${assign}
        Task ID ${task._id}
        =====================
        `)
    };

    // ---------------------- Update back end ---------------------- //
    // this wont work until I can figure out how to get the taskID
    // useEffect(() => {
    //     async function updateState() {
        // how do I pass in taskID and status?
    //         const response = await updateState()
    //         console.log(`
    //             =====================
    //             OnChange Assigned To
    //             =====================
    //             Assigned To ${assign}
    //             =====================
    //             `)
    //     }
    //    updateState()
    // }, [assign]);

    return (
        <select
            labelId="assignSelect"
            id="assignSelect"
            onChange={handleChange}
            value={assign}
            className={classes.input}
        >
            {
                users &&
                users.map(user => (
                    <option key={user._id} value={user._id}>
                        {user.username}
                    </option>
                ))
            }
        </select>
    )
}

export default AssignMenu;