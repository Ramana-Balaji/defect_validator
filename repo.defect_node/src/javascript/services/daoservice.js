const database = require("../database/database");

const insertOneScript = (collectionName, jsonData) => {
  return new Promise((resolve, reject) => {
    database
      .get()
      .collection(collectionName)
      .insertOne(jsonData, (err, result) => {
        if (err) {
          reject(new Error(`Failed to execute insert query :  ${err.message}`));
        } else {
          resolve(result);
        }
      });
  });
};
const findAllScript = (collectionName, query, project, sort = {}) => {
  return new Promise((resolve, reject) => {
    database
      .get()
      .collection(collectionName)
      .find(query)
      .project(project)
      .sort(sort)
      .toArray((err, result) => {
        if (err) {
          reject(new Error(`Failed to execute find query : ${err.message}`));
        } else if (result) {
          resolve(result);
        } else {
          reject(new Error(`No records found matching your query`));
        }
      });
  });
};
const updateScript = (collectionName, query, newvalues, options = {}) => {
  return new Promise((resolve, reject) => {
    database
      .get()
      .collection(collectionName)
      .updateOne(query, newvalues, options, (err, output) => {
        if (err) {
          reject(new Error(`Failed to execute update query: ${err.message}`));
        } else if (output) {
          if (output.result.n === 1) {
            resolve(output);
          } else {
            reject(new Error(`No records found matching your query`));
          }
        } else {
          reject(new Error(`No records found matching your query`));
        }
      });
  });
};

const updateManyScript = (collectionName, query, newValues, options = {}) => {
  return new Promise((resolve, reject) => {
    database
      .get()
      .collection(collectionName)
      .updateMany(query, newValues, options, (err, result) => {
        if (err) {
          reject(
            new Error(`Failed to execute update all query : ${err.message}`)
          );
        } else if (result) {
          resolve(result);
        } else {
          reject(new Error(`No records found matching your query`));
        }
      });
  });
};

const findScript = (collectionName, query, project) => {
  return new Promise((resolve, reject) => {
    database
      .get()
      .collection(collectionName)
      .findOne(query, { projection: project }, (err, result) => {
        if (err) {
          reject(new Error(`Failed to execute find query : ${err.message}`));
        } else if (result) {
          resolve(result);
        } else {
          resolve(null);
        }
      });
  });
};

const insertManyScript = (collectionName, jsonData) => {
  return new Promise((resolve, reject) => {
    database
      .get()
      .collection(collectionName)
      .insertMany(jsonData, (err, result) => {
        if (err) {
          reject(
            new Error(`Failed to execute insert many query :  ${err.message}`)
          );
        } else {
          resolve(result);
        }
      });
  });
};

const getNextSequenceValue = (sequenceName) => {
  return new Promise((resolve, reject) => {
    database
      .get()
      .collection("counters_collection")
      .findOneAndUpdate(
        { _id: sequenceName },
        { $inc: { sequence_value: 1 } },
        async (err, result) => {
          if (err) {
            reject(err);
          } else if (result && result.value) {
            resolve(result.value.sequence_value);
          } else {
            await insertOneScript("counters_collection", {
              _id: sequenceName,
              sequence_value: 100001,
            });
            resolve(100001);
          }
        }
      );
  });
};

const deleteOneScript = (collectionName, query) => {
  return new Promise((resolve, reject) => {
    database
      .get()
      .collection(collectionName)
      .deleteOne(query, (err, result) => {
        if (err) {
          reject(new Error(`Failed to execute delete query : ${err.message}`));
        } else if (result) {
          resolve(result);
        } else {
          reject(new Error(`No records found matching your query`));
        }
      });
  });
};

const deleteManyScript = (collectionName, query) => {
  return new Promise((resolve, reject) => {
    database
      .get()
      .collection(collectionName)
      .deleteMany(query, (err, result) => {
        if (err) {
          reject(new Error(`Failed to execute delete query : ${err.message}`));
        } else if (result) {
          resolve(result);
        } else {
          reject(new Error(`No records found matching your query`));
        }
      });
  });
};

const aggregateScript = (collectionName, query) => {
  return new Promise((resolve, reject) => {
    database
      .get()
      .collection(collectionName)
      .aggregate(query, { allowDiskUse: true }, (err, cursor) => {
        if (err) {
          reject(
            new Error(`Failed to execute aggregate query : ${err.message}`)
          );
        } else {
          cursor.toArray((err, documents) => {
            if (err) {
              reject(
                new Error(
                  `No records found matching your query : ${err.message}.`
                )
              );
            } else {
              resolve(documents);
            }
          });
        }
      });
  });
};

module.exports = {
  updateScript,
  findScript,
  findAllScript,
  getNextSequenceValue,
  insertOneScript,
  insertManyScript,
  deleteOneScript,
  deleteManyScript,
  aggregateScript,
  updateManyScript,
};
