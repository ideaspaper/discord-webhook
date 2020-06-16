const sqlite3 = require('sqlite3');

function getCount() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./webhook.db');
    const sql = 'SELECT count(*) FROM jokes';
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

function getJoke() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./webhook.db');
    getRandomId()
      .then((id) => {
        const sql = `SELECT joke FROM jokes WHERE id = ${id}`;
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
  getJoke
}