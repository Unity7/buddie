import { useMutation } from '@apollo/client';
import React from 'react';
import { DELETE_TASK } from '../utils/mutations';
import DeleteIcon from '@material-ui/icons/Delete';



const DeleteButton = ({task, setShouldUpdate}) => {

    // --------- definie mutation to update status to in gql ---------- //
    const [deleteTask] = useMutation(DELETE_TASK, {

        onCompleted: () => {
            setShouldUpdate(true)
        }
    })

    // ---------------------- handle onClick ---------------------- //
    const handleClick = (variables) => {
        console.log(variables)
    
        const {id} = variables
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

