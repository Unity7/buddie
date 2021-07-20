import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const ReactionList = ({ replies }) => {
  return (
    <div>
      <span className="">Replies</span>
      <div className="">
        {replies &&
          replies.map((reply) => (
            <p className="" key={reply._id}>
              <Link
                to={`/profile/${reply.username}`}
                style={{ fontWeight: 700 }}
              >
                {reply.username}
              </Link>{" "}
              : {reply.replyBody}
              <div className="messageDate">{reply.createdAt}</div>
            </p>
          ))}
      </div>
    </div>
  );
};

export default ReactionList;
