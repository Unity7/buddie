import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_TASKS, QUERY_ME_BASIC, QUERY_MESSAGES } from "../utils/queries";
import FriendList from "../components/FriendList";
// import TaskForm from '../components/TaskForm';
import Auth from "../utils/auth";
import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";

// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_MESSAGES);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  // optional chaining syntax used below
  const messages = data?.messages || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <Grid direction="row" container spacing={6}>
        <Grid container item sm={6}>
          <div className="flex-row justify-space-between compBorders">
            Place Holder, This section is for the my task
          </div>
        </Grid>
        <Grid container item sm={6}>
          <div className="flex-row justify-space-between">
            <div
              className={`col-12 mb-3 compBorders ${loggedIn && "col-lg-8"}`}
            >
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div>
                  <h2>Messages</h2>
                  <MessageList messages={messages} />
                </div>
              )}
              {loggedIn && (
                <div className="col-12 mb-3">
                  <MessageForm />
                </div>
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
        </Grid>
      </Grid>
    </main>
  );
};
export default Home;
