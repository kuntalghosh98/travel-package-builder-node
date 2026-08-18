import { createCollectionModel } from './createModel.js';

export const Package = createCollectionModel('Package', 'packages');
export const Folder = createCollectionModel('Folder', 'folders');
export const Template = createCollectionModel('Template', 'templates');

export const models = {
  packages: Package,
  folders: Folder,
  templates: Template
};
