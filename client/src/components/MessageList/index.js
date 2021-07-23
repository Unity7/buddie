import React from "react";
import { Link } from "react-router-dom";
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
import ChatIcon from "@material-ui/icons/Chat";
import PersonIcon from "@material-ui/icons/Person";

const MessageList = ({ messages, title }) => {
  if (!messages.length) {
    return <h3>Start the conversation</h3>;
  }

  return (
    <div>

      {messages &&
        messages.map((message) => (
          <div key={message._id} className="">
            {/* <Grid direction="column" container spacing={1} original-of-below-grid> */}
            <Grid  >
              {/* <Grid container item sm={12} original-of-below-grid > */}
              <Grid >
                <span className="nameStyle">{message.username}:</span> <span className="chatStyle">{message.messageText}</span>
              </Grid>
              {/* <Grid container item sm={12} original-of-below-grid > */}
              <Grid container item sm={6}>
                <Link
                  to={`/profile/${message.username}`}
                  style={{ fontWeight: 700 }}
                  className="text-light"
                >
                  <PersonIcon />
                </Link>{" "}
                <Link to={`/message/${message._id}`}>
                  <ChatIcon />
                </Link>
                <div className="messageDate">{message.createdAt}</div>
              </Grid>
            </Grid>
          </div>
        ))}
    </div>
  );
};

export default MessageList;

