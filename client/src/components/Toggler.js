import { useMutation } from '@apollo/client';
import React, {useState} from 'react';
import { UPDATE_TASK } from '../utils/mutations';

const Toggler = () => {
    const [status, setStatus] = useState(false)
    // const [updateState] = useMutation(UPDATE_TASK)

    const toggleStatus = () => {
        let newStatus = setStatus(!status)
        // updateState(newStatus)
    }
    console.log(`
      =====================
      Status Button Cliked
      =====================
      Status ${status}
      =====================
      `)
    return (
        <button className="statusBtn" value={status} onClick={toggleStatus}>
            { status ? "👍🏼" : "👎🏼" }
        </button>
    )
}
export default Toggler

