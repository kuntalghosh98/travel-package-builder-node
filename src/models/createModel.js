import mongoose from 'mongoose';

export function createCollectionModel(name, collectionName) {
  const schema = new mongoose.Schema(
    {
      id: { type: mongoose.Schema.Types.Mixed, required: true, unique: true }
    },
    {
      strict: false,
      versionKey: false,
      collection: collectionName
    }
  );

  return mongoose.models[name] || mongoose.model(name, schema, collectionName);
}
