const Message = require('../../../models/Messages');
const MSG_ADDED = require ('./channels');

module.exports = {
  Query:{
    messages: () => Message.find(),
    // user: (_,{_id}) => {
    //   const user = User.findById(_id)
    //   console.log(user.rows);
    //   return user
    // },
  },
  Mutation:{
    sendMessage: async (_, { data }, { pubsub }) => {
      const message = await Message.create(data)
      console.log(message,'ok');
      pubsub.publish(MSG_ADDED,{
        messageAdded: message,
      });
      return message._id ? true : false; 
    },
    // updateUser: async (_,{_id,data}) => {
    //   const user = await User.findOneAndUpdate({_id},data,{new:true});
    //   return user
    // },
    // deleteUser: async (_,{_id}) => {
    //   const deleted = await User.findOneAndDelete({_id});
    //   return !!deleted;
    // }
  },
  Subscription: {
    messageAdded: {
      subscribe: (obj, args, { pubsub }) => pubsub.asyncIterator(MSG_ADDED),
    }
  }

}