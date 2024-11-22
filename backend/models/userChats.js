// import mongoose from "mongoose";

// const userChatsSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     chats: [
//       {
//         _id: {
//           type: String,
//           required: true,
//         },
//         title: {
//           type: String,
//           required: true,
//         },
//         createdAt: {
//           type: Date,
//           default:Date.now()
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// export default mongoose.models.userchats ||
//   mongoose.model("userchats", userChatsSchema);

import mongoose from "mongoose";

const userChatsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    chats: [
      {
        _id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,  // Changed from Date.now() to Date.now to prevent static dates
        },
      },
    ],
  },
  { timestamps: true }
);

// Add validation to ensure chat entries are unique
userChatsSchema.path('chats').validate(function (value) {
  const ids = value.map(chat => chat._id);
  return new Set(ids).size === ids.length;
}, 'Duplicate chat IDs are not allowed');

export default mongoose.models.userchats ||
  mongoose.model("userchats", userChatsSchema);