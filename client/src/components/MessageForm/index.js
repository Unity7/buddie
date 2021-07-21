import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_MESSAGE } from "../../utils/mutations";
// because messages are contained in a array we are going to use the query below to update the cache and return new messages submitted in the form, QUERY_ME is being used on the profile page instead of Query MESSAGES so we need to have both
import { QUERY_MESSAGES, QUERY_ME } from "../../utils/queries";

const MessageForm = () => {
  const [messageText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addMessage, { error }] = useMutation(ADD_MESSAGE, {
    update(cache, { data: { addMessage } }) {
      try {
        // read what's currently in the cache
        const { messages } = cache.readQuery({ query: QUERY_MESSAGES });

        // prepend the newest thought to the front of the array
        cache.writeQuery({
          query: QUERY_MESSAGES,
          data: { messages: [addMessage, ...messages] },
        });
      } catch (e) {
        console.log(e);
      }

      // update me object's cache, appending new thought to the end of the array

      //need to fix Me page in order for this to work
      //   const { me } = cache.readQuery({ query: QUERY_ME });
      //   cache.writeQuery({
      //     query: QUERY_ME,
      //     data: { me: { ...me, messages: [...me.messages, addMessage] } },
      //   });
    },
  });

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add thought to database
      await addMessage({
        variables: { messageText },
      });

      // clear form value
      setText("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`chatStyle ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Type a message"
          value={messageText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
  
        <button className="btn col-12 col-md-3 bg-success" type="submit">
          Submit
        </button>

      </form>
    </div>
  );
};

export default MessageForm;
