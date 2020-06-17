const sqlite3 = require('sqlite3');
const path = require('path');
const { dbName } = require('./../config.json');

function getCount(topic) {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(path.join(__dirname, '..', dbName));
    let sql = `SELECT count(*) FROM messages WHERE topic like '%${topic}%'`;
    db.get(sql, [], (err, row) => {
      if (err) {
        reject(-1);
      }
      db.close();
      resolve(row['count(*)']);
    });
  });
}

function getRandomIndex(topic) {
  return new Promise((resolve, reject) => {
    getCount(topic)
      .then((count) => {
        count === -1
          ? reject(-1)
          : resolve(Math.floor(Math.random() * count));
      });
  });
}

function getMessage(topic) {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(path.join(__dirname, '..', dbName));
    getRandomIndex(topic)
      .then((index) => {
        let sql = `SELECT message FROM messages WHERE topic like '%${topic}%'`;
        if (index === -1) {
          reject(-1);
        }
        db.all(sql, [], (err, rows) => {
          if (err) {
            reject(err);
          }
          // let messages = [];

          db.close();
          resolve(rows[index]);
        });
      });
  });
}

module.exports = {
  getMessage
}