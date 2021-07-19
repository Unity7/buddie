import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { UPDATE_TASK } from '../utils/mutations';
import { QUERY_USERS } from '../utils/queries';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { update } from 'lodash';

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


const AssignMenu = () => {
    // ----------------------- styles ---------------------------- //
    const classes = useStyles();
    // ---------------------- get user data ---------------------- //
    const { loading, data } = useQuery(QUERY_USERS);
    const users = data?.users || [];

    // ----------- set state for who is assigned the task --------- //
    const [assign, setAssign] = useState('')

    // --------- definie mutation to update assigned to in gql ---------- //
    const [updateState, { error }] = useMutation(UPDATE_TASK)



    // ---------------------- handle select's onChange ---------------------- //
    const handleChange = (e) => {

        // update assigned user based on form input 
        const assign = e.target.value
        setAssign(assign)
        
        console.log(`
        =====================
        OnChange Assigned To
        =====================
        Assigned To ${assign}
        =====================
        `)
    };

    // ---------------------- Update back end ---------------------- //
    // this wont work until I can figure out how to get the taskID
    // useEffect(() => {
    //     async function updateState() {
    //         const response = await updateState(assign)
    //         console.log(`
    //             =====================
    //             OnChange Assigned To
    //             =====================
    //             Assigned To ${assign}
    //             =====================
    //             `)
    //     }
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