const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { IDatabase } = require("./AdapterDatabase");
const ConfigService = require("./ConfigService");


const config = new ConfigService();

const getClient = () => {
    const user = config.get("database.user");
    const password = config.get("database.password");
    const host = config.get("database.host");
    const uri = `mongodb+srv://${user}:${password}@${host}/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    return client;
  };

  
class MongoService extends IDatabase {
    constructor() {
      super();
      console.log("Mongo Service");
    }
    async findAll(collectionName) {
      const client = getClient();
      try {
        await client.connect();
        const dbName = config.get("database.name");
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const rows = await collection.find().toArray();
        return rows;
      } catch (error) {
        console.error(error);
        throw { success: false, message: "Error Mongo service" };
      } finally {
        await client.close();
      }
    }
  
    async findOne(collectionName, id) {
      const _id = new ObjectId(id);
      const client = getClient();
      try {
        await client.connect();
        const dbName = config.get("database.name");
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const row = await collection.findOne({ _id });
        return row;
      } catch (error) {
        console.error(error);
        throw { success: false, message: "Error Mongo service" };
      } finally {
        await client.close();
      }
    }
  
    async findByFilter(collectionName, filter) {
      const client = getClient();
      try {
        await client.connect();
        const dbName = config.get("database.name");
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const row = await collection.findOne(filter);
        return row;
      } catch (error) {
        console.error(error);
        throw { success: false, message: "Error Mongo service" };
      } finally {
        await client.close();
      }
    }
  
    /**
     * 
     * @param {string} collectionName 
     * @param {Object} payload 
     * @returns 
     */
    async create(collectionName, payload) {
      const client = getClient();
      try {
        await client.connect();
        const dbName = config.get("database.name");
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const row = await collection.insertOne(payload);
        return row;
      } catch (error) {
        console.error(error);
        throw { success: false, message: "Error Mongo service" };
      } finally {
        await client.close();
      }
    }
  
    async update(collectionName, payload, id) {
      const _id = new ObjectId(id);
      const client = getClient();
      try {
        await client.connect();
        const dbName = config.get("database.name");
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const row = await collection.replaceOne({ _id }, payload);
        return row;
      } catch (error) {
        console.error(error);
        throw { success: false, message: "Error Mongo service" };
      } finally {
        await client.close();
      }
    }
  
    async delete(collectionName, id) {
      const _id = new ObjectId(id);
      const client = getClient();
      try {
        await client.connect();
        const dbName = config.get("database.name");
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const row = await collection.deleteOne({ _id });
        return row;
      } catch (error) {
        console.error(error);
        throw { success: false, message: "Error Mongo service" };
      } finally {
        await client.close();
      }
    }
  }
  
  module.exports = { MongoService };
  