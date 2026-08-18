import { Router } from 'express';
import healthRoutes from './health.routes.js';
import foldersRoutes from './folders.routes.js';
import templatesRoutes from './templates.routes.js';
import packagesRoutes from './packages.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/folders', foldersRoutes);
router.use('/templates', templatesRoutes);
router.use('/packages', packagesRoutes);

export default router;
