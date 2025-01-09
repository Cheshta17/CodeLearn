import express from 'express';
import * as challengeController from '../controllers/challengeController';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

router.get('/', challengeController.getAllChallenges);
router.get('/:id', challengeController.getChallengeById);
router.post('/', authenticateUser, challengeController.createChallenge);
router.put('/:id', authenticateUser, challengeController.updateChallenge);
router.delete('/:id', authenticateUser, challengeController.deleteChallenge);
router.post('/:id/submit', authenticateUser, challengeController.submitSolution);

export default router;
