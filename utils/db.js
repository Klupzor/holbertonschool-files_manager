const { MongoClient } = require('mongodb');
const sha1 = require('sha1');

class DBClient {
  constructor() {
    this.connected = false;
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${host}:${port}/`;

    MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
      if (err) {
        console.log(err);
      } else {
        this.db = db.db(database);
        this.db.createCollection('users');
        this.db.createCollection('files');
        this.connected = true;
      }
    });
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    try {
      const userCount = await this.db.collection('users').countDocuments();
      return userCount;
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  async nbFiles() {
    try {
      const fileCount = await this.db.collection('files').countDocuments();
      return fileCount;
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  async findUserByEmail(email) {
    try {
      const user = await this.db.collection('users').findOne({ email });
      return user;
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  async createUser(email, password) {
    try {
      const user = await this.db.collection('users').insertOne({
        email,
        password: sha1(password),
      });
      return user.ops[0];
    } catch (error) {
      console.error(error);
    }
    return null;
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
