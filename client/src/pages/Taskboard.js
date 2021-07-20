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
  // set current state with current taskList object
  const [shouldUpdate, setShouldUpdate] = useState(false)

  const [addFriend] = useMutation(ADD_FRIEND);

  const { username: userParam } = useParams();



  // const users = dataUsers?.users | [];
  const[getAllTasks, { called, loading, data}] = useLazyQuery(
    QUERY_TASKS,
    {fetchPolicy: "no-cache"}
    
  )
  useEffect(() => {
    getAllTasks()
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
        <TaskForm/>
      </Container>
    </div> 
  );
};

export default Taskboard;
