import React, {useState, useEffect} from 'react';
import { Redirect, useParams } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import FriendList from '../components/FriendList';
import { ADD_FRIEND, ADD_TASK, DELETE_TASK, UPDATE_TASK } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USERS, QUERY_TASKS } from '../utils/queries';
import Auth from '../utils/auth';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';


const Taskboard = () => {
  // -------------------------- Set State ------------------------- //
  // set current state with current taskList object

  
  const [addFriend] = useMutation(ADD_FRIEND);

  const { username: userParam } = useParams();

  // const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
  //   variables: { username: userParam }
  // });

  //Question:  use useQuery hook to make query request?? 
  // const queryMultiple = () => {
  //   const usersRes = useQuery(QUERY_USERS);
  //   const tasksRes = useQuery(QUERY_TASKS);
  //   return [usersRes, tasksRes]
  // }
  // const [
  //   {loading: loadingUsers, data: dataUsers},
  //   {loading: loadingTasks, data: dataTasks}
  // ] = queryMultiple()

  // const tasks = dataTasks?.tasks || [];

  // const users = dataUsers?.users | [];

  
  const { loading, data } = useQuery(QUERY_TASKS);
  const tasks = data?.tasks || [];
  const user = data?.me || data?.user || {};

  // const [taskListState, setTaskList] = useState([]);
  
  // useEffect (() => {
  //   setTaskList(...tasks)
    

  //   },[taskListState])

  // redirect to personal profile page if username is the logged-in user's
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Redirect to="/homepage" />;
  // }

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
          <TaskList tasks={tasks} username={`${user.username}'s tasks...`}/>
        )}
          <br/>
        <TaskForm/>
      </Container>
    </div> 
  );
};

export default Taskboard;
