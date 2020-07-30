const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.connected = false;
    this.client.on('error', (error) => {
      console.error(`Redis client not connected to the server: ${error}`);
    });
    this.connected = true;
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    this.client.get(key, redis.print);
    return null;
  }

  async set(key, value) {
    this.client.set(key, value);
    return null;
  }

  async del(key) {
    this.client.del(key);
    return null;
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
