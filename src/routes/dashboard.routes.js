import express from 'express';
import { liveMatchesController, upcomingMatchesController, pastMatchesController } from '../controllers/dashboard.controller.js';

const router = express.Router();

router.get('/live', liveMatchesController);
router.get('/upcoming', upcomingMatchesController);
router.get('/past', pastMatchesController);

export default router;