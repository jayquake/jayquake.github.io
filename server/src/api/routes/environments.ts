import { Router } from 'express';

import { EnvironmentController } from '../controllers/EnvironmentController';

const router = Router();
const environmentController = new EnvironmentController();

router.get('/recent', (req, res) => environmentController.getRecent(req, res));
router.get('/search', (req, res) => environmentController.search(req, res));
router.get('/project/:projectId', (req, res) => environmentController.getByProject(req, res));
router.post('/discover/:projectId', (req, res) => environmentController.discover(req, res));

export default router;
