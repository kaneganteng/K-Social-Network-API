import { Schema, model, Document } from 'mongoose';
import { reactionSchema, IReaction } from './Reaction.js';

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[]; // Array of nested reaction documents
  reactionCount: number; // Virtual property
}

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: [true, 'Thought text is required'],
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Date.now returns a Date object, no need to change this
      get: function (this: any) {
        return this.createdAt.toLocaleString(); // Format the Date object to a string
      },
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    reactions: [reactionSchema], // Use reactionSchema directly
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema
.virtual('reactionCount')
.get(function (this: IThought) {
  return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
