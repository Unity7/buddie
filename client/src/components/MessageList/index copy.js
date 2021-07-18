import React from "react";
import { Link } from "react-router-dom";

const MessageList = ({ messages, title }) => {
  if (!messages.length) {
    return <h3>Start the conversation</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {messages &&
        messages.map((message) => (
          <div key={message._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${message.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {message.username}
              </Link>{" "}
              message on {message.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/message/${message._id}`}>
                <p>{message.messageText}</p>
                <p className="mb-0">
                  Reactions: {message.reactionCount} || Click to{" "}
                  {message.reactionCount ? "see" : "start"} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MessageList;
