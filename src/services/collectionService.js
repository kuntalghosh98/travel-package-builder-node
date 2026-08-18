import { config } from '../config/index.js';
import * as mongoRepository from '../repositories/mongoRepository.js';
import { generateId } from '../utils/id.js';

function assertCollection(collectionName) {
  if (!config.collections.includes(collectionName)) {
    throw new Error(`Invalid collection: ${collectionName}`);
  }
}

export async function getAll(collectionName) {
  assertCollection(collectionName);
  return mongoRepository.getAll(collectionName);
}

export async function getById(collectionName, id) {
  assertCollection(collectionName);
  return mongoRepository.getById(collectionName, id);
}

export async function create(collectionName, data) {
  assertCollection(collectionName);
  const now = new Date().toISOString();
  const item = {
    ...data,
    createdAt: data.createdAt || now,
    updatedAt: data.updatedAt || now
  };

  if (!item.id && collectionName !== 'folders') {
    item.id = generateId(config.idPrefixes[collectionName] || 'id');
  }

  return mongoRepository.create(collectionName, item);
}

export async function update(collectionName, id, data) {
  assertCollection(collectionName);
  return mongoRepository.update(collectionName, id, data);
}

export async function remove(collectionName, id) {
  assertCollection(collectionName);
  return mongoRepository.remove(collectionName, id);
}
