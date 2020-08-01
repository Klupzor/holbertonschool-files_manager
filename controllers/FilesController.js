const dbClient = require('../utils/db');

async function postUpload(params, userId) {
  const {
    name, type, parentId, isPublic, data,
  } = params;

  const types = ['folder', 'file', 'image'];

  if (!name) {
    throw new Error('Missing name');
  }

  if (!type || !types.includes(type)) {
    throw new Error('Missing type');
  }

  if (!data && type !== 'folder') {
    throw new Error('Missing data');
  }

  if (parentId) {
    const file = await dbClient.findFileById(parentId);
    if (!file) {
      throw new Error('Parent not found');
    }
    if (file.type !== 'folder') {
      throw new Error('Parent is not a folder');
    }
  }
  const file = {
    name,
    type,
    userId,
    isPublic: isPublic || false,
    parentId: parentId || 0,
  };

  if (type !== 'folder') {
    file.data = data;
  }

  const folder = await dbClient.createFile(file);
  return folder;
}

module.exports = { postUpload };
