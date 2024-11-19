import { Schema, model, Document } from 'mongoose';
import { reactionSchema, IReaction } from './Reaction.js';

interface IThoughts extends Document {
  thoughtsText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[]; // Array of nested reaction documents
  reactionCount: number; // Virtual property
}

const thoughtsSchema = new Schema<IThoughts>(
  {
    thoughtsText: {
      type: String,
      required: [true, 'Thoughts text is required'],
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Date.now returns a Date object, no need to change this
      get: function (timestamp: any) {
        return timestamp
        // return this.createdAt.toLocaleString(); // Format the Date object to a string
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

thoughtsSchema
.virtual('reactionCount')
.get(function () {
  return this.reactions.length;
});

const Thoughts = model<IThoughts>('Thoughts', thoughtsSchema);

export default Thoughts;
