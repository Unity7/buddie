import React, {useState, useEffect} from 'react';
import { Redirect, useParams } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import FriendList from '../components/FriendList';
import { ADD_FRIEND, ADD_TASK, DELETE_TASK, UPDATE_TASK } from '../utils/mutations';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { QUERY_USERS, QUERY_TASKS } from '../utils/queries';
import Auth from '../utils/auth';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';


const Taskboard = () => {
  // -------------------------- Set State ------------------------- //

  // set state to use later in useEffect to tell it to rerender
  const [shouldUpdate, setShouldUpdate] = useState(false)


  const { username: userParam } = useParams();

  // query for tasks
  const[getAllTasks, { called, loading, data}] = useLazyQuery(
    QUERY_TASKS,
    // skip cached data because its annoying 
    {fetchPolicy: "no-cache"}
  )

  // setting up useEffect that will be passed down as props to be used in other components 
  useEffect(() => {
    // when we rerender get tasks again 
    getAllTasks()
    // reset state back to false 
    setShouldUpdate(false)
  }, [shouldUpdate])

  
  // const { loading, data } = useQuery(QUERY_TASKS);
  const tasks = data?.tasks || [];
  const user = data?.me || data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  // Question: why isn't this seeing that I'm logged in?
  // if (!user?.username) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this page. Use the navigation links above to sign up or log in!
  //     </h4>
  //   );
  // }

  return (
    <div>
      <CssBaseline/>
      <Container maxWidth="lg">
        <h1>Viewing Your Pod's Taskboard.</h1>
        <br/>
        { loading ? (
          <div>Loading your Pod's tasks</div>
        ) : (
          <TaskList setShouldUpdate={setShouldUpdate} tasks={tasks} username={`${user.username}'s tasks...`}/>
        )}
          <br/>
        <TaskForm setShouldUpdate={setShouldUpdate} tasks={tasks}/>
      </Container>
    </div> 
  );
};

export default Taskboard;
