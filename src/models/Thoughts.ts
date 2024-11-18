import { Schema, model } from 'mongoose';
import Reaction from './Reaction.js';

interface IThoughts {
  published: boolean;
  createdAt: Date;
  advertiserFriendly: boolean;
  description: string;
  reactions: Reaction[];
}

// Schema to create Post model
const thoughtsSchema = new Schema<IThoughts>(
  {
    published: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    advertiserFriendly: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      minLength: 8,
      maxLength: 500,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `reactions` that gets the amount of reaction per thoughts
thoughtsSchema
  .virtual('getReactions')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Thoughts model
const Thoughts = model('thoughts', thoughtsSchema);

export default Thoughts;
