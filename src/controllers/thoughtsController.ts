import { Thoughts, User } from '../models/index.js';
import { Request, Response } from 'express';


  export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const getSingleThoughts = async (req: Request, res: Response) => {
    try {
      const thoughts = await Thoughts.findOne({ _id: req.params.thoughtsId })
  
      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with that ID' });
      }
  
      res.json(thoughts);
      return; 
    } catch (err) {
      res.status(500).json(err);
    }
  
    return;
  }

  // create a new thought
  export const createThoughts = async (req: Request, res: Response) => {
    try {
      const thoughts = await Thoughts.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thoughts._id } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({
          message: 'Thoughts created, but found no user with that ID',
        });
      }
  
      res.json('Created the Thoughts 🎉');
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  
    return;
  }

  export const updateThoughts = async (req: Request, res: Response) => {
    try {
      const thoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
  
      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with this id!' });
      }
  
      res.json(thoughts);
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return; 
    }
  }

  export const deleteThoughts = async (req: Request, res: Response) => {
    try {
      const thoughts = await Thoughts.findOneAndDelete({ _id: req.params.thoughtsId });
  
      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with this id!' });
      }
  
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtsId },
        { $pull: { thoughts: req.params.thoughtsId } },
        { new: true }
      );
  
      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thoughts created but no user with this id!' });
      }
  
      res.json({ message: 'Thoughts successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  
    return; 
  }

  // Add a thoughts reaction
  export const addThoughtsReaction = async (req: Request, res: Response) => {
    try {
      const thoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with this id!' });
      }

      res.json(thoughts);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  // Remove thoughts reaction
  export const removeThoughtsReaction = async (req: Request, res: Response) => {
    try {
      const thoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )

      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with this id!' });
      }

      res.json(thoughts);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }
