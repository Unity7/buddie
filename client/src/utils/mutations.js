import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username:String!, $first_name: String, $last_name:String, $email: String!, $password: String!) {
    addUser(username: $username, first_name: $first_name, last_name:$last_name, email: $email, password: $password) {
      user{
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($friendId: ID!) {
    addFriend(friendId: $friendId) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($messageText: String!) {
    addMessage(messageText: $messageText) {
      _id
      messageText
      createdAt
      username
    }
  }
`;


export const ADD_REPLY = gql`
  mutation addReply($messageId: ID!, $replyBody: String!) {
    addReply(messageId: $messageId, replyBody: $replyBody) {
      _id
      replies {
        _id
        replyBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_TASK = gql `
  mutation addTask($taskText: String!) {
    addTask(taskText: $taskText) {
      _id
      taskText
      createdAt
      username
    }
  }
`;

export const DELETE_TASK = gql `
  mutation deleteTask($_id: ID!) {
    deleteTask(_id: $_id) {
      _id
      taskText
      createdAt
      username
    }
  }
`;

export const UPDATE_TASK = gql `
  mutation updateTask($_id: ID!, $taskStatus: Boolean, $assignedID: ID) {
    updateTask(_id: $_id, taskStatus: $taskStatus, assignedID: $assignedID) {
      _id
      taskText
      createdAt
      username
      assignedID
      taskStatus
    }
  }
`;
