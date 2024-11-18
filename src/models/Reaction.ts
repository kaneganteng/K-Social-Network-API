import { Schema, Document, Types } from 'mongoose';

interface IReaction extends Document {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: [true, 'Reaction body is required'],
      maxlength: 280,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    createdAt: {
      type: Date,
      default: Date.now, // Set default to current timestamp
      get: function (this: any) {
        return this.createdAt.toLocaleString(); // Format timestamp
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

export {reactionSchema, IReaction};
