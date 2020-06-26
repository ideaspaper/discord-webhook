const sqlite3 = require('sqlite3');
const path = require('path');
const { dbName } = require('./../config.json');

function getCount() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(path.join(__dirname, '..', dbName));
    const sql = 'SELECT count(*) FROM facts';
    db.get(sql, [], (err, row) => {
      if (err) {
        reject(-1);
      }
      db.close();
      resolve(row['count(*)']);
    });
  });
}

function getRandomId() {
  return new Promise((resolve, reject) => {
    getCount()
      .then((count) => {
        count === -1
          ? reject(-1)
          : resolve(Math.floor(Math.random() * count) + 1);
      });
  });
}

function getFact() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(path.join(__dirname, '..', dbName));
    getRandomId()
      .then((id) => {
        const sql = `SELECT fact FROM facts WHERE id = ${id}`;
        if (id === -1) {
          reject(-1);
        }
        db.get(sql, [], (err, row) => {
          if (err) {
            reject(err);
          }
          db.close();
          resolve(row);
        });
      });
  });
}

module.exports = {
  getFact
}
