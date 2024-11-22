// import mongoose from "mongoose";

// const chatSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     history: [
//       {
//         role: {
//           type: String,
//           enum: ["user", "model"],
//           required: true,
//         },
//         parts: [
//           {
//             text: {
//               type: String,
//               required: true,
//             },
//           },
//         ],
//         img: {
//           type: String,
//           required: false,
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// export default mongoose.models.chat || mongoose.model("chat", chatSchema);

// Chat.js
import mongoose from "mongoose";

// const chatSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     history: [
//       {
//         role: {
//           type: String,
//           enum: ["user", "assistant"], // Changed from "model" to "assistant" to match Google AI requirements
//           required: true,
//         },
//         parts: [
//           {
//             text: {
//               type: String,
//               required: true,
//             },
//           },
//         ],
//         img: {
//           type: String,
//           required: false,
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    history: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"], // Updated valid roles
          required: true,
        },
        parts: [
          {
            text: {
              type: String,
              required: true,
            },
          },
        ],
        img: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

// Add a pre-save middleware to ensure valid initial state
chatSchema.pre('save', function (next) {
  // Ensure history array exists
  if (!this.history) {
    this.history = [];
  }

  // If history is empty, initialize with a default user message
  if (this.history.length === 0) {
    this.history.push({
      role: 'user',
      parts: [{ text: '' }]
    });
  }

  next();
});

export default mongoose.models.chat || mongoose.model("chat", chatSchema);
