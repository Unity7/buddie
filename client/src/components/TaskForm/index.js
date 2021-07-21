import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TASK } from '../../utils/mutations';
// because tasks are contained in a array we are going to use the query below to update the cache and return new tasks submitted in the form, QUERY_ME is being used on the profile page instead of Query taskS so we need to have both
import { QUERY_TASKS } from '../../utils/queries';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

const TaskForm = ({tasks, setShouldUpdate}) => {
    const [taskText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addtask, { error }] = useMutation(ADD_TASK, {
        update(cache, { data: { addtask } }) {
            try {
                // read what's currently in the cache
                const { tasks } = cache.readQuery({ query: QUERY_TASKS });
            
                // prepend the newest task to the front of the array
                cache.writeQuery({
                    query: QUERY_TASKS ,
                    data: { tasks: [addtask, ...tasks] }
                });
            } catch(e) {
                console.log(e)
            }
            },
        onCompleted: () => {
            setShouldUpdate(true)
        }
    });

    // update state based on form input changes
    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    // submit form
    const handleFormSubmit = async event => {
        event.preventDefault();
      
        try {
          // add task to database
          await addtask({
            variables: { taskText }
          });
      
          // clear form value
          setText('');
          setCharacterCount(0);
        } catch (e) {
          console.error(e);
        }
    };

    return (

        <div>
            <h1>Task Form </h1>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Here's a new task..."
                    value={taskText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
