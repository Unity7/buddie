// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type Message {
  _id: ID
  messageText: String
  createdAt: String
  username: String
  replies: [Reply]
  }

  type Reply {
    _id: ID
    replyBody: String
    createdAt: String
    username: String
  }

  type User {
    _id: ID
    username: String
    first_name: String
    last_name: String
    email: String
    podID: [Pod]
    friendCount: Int
    tasks: [Task]
    friends: [User]
  }

  type Task {
    _id: ID
    taskText: String
    podID: [Pod]
    username: String
    taskStatus: Boolean
    assignedID: String
    createdAt: String
  }

  type Pod {
    _id: ID
    users: [User]
  }
  
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    tasks: [Task]
    task(_id: ID!): Task
    messages: [Message]
    }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, first_name: String, last_name:String, password: String!): Auth
    addTask(taskText: String!): Task
    deleteTask(_id: ID!): Task
    updateTask(_id: ID!, taskStatus: Boolean, assignedID: ID): Task
    addMessage(messageText: String!): Message
    addReply(messageId: ID!, replyBody: String!): Message
    addFriend(friendId: ID!): User
    deleteMessage(_id: ID!): Message
  }

  type Auth {
    token: ID!
    user: User
  }
`;
// export the typeDefs
module.exports = typeDefs;