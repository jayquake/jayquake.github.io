import { Router } from 'express';

import * as RuleAnalysisController from '../controllers/RuleAnalysisController';

const router = Router();

router.post('/analyze', RuleAnalysisController.analyze);
router.post('/discover', RuleAnalysisController.discover);
router.post('/discover-all', RuleAnalysisController.discoverAll);

router.get('/sites', RuleAnalysisController.listSites);
router.post('/sites', RuleAnalysisController.addSite);
router.patch('/sites/:siteId', RuleAnalysisController.updateSite);

router.post('/curate/:exampleId', RuleAnalysisController.curateExample);

router.get('/health', RuleAnalysisController.healthCheck);

export function setRuleLabBroadcast(fn: (data: any) => void): void {
  RuleAnalysisController.setBroadcast(fn);
}

export default router;
