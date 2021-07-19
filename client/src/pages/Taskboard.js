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
  const taskListState = data?.tasks || [];
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
          <TaskList taskListState={taskListState} title={`${user.username}'s tasks...`}/>
        )}
          <br/>
        <TaskForm/>
      </Container>
    </div>

    // <div>
    //   <div className="flex-row mb-3">
    //     <h2 className="bg-dark text-secondary p-3 display-inline-block">
    //       Viewing {userParam ? `${user.username}'s` : 'your'} taskboard.
    //     </h2>

    //     {userParam && (
    //       <button className="btn ml-auto" onClick={handleClick}>
    //         Add Friend
    //       </button>
    //     )}
    //   </div>

    //   <div className="flex-row justify-space-between mb-3">
    //     <div className="col-12 mb-3 col-lg-8">
    //       <TaskList tasks={user.tasks} title={`${user.username}'s tasks...`} />
    //     </div>

    //     <div className="col-12 col-lg-3 mb-3">
    //       <FriendList
    //         username={user.username}
    //         friendCount={user.friendCount}
    //         friends={user.friends}
    //       />
    //     </div>
    //   </div>
    //   <div className="mb-3">{!userParam && <TaskForm />}</div>
    // </div>
  );
};

export default Taskboard;
