import * as collectionService from '../services/collectionService.js';

export function createCollectionController(collectionName) {
  return {
    async getAll(_req, res, next) {
      try {
        const items = await collectionService.getAll(collectionName);
        res.json(items);
      } catch (error) {
        next(error);
      }
    },

    async getById(req, res, next) {
      try {
        const item = await collectionService.getById(collectionName, req.params.id);
        if (!item) {
          return res.status(404).json({ error: 'Not found' });
        }
        res.json(item);
      } catch (error) {
        next(error);
      }
    },

    async create(req, res, next) {
      try {
        const item = await collectionService.create(collectionName, req.body);
        res.status(201).json(item);
      } catch (error) {
        next(error);
      }
    },

    async update(req, res, next) {
      try {
        const item = await collectionService.update(collectionName, req.params.id, req.body);
        if (!item) {
          return res.status(404).json({ error: 'Not found' });
        }
        res.json(item);
      } catch (error) {
        next(error);
      }
    },

    async remove(req, res, next) {
      try {
        const deleted = await collectionService.remove(collectionName, req.params.id);
        if (!deleted) {
          return res.status(404).json({ error: 'Not found' });
        }
        res.status(204).send();
      } catch (error) {
        next(error);
      }
    }
  };
}
