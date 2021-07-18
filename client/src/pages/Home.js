import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TASKS, QUERY_ME_BASIC } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import TaskForm from '../components/TaskForm';
import Auth from '../utils/auth';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_TASKS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  // optional chaining syntax used below
  const thoughts = data?.thoughts || [];

  const loggedIn = Auth.loggedIn();

  console.log(loggedIn)
  return (
    <main>
      <div className="flex-row justify-space-between">
        { loggedIn && (
          <div className="col-12 mb-3">
            <TaskForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TaskList thoughts={tasks} title="Some Feed for Task(s)..." />
          )}
          {loggedIn && userData ? (
            <div className="col-12 col-lg-3 mb-3">
              <FriendList
                username={userData.me.username}
                friendCount={userData.me.friendCount}
                friends={userData.me.friends}
              />
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
};
export default Home;
