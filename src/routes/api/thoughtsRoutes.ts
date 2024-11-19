import { Router } from 'express';
const router = Router();
import { getThoughts, getSingleThoughts, createThoughts, updateThoughts, deleteThoughts, addThoughtsReaction, removeThoughtsReaction } from '../../controllers/thoughtsController.js';

// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThoughts);

// /api/thoughtss/:thoughtsId
router
  .route('/:thoughtsId')
  .get(getSingleThoughts)
  .put(updateThoughts)
  .delete(deleteThoughts);

// /api/thoughts/:thoughtsId/reactions
router.route('/:thoughtsId/reactions')
  .post(addThoughtsReaction);

// /api/thoughts/:thoughtsId/reactions/:reactionId
router.route('/:thoughtsId/reactions/:reactionId')
  .delete(removeThoughtsReaction);

export default router;
 