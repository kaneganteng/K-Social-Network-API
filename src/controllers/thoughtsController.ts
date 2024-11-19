import { Thoughts, User } from '../models/index.js';
import { Request, Response } from 'express';

// Get all thoughts
export const getThoughts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thoughts.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single thought
export const getSingleThoughts = async (req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thoughts.findOne({ _id: req.params.thoughtsId });

    if (!thoughts) {
      res.status(404).json({ message: 'No thoughts with that ID' });
      return;
    }

    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a new thought
export const createThoughts = async (req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thoughts.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thoughts._id } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        message: 'Thoughts created, but found no user with that ID',
      });
      return;
    }

    res.json('Created the Thoughts 🎉');
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a thought
export const updateThoughts = async (req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thoughts) {
      res.status(404).json({ message: 'No thoughts with this ID!' });
      return;
    }

    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a thought
export const deleteThoughts = async (req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thoughts.findOneAndDelete({ _id: req.params.thoughtsId });

    if (!thoughts) {
      res.status(404).json({ message: 'No thoughts with this ID!' });
      return;
    }

    const user = await User.findOneAndUpdate(
      { thoughts: req.params.thoughtsId },
      { $pull: { thoughts: req.params.thoughtsId } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'Thoughts deleted but no user with this ID!' });
      return;
    }

    res.json({ message: 'Thoughts successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add a thought reaction
export const addThoughtsReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    if (!thoughts) {
      res.status(404).json({ message: 'No thoughts with this ID!' });
      return;
    }

    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Remove a thought reaction
export const removeThoughtsReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );

    if (!thoughts) {
      res.status(404).json({ message: 'No thoughts with this ID!' });
      return;
    }

    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};
