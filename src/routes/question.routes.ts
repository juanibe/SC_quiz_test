import { Router } from 'express';

import { questionController } from '../controllers/question.controller'

const router: Router = Router();

router.get("/", questionController.getAll);
router.get("/:id", questionController.get);
router.post("/", questionController.create);
router.put("/:id", questionController.update);

export default router;

