import { Router } from 'express';

import { ProjectController } from '../controllers/ProjectController';

const router = Router();
const projectController = new ProjectController();

router.get('/', (req, res) => projectController.getAllProjects(req, res));
router.get('/:id/sdk-default-base-url', (req, res) => projectController.getSdkDefaultBaseUrl(req, res));
router.get('/:id', (req, res) => projectController.getProjectById(req, res));
router.get('/:id/tests', (req, res) => projectController.getTestFiles(req, res));
router.get('/:id/test-suites', (req, res) => projectController.getTestFilesGroupedBySuite(req, res));
router.get('/:id/test-cases/:filePath(*)', (req, res) => projectController.getTestCases(req, res));

export default router;
