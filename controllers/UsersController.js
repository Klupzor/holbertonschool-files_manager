const dbClient = require('../utils/db');

async function postNew(params) {
  const { email, password } = params;
  if (!email) {
    throw new Error('Missing email');
  }

  if (!password) {
    throw new Error('Missing password');
  }

  let user = await dbClient.findUserByEmail(email);
  if (user) {
    throw new Error('Already exist');
  }

  user = await dbClient.createUser(email, password);
  return user;
}

module.exports = { postNew };
