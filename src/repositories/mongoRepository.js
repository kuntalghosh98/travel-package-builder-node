import { models } from '../models/index.js';
import { sameId } from '../utils/id.js';

function getModel(collectionName) {
  const Model = models[collectionName];
  if (!Model) {
    throw new Error(`Invalid collection: ${collectionName}`);
  }
  return Model;
}

function buildIdQuery(id) {
  const asString = String(id);
  const asNumber = Number(id);

  if (!Number.isNaN(asNumber) && asString === String(asNumber)) {
    return { $or: [{ id: asString }, { id: asNumber }] };
  }

  return { id };
}

function toApiDoc(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return rest;
}

async function getNextFolderId() {
  const folders = await models.folders.find({}, { id: 1 }).lean();
  const numericIds = folders
    .map(folder => Number(folder.id))
    .filter(value => !Number.isNaN(value));

  return numericIds.length ? Math.max(...numericIds) + 1 : 1;
}

export async function getAll(collectionName) {
  const docs = await getModel(collectionName).find({}).lean();
  return docs.map(toApiDoc);
}

export async function getById(collectionName, id) {
  const doc = await getModel(collectionName).findOne(buildIdQuery(id)).lean();
  return toApiDoc(doc);
}

export async function create(collectionName, data) {
  const Model = getModel(collectionName);
  const now = new Date().toISOString();
  const item = {
    ...data,
    createdAt: data.createdAt || now,
    updatedAt: data.updatedAt || now
  };

  if (item.id == null) {
    if (collectionName === 'folders') {
      item.id = await getNextFolderId();
    } else {
      throw new Error(`id is required for ${collectionName}`);
    }
  }

  const created = await Model.create(item);
  return toApiDoc(created.toObject());
}

export async function update(collectionName, id, data) {
  const Model = getModel(collectionName);
  const existing = await Model.findOne(buildIdQuery(id)).lean();

  if (!existing) {
    return null;
  }

  const now = new Date().toISOString();
  const updated = {
    ...existing,
    ...data,
    id: existing.id,
    updatedAt: now
  };

  await Model.replaceOne(buildIdQuery(existing.id), updated);
  return toApiDoc(updated);
}

export async function remove(collectionName, id) {
  const result = await getModel(collectionName).deleteOne(buildIdQuery(id));
  return result.deletedCount > 0;
}

export function findById(items, id) {
  return items.find(item => sameId(item.id, id)) ?? null;
}
