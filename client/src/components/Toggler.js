import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { UPDATE_TASK } from '../utils/mutations';

const Toggler = ({ task, setShouldUpdate }) => {
    
    // --------- definie mutation to update status to in gql ---------- //
    const [updateState] = useMutation(UPDATE_TASK, {
        onCompleted: () => {
            setShouldUpdate(true)
        }
    })

    // ---------------------- handle onClick ---------------------- //
    const toggleStatus = (variables) => {
        // test variables are passed correctly 
        console.log(
            ` 
            =====================
            Variables
            =====================
            ${variables}
            =====================
        `)
        // test task id is available
        console.log(
            ` 
            =====================
            Task's ID
            =====================
            ${task._id}
            =====================
        `)

        // change status to opposite of what it was
        const newStatus = !variables.taskStatus
        
        // ---------------------- Update back end ---------------------- //
        updateState({ variables: { taskStatus: newStatus, _id: task._id } })

        // check that task status is changed
        console.log(
            ` 
          =====================
          Current Task Status
          =====================
          ${task.taskStatus}
          =====================
          `)
    }

    // ---------------------- Update back end ---------------------- //


    return (
        <button className="statusBtn" onClick={() => toggleStatus({ taskStatus: task.taskStatus })}>
            {task.taskStatus ? "👍🏼" : "👎🏼"}
        </button>
    )
}
export default Toggler

