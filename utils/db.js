const { MongoClient } = require('mongodb');

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
}

const dbClient = new DBClient();

module.exports = dbClient;
