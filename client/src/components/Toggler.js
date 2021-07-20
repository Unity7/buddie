import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { UPDATE_TASK } from '../utils/mutations';

const Toggler = () => {
    // ----------- set state for task's status the task --------- //
    const [status, setStatus] = useState(false)

    // --------- definie mutation to update status to in gql ---------- //
    const [updateState] = useMutation(UPDATE_TASK)

    // ---------------------- handle onClick ---------------------- //
    const ToggleStatus = () => {
        // change state to opposite of what it was
        setStatus(!status)
    }

    // ---------------------- Update back end ---------------------- //

    // useEffect(() => {
    // // this wont work until I can figure out how to get the taskID
    //     async function updateState() {
    //         // how do I pass in taskID and status?
    //         const response = await updateState()
    //         console.log(`
    //             =====================
    //             OnChange Assigned To
    //             =====================
    //             Assigned To ${status}
    //             =====================
    //             `)
    //     }
    //     updateState()
    // }, [status]);

    return (
        <button className="statusBtn" value={status} onClick={ToggleStatus}>
            {status ? "👍🏼" : "👎🏼"}
        </button>
    )
}
export default Toggler

