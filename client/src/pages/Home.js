import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

//bring in QUERY_ME_BASIC when needed
import { QUERY_MESSAGES, QUERY_TASKS, QUERY_ME } from "../utils/queries"; 
// import FriendList from "../components/FriendList";
// import TaskForm from '../components/TaskForm';
import Auth from "../utils/auth";
import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";
import DashTask from "../components/DashTask";
import Grid from "@material-ui/core/Grid";

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_MESSAGES);
    // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME);
  // const { waiting, Taskdata } = useQuery(QUERY_TASKS);
  
  // optional chaining syntax used below
  const messages = data?.messages || [];

  const loggedIn = Auth.loggedIn();

  const tasks = userData?.me.tasks || [];


  return (
    <main>
      <Grid direction="row" container spacing={2}>
        <Grid  item sm={6} >
        <h2 className="heading">My Tasks</h2>
          <div className={`${loggedIn } flex-row compBorders scroller`} >
          
          <DashTask tasks={tasks} />

          </div>
        
          
        </Grid>
        <Grid item sm={6} >
          <div className=" ">
            <h2 className="heading">Messages</h2>
            <div className={` ${loggedIn }`}>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div className="compBorders scroller">
                  <MessageList messages={messages} />
                </div>
              )}
              {loggedIn && (
                <div className="col-12 mb-3" >
                  <MessageForm />
                </div>
              )}
              {/* {loggedIn && userData ? (
                <div className="col-lg-3 mb-3">
                  <FriendList
                    username={userData.me.username}
                    friendCount={userData.me.friendCount}
                    friends={userData.me.friends}
                  />
                </div>
              ) : null} */}
            </div>
          </div>
        </Grid>
      </Grid>
    </main>
  );
};
export default Home;
