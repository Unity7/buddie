import { useMutation } from '@apollo/client';
import React from 'react';
import { DELETE_TASK } from '../utils/mutations';
import DeleteIcon from '@material-ui/icons/Delete';



const DeleteButton = ({task, setShouldUpdate}) => {

    // --------- definie mutation to update status to in gql ---------- //
    const [deleteTask] = useMutation(DELETE_TASK, {
        // ------------- 1st option update cache this would be better for performance but cache is not reading _id for an unknown reason
        // Note: cashe.read read the info from tasksquery 
        // update: (cache, {data}) => {
        //     console.log(cache)
        //     cache.readQuery({query: QUERY_TASKS})
        //     // console.log(tasks)
        // },
        // Note: update returned array with new array
        // Note: write the new array into cache

         // ----------------- 2nd option 
        onCompleted: () => {
            setShouldUpdate(true)
        }
    })

    // ---------------------- handle onClick ---------------------- //
    const handleClick = (variables) => {
        console.log(variables)
    
        const {id} = variables

        console.log(`
        =====================
        Delete Button Cliked
        =====================
        task id ${id}
        =====================
        `)
        // ---------------------- Update back end ---------------------- //
        deleteTask({variables: {_id: id}});
    }


    

    return (

        <button className="deleteBtn" color="secondary" aria-label="delete" value={task._id} onClick={() => handleClick({id:task._id})}>
            <DeleteIcon />
        </button>

    )
}



export default DeleteButton

