import { gql } from "@apollo/client";

export const QUERY_TASKS = gql`
  query {
    tasks {
      _id
      username
      taskText
      taskStatus
      createdAt
      assignedID
      taskStatus
    }
  }
`;

export const QUERY_TASK = gql`
  query task($_id: ID!) {
    task(_id: $_id) {
      _id
      username
      assignedID
      taskText
      taskStatus
      createdAt
    }
  }
`;

export const QUERY_USERS_TASKS = gql `
  query usersTasks($assignedID: String!){
      usersTasks(assignedID: $assignedID) {
      taskText
      taskStatus
      createdAt
      username
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      first_name
      last_name
      username
      email
      friendCount
      friends {
        _id
        username
      }
      tasks {
        taskText
        taskStatus
        assignedID
        createdAt
      }
    }
  }
`;

export const QUERY_USERS = gql `
  query {
    users {
      _id
      username
      first_name
      last_name
      email
      tasks{
        
        taskText
        taskStatus
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      first_name
      last_name
      email
      friendCount
      tasks {
        taskText
        taskStatus
        assignedID
        createdAt
      }
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      tasks {
        taskText
      }
      friends {
        _id
        username
      }
    }
  }
`;

// Delete Later
export const QUERY_THOUGHT = gql`
  query {
    tasks {
      _id
      username
      taskText
      taskStatus
      createdAt
      assignedID
      taskStatus
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query {
    tasks {
      _id
      username
      taskText
      taskStatus
      createdAt
      assignedID
      taskStatus
    }
  }
`;

export const QUERY_MESSAGES = gql`
  query {
    messages {
      _id
      username
      messageText
      createdAt
    }
  }
`;

export const QUERY_MESSAGE = gql`
  query message($id: ID!) {
    message(_id: $id) {
      _id
      messageText
      createdAt
      username
      replyCount
      replies {
        _id
        createdAt
        username
        replyBody
      }
    }
  }
`;
