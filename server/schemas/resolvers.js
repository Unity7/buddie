// created this after setting up our query in typeDefs.js
const { User, Task, Message, Pod } = require("../models");
// import signin token
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const { async } = require("rxjs");

const resolvers = {
  Query: {
    // authentication
    // must define context in server.js for this to work
    // use utils middleware to add logic
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("tasks")
          .populate("friends");

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    // -------- get all tasks ------ //
    tasks: async () => {
      return Task.find();
    },
    // -------- get all tasks by assignedID------ //
    usersTasks: async (parent, { assignedID }) => {
      return Task.find({ assignedID });
    },
    // -------------- find a single task -------------- //
    task: async (parent, { _id }) => {
      return Task.findOne({ _id });
    },
    // -------------- get all users -------------- //
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("tasks");
    },
    messages: async () => {
      return Message.find().sort({ createdAt: -1 });
    },
    // find a single thought
    message: async (parent, { _id }) => {
      return Message.findOne({ _id });
    },

    // -------------- get a user by username -------------- //
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("tasks");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addMessage: async (parent, args, context) => {
      if (context.user) {
        const message = await Message.create({
          ...args,
          username: context.user.username,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { message: message._id } },
          { new: true }
        );
        return message;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteMessage: async (parent, args, context) => {
      if (context.user) {
        const message = await Message.findOneAndRemove({
          ...args,
          username: context.user.username,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { message: message._id } }
          // { new: true }
        );
        return message;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addTask: async (parent, args, context) => {
      if (context.user) {
        const task = await Task.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { tasks: task._id } },
          { new: true }
        );
        return task;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteTask: async (parent, args, context) => {
      if (context.user) {
        const task = await Task.findOneAndRemove({ _id: args._id });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { tasks: task._id } }
        );
        return task;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateTask: async (parent, args, context) => {
      if (context.user) {
        // empty object to hold what is being passed in
        const updatedField = {};
        if (args.taskStatus != null) {
          updatedField.taskStatus = args.taskStatus;
        }
        if (args.assignedID != null) {
          updatedField.assignedID = args.assignedID;
        }
        const task = await Task.findOneAndUpdate(
          { _id: args._id },
          updatedField,
          { new: true }
        );
        return task;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addReply: async (parent, { messageId, replyBody }, context) => {
      if (context.user) {
        const updatedMessage = await Message.findOneAndUpdate(
          { _id: messageId },
          {
            $push: { replies: { replyBody, username: context.user.username } },
          },
          { new: true, runValidators: true }
        );

        return updatedMessage;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate("friends");
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
