import { useParams } from "react-router-dom";
import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_MESSAGE } from "../utils/queries";
import ReactionForm from "../components/ReactionForm";
import ReactionList from "../components/ReactionList";
import Auth from "../utils/auth";

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
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {message.username}
          </span>{" "}
          posted on {message.createdAt}
        </p>
        <div className="card-body">
          <p>{message.messageText}</p>
        </div>
      </div>
      {message.replyCount > 0 && <ReactionList replies={message.replies} />}
      {Auth.loggedIn() && <ReactionForm messageId={message._id} />}
    </div>
  );
};

export default SingleMessage;
