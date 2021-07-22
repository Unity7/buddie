import { useParams } from "react-router-dom";
import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_MESSAGE } from "../utils/queries";
import ReactionForm from "../components/ReactionForm";
import ReactionList from "../components/ReactionList";
import Auth from "../utils/auth";
import Grid from "@material-ui/core/Grid";

const SingleMessage = (props) => {
  const { id: messageId } = useParams();

  const { loading, data } = useQuery(QUERY_MESSAGE, {
    variables: { id: messageId },
  });

  const message = data?.message || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      direction="row"
      container
      spacing={12}
      alignItems="flex-start"
      justify="center"
    >
      <div className="compBorders">
        <Grid container item sm={12} alignItems="flex-start" justify="center">
          <span style={{ fontWeight: 800 }} className="">
            {message.username} : {message.messageText}
          </span>
        </Grid>
        <Grid container item sm={12} alignItems="flex-start" justify="center">
          <div className="messageDate">{message.createdAt}</div>
        </Grid>
        <Grid container item sm={12} alignItems="flex-start" justify="center">
          {message.replyCount > 0 && <ReactionList replies={message.replies} />}
        </Grid>
        {Auth.loggedIn() && <ReactionForm messageId={message._id} />}
      </div>
    </Grid>
  );
};

export default SingleMessage;
