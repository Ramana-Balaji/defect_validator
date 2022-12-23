require("dotenv").config();
const { MongoClient } = require("mongodb");
const assert = require("assert");

const state = {
  db: null,
  client: null,
};

const user = encodeURIComponent(process.env.DB_USER);
const password = encodeURIComponent(process.env.DB_PASS);
const authMechanism = "DEFAULT";

// Connection URL
const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authMechanism=${authMechanism}`;

// Create a new MongoClient
const client = new MongoClient(url, {
  user,
  password,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// eslint-disable-next-line consistent-return
exports.connect = (done) => {
  // Use connect method to connect to the Server
  client.connect((err) => {
    assert.equal(null, err);
    state.db = client.db(process.env.DB_NAME);
    state.client = client;
    done(err);
  });
};

// eslint-disable-next-line consistent-return
exports.get = () => {
  if (state.db) return state.db;
  exports.connect((err) => {
    if (err) {
      process.exit(1);
    } else {
      return state.db;
    }
  });
};

exports.close = () => {
  const { client } = state;
  if (client) {
    client.close(() => {
      state.db = null;
      state.mode = null;
    });
  }
};

exports.insertData = (collectionName, jsonData) => {
  return new Promise((resolve, reject) => {
    exports
      .get()
      .collection(collectionName)
      .insertOne(jsonData, (err, result) => {
        if (err) {
          reject(new Error(`Failed to insert data into the database: ${err}`));
        } else {
          resolve(result);
        }
      });
  });
};

exports.insertManyData = (collectionName, jsonData) => {
  return new Promise((resolve, reject) => {
    exports
      .get()
      .collection(collectionName)
      .insertMany(jsonData, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  });
};

exports.removeData = (collectionName, jsonData) => {
  return new Promise((resolve, reject) => {
    exports
      .get()
      .collection(collectionName)
      .remove(jsonData, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  });
};
