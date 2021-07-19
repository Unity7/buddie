import { useMutation } from '@apollo/client';
import React, {useEffect, useState} from 'react';
import { UPDATE_TASK } from '../utils/mutations';

const Toggler = () => {
     // ----------- set state for task's status the task --------- //
    const [status, setStatus] = useState(false)

    // --------- definie mutation to update status to in gql ---------- //
    // const [updateState] = useMutation(UPDATE_TASK)

    // ---------------------- handle onClick ---------------------- //
    const ToggleStatus = () => {
        // change state to opposite of what it was
        setStatus(!status)
    }

    // ---------------------- Update back end ---------------------- //
    // useEffect(()=> {
    //     alert('clicked')
    // })
    // console.log(`
    // =====================
    // Status Button Cliked
    // =====================
    // Status ${status}
    // =====================
    // `)
    
    return (
        <button className="statusBtn" value={status} onClick={ToggleStatus}>
            { status ? "👍🏼" : "👎🏼" }
        </button>
    )
}
export default Toggler

