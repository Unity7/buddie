import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { DELETE_TASK } from '../utils/mutations';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import { QUERY_TASKS } from '../utils/queries';
const DeleteButton = ({task, setShouldUpdate}) => {
    // ----------- set state for task's status the task --------- //


    // --------- definie mutation to update status to in gql ---------- //
    const [deleteTask] = useMutation(DELETE_TASK, {
        // ----------- 1st option update cache
        // cashe.read read the info from tasksquery 
        // update: (cache, {data}) => {
        //     console.log(cache)
        //     cache.readQuery({query: QUERY_TASKS})
        //     // console.log(tasks)
        // },
        onCompleted: () => {
            console.log('hello')
            setShouldUpdate(true)
        }
        // update returned array with new array 

        // write the new array into cache

        // ----------- 2nd option
    })

    // ---------------------- handle onClick ---------------------- //
    const handleClick = (variables) => {
        console.log(variables)
        // update state and create new task list without deleted task
        const {id} = variables
        console.log(`
        =====================
        Delete Button Cliked
        =====================
        task id ${id}
        =====================
        `)
        deleteTask({variables:{_id: id}});
    }

    // async function DeleteTask(variables) {
        
    // }
    // ---------------------- Update back end ---------------------- //

    return (

        <button className="deleteBtn" color="secondary" aria-label="delete" value={task._id} onClick={() => handleClick({id:task._id})}>
            <DeleteIcon />
        </button>

    )
}



export default DeleteButton

