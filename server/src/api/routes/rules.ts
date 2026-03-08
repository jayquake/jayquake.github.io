import { Router } from 'express';

import { RuleController } from '../controllers/RuleController';

const router = Router();
const ruleController = new RuleController();

router.get('/', (req, res) => ruleController.listRules(req, res));
router.get('/:ruleId', (req, res) => ruleController.getRule(req, res));
router.get('/:ruleId/examples', (req, res) => ruleController.getRuleExamples(req, res));
router.get('/:ruleId/analyses', (req, res) => ruleController.getRuleAnalyses(req, res));

export default router;
