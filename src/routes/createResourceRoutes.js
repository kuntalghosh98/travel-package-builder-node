import { Router } from 'express';
import { createCollectionController } from '../controllers/collectionController.js';

export function createResourceRoutes(collectionName) {
  const router = Router();
  const controller = createCollectionController(collectionName);

  router.get('/', controller.getAll);
  router.get('/:id', controller.getById);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.remove);

  return router;
}
